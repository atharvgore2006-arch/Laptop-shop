import mysql, { Pool } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
};

let pool: Pool | null = null;

export async function getPool(): Promise<Pool> {
  if (!pool) {
    pool = mysql.createPool({
      ...dbConfig,
      database: process.env.DB_NAME || "laptop_shop_db",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  newprice: number;
  description: string;
  image_key: string;
}

const seedProducts: Product[] = [
  {
    id: 1,
    name: "Asus Rog Strix G16",
    price: 159999.0,
    newprice: 157899.0,
    description:
      "a high-performance 16-inch gaming laptop featuring up to Intel Core Ultra 9 275HX or AMD Ryzen 9 8940HX processors and NVIDIA RTX 50-series GPUs (up to 175W TGP). It boasts a 16:10 ROG Nebula Display (2.5K 240Hz or FHD+ 165Hz) and advanced cooling with liquid metal",
    image_key: "Asus",
  },
  {
    id: 2,
    name: "Lenovo LOQ",
    price: 84999.0,
    newprice: 83890.0,
    description:
      '2026 AI-powered gaming laptop featuring an AMD Ryzen 5 7235HS processor, dedicated NVIDIA RTX 4050 6GB GDDR6 graphics (105W TGP), 16GB DDR5 RAM, and a 512GB SSD. It offers a 15.6" FHD (1920x1080) 144Hz display with 300nits brightness and G-SYNC. This Luna Grey laptop runs Windows 11 with Office Home 2024, includes 3 months of Game Pass, and features Hyperchamber thermal design.',
    image_key: "Lenovo",
  },
  {
    id: 3,
    name: "HP Omen Gaming Laptop",
    price: 144990.0,
    newprice: 143900.0,
    description:
      "is a high-performance gaming laptop featuring a 14th Gen Intel Core i7-14650HX processor, NVIDIA GeForce RTX 5050 (8GB GDDR6) graphics, and 24GB DDR5 RAM. It is designed for immersive, fast-paced gaming, boasting a 16.1-inch 2K (16:10) IPS, 165Hz display, 1TB SSD, and 4-zone RGB keyboard.",
    image_key: "Hp",
  },
  {
    id: 4,
    name: "Dell 15",
    price: 65960.0,
    newprice: 64678.0,
    description:
      "a premium, convertible 2-in-1 business laptop designed for versatility and security, featuring a 360-degree hinge that allows it to function as a laptop, tablet, or tent.",
    image_key: "dell",
  },
  {
    id: 5,
    name: "Lenovo ThinkBook 14",
    price: 73690.0,
    newprice: 72867.0,
    description:
      "is a 14-inch, aluminium-chassis business-oriented laptop (1.36kg+) designed for SMBs, offering Intel Core Ultra processors, AI-driven performance, and high durability (MIL-STD-810H). It features 16:10 WUXGA displays, up to 64GB DDR5 RAM, and robust security including an optional fingerprint reader and privacy shutter.",
    image_key: "Thickbook",
  },
  {
    id: 6,
    name: "Apple Macbook Neo 13",
    price: 77000.0,
    newprice: 75990.0,
    description:
      "is an entry-level laptop featuring the A18 Pro chip, designed for AI-driven performance, a 13-inch Liquid Retina display (2408x1506), and up to 16 hours of battery life. It comes in four colors with a durable, 60% recycled aluminum body and starts at a competitive price point in the Apple lineup.",
    image_key: "Neo",
  },
];

export async function initializeDatabase(): Promise<void> {
  console.log("Initializing database connection...");

  // Connect to MySQL without database first
  const connection = await mysql.createConnection(dbConfig);

  const dbName = process.env.DB_NAME || "laptop_shop_db";
  console.log(`Ensuring database '${dbName}' exists...`);
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
  await connection.end();

  // Now get the pool with the database selected
  const activePool = await getPool();

  // Create products table
  console.log("Ensuring tables exist...");
  await activePool.query(`
        CREATE TABLE IF NOT EXISTS products (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            newprice DECIMAL(10, 2) NOT NULL,
            description TEXT,
            image_key VARCHAR(100) NOT NULL
        )
    `);

  // Create orders table
  await activePool.query(`
        CREATE TABLE IF NOT EXISTS orders (
            id INT AUTO_INCREMENT PRIMARY KEY,
            total_price DECIMAL(10, 2) NOT NULL,
            status VARCHAR(50) DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);

  // Create order_items table
  await activePool.query(`
        CREATE TABLE IF NOT EXISTS order_items (
            id INT AUTO_INCREMENT PRIMARY KEY,
            order_id INT NOT NULL,
            product_id INT NOT NULL,
            quantity INT NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
            FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
        )
    `);

  // Create contact_messages table
  await activePool.query(`
        CREATE TABLE IF NOT EXISTS contact_messages (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);

  // Check if products exist, seed if not
  const [rows]: any = await activePool.query(
    "SELECT COUNT(*) as count FROM products",
  );
  if (rows[0].count === 0) {
    console.log("Database is empty. Seeding initial products...");
    for (const prod of seedProducts) {
      await activePool.query(
        "INSERT INTO products (id, name, price, newprice, description, image_key) VALUES (?, ?, ?, ?, ?, ?)",
        [
          prod.id,
          prod.name,
          prod.price,
          prod.newprice,
          prod.description,
          prod.image_key,
        ],
      );
    }
    console.log("Database successfully seeded!");
  } else {
    console.log("Products already exist in database. Skipping seed.");
  }
}
