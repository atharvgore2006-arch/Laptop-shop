import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { getPool, initializeDatabase } from "./db";

dotenv.config();

const fastify: FastifyInstance = Fastify({ logger: true });
const PORT = parseInt(process.env.PORT || "5000");

// Register CORS to allow requests from the React frontend
fastify.register(cors, {
  origin: "*", // In production, replace with specific origins
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

// GET /api/products - Get all products
fastify.get("/api/products", async (request, reply) => {
  try {
    const pool = await getPool();
    const [products] = await pool.query("SELECT * FROM products");
    return products;
  } catch (err) {
    fastify.log.error(err);
    reply.status(500).send({ error: "Failed to retrieve products" });
  }
});

interface ContactRequestBody {
  name?: string;
  email?: string;
  message?: string;
}

// POST /api/contact - Submit a contact message
fastify.post<{ Body: ContactRequestBody }>(
  "/api/contact",
  async (request, reply) => {
    const { name, email, message } = request.body || {};

    if (!name || !email || !message) {
      return reply
        .status(400)
        .send({ error: "Name, email, and message are required" });
    }

    try {
      const pool = await getPool();
      const [result]: any = await pool.query(
        "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)",
        [name, email, message],
      );
      return { success: true, messageId: result.insertId };
    } catch (err) {
      fastify.log.error(err);
      reply.status(500).send({ error: "Failed to save contact message" });
    }
  },
);

interface OrderItemInput {
  id: number;
  quantity: number;
  price: number;
}

interface OrderRequestBody {
  totalPrice?: number;
  items?: OrderItemInput[];
}

// POST /api/orders - Submit a new order
fastify.post<{ Body: OrderRequestBody }>(
  "/api/orders",
  async (request, reply) => {
    const { totalPrice, items } = request.body || {};

    if (!totalPrice || !Array.isArray(items) || items.length === 0) {
      return reply
        .status(400)
        .send({
          error: "Invalid order data. totalPrice and items are required.",
        });
    }

    const pool = await getPool();
    const connection = await pool.getConnection();

    try {
      // Start transaction
      await connection.beginTransaction();

      // 1. Insert into orders table
      const [orderResult]: any = await connection.query(
        "INSERT INTO orders (total_price) VALUES (?)",
        [totalPrice],
      );
      const orderId = orderResult.insertId;

      // 2. Insert items into order_items table
      for (const item of items) {
        const productId = item.id;
        const quantity = item.quantity;
        const price = item.price;

        if (!productId || !quantity || !price) {
          throw new Error(
            `Invalid item details for item: ${JSON.stringify(item)}`,
          );
        }

        await connection.query(
          "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
          [orderId, productId, quantity, price],
        );
      }

      // Commit transaction
      await connection.commit();

      return { success: true, orderId };
    } catch (err: any) {
      // Rollback transaction on error
      await connection.rollback();
      fastify.log.error(err);
      reply.status(500).send({ error: err.message || "Failed to place order" });
    } finally {
      connection.release();
    }
  },
);

// Start the server
const start = async () => {
  try {
    // Run database initialization & check connection
    await initializeDatabase();

    await fastify.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`Server is running at http://localhost:${PORT}`);
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
};

start();
