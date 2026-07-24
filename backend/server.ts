import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import crypto from "crypto";
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
      return reply.status(400).send({
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

// POST /api/admin/signup - Register a new admin
fastify.post<{ Body: { username?: string; password?: string } }>(
  "/api/admin/signup",
  async (request, reply) => {
    const { username, password } = request.body || {};
    if (!username || !password) {
      return reply.status(400).send({ error: "Username and password are required" });
    }

    try {
      const pool = await getPool();
      // Check if user already exists
      const [existing]: any = await pool.query("SELECT * FROM admins WHERE username = ?", [username]);
      if (existing.length > 0) {
        return reply.status(400).send({ error: "Username is already taken" });
      }

      // Hash password using sha256
      const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

      await pool.query("INSERT INTO admins (username, password) VALUES (?, ?)", [
        username,
        hashedPassword,
      ]);

      return { success: true };
    } catch (err) {
      fastify.log.error(err);
      reply.status(500).send({ error: "Failed to register admin account" });
    }
  }
);

// POST /api/admin/login - Authenticate admin against database
fastify.post<{ Body: { username?: string; password?: string } }>(
  "/api/admin/login",
  async (request, reply) => {
    const { username, password } = request.body || {};
    if (!username || !password) {
      return reply.status(400).send({ error: "Username and password are required" });
    }

    try {
      const pool = await getPool();
      const [users]: any = await pool.query("SELECT * FROM admins WHERE username = ?", [username]);
      if (users.length === 0) {
        return reply.status(401).send({ error: "Invalid username or password" });
      }

      const user = users[0];
      const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

      if (hashedPassword === user.password) {
        return { success: true, token: `admin-token-${user.id}-${Date.now()}` };
      }

      return reply.status(401).send({ error: "Invalid username or password" });
    } catch (err) {
      fastify.log.error(err);
      reply.status(500).send({ error: "Authentication failed" });
    }
  }
);

// GET /api/admin/orders - Retrieve all orders with items and details
fastify.get("/api/admin/orders", async (request, reply) => {
  try {
    const pool = await getPool();
    const [orders]: any = await pool.query("SELECT * FROM orders ORDER BY created_at DESC");
    
    const ordersWithItems = [];
    for (const order of orders) {
      const [items]: any = await pool.query(
        `SELECT oi.*, p.name as product_name, p.image_key 
         FROM order_items oi 
         JOIN products p ON oi.product_id = p.id 
         WHERE oi.order_id = ?`,
        [order.id]
      );
      ordersWithItems.push({
        ...order,
        items
      });
    }
    return ordersWithItems;
  } catch (err) {
    fastify.log.error(err);
    reply.status(500).send({ error: "Failed to retrieve orders" });
  }
});

// PUT /api/admin/orders/:id/status - Update order status
fastify.put<{ Params: { id: string }; Body: { status: string } }>(
  "/api/admin/orders/:id/status",
  async (request, reply) => {
    const { id } = request.params;
    const { status } = request.body || {};
    if (!status) {
      return reply.status(400).send({ error: "Status is required" });
    }
    try {
      const pool = await getPool();
      await pool.query("UPDATE orders SET status = ? WHERE id = ?", [status, id]);
      return { success: true };
    } catch (err) {
      fastify.log.error(err);
      reply.status(500).send({ error: "Failed to update order status" });
    }
  }
);

interface ProductRequestBody {
  name: string;
  price: number;
  newprice: number;
  description?: string;
  image_key?: string;
}

// POST /api/admin/products - Add a new product
fastify.post<{ Body: ProductRequestBody }>(
  "/api/admin/products",
  async (request, reply) => {
    const { name, price, newprice, description, image_key } = request.body || {};
    if (!name || price === undefined || newprice === undefined) {
      return reply.status(400).send({ error: "Name, price, and newprice are required" });
    }
    try {
      const pool = await getPool();
      const [result]: any = await pool.query(
        "INSERT INTO products (name, price, newprice, description, image_key) VALUES (?, ?, ?, ?, ?)",
        [name, price, newprice, description || "", image_key || "Asus"]
      );
      return { success: true, productId: result.insertId };
    } catch (err) {
      fastify.log.error(err);
      reply.status(500).send({ error: "Failed to create product" });
    }
  }
);

// PUT /api/admin/products/:id - Update an existing product
fastify.put<{ Params: { id: string }; Body: ProductRequestBody }>(
  "/api/admin/products/:id",
  async (request, reply) => {
    const { id } = request.params;
    const { name, price, newprice, description, image_key } = request.body || {};
    if (!name || price === undefined || newprice === undefined) {
      return reply.status(400).send({ error: "Name, price, and newprice are required" });
    }
    try {
      const pool = await getPool();
      await pool.query(
        "UPDATE products SET name = ?, price = ?, newprice = ?, description = ?, image_key = ? WHERE id = ?",
        [name, price, newprice, description || "", image_key || "Asus", id]
      );
      return { success: true };
    } catch (err) {
      fastify.log.error(err);
      reply.status(500).send({ error: "Failed to update product" });
    }
  }
);

// DELETE /api/admin/products/:id - Delete a product
fastify.delete<{ Params: { id: string } }>(
  "/api/admin/products/:id",
  async (request, reply) => {
    const { id } = request.params;
    try {
      const pool = await getPool();
      await pool.query("DELETE FROM products WHERE id = ?", [id]);
      return { success: true };
    } catch (err) {
      fastify.log.error(err);
      reply.status(500).send({ error: "Failed to delete product" });
    }
  }
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
