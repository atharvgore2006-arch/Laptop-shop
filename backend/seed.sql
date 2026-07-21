USE laptop_shop_db;

-- Clear products table
DELETE FROM order_items;
DELETE FROM products;

-- Insert initial product data
INSERT INTO products (id, name, price, newprice, description, image_key) VALUES
(1, 'Asus Rog Strix G16', 159999.00, 157899.00, 'a high-performance 16-inch gaming laptop featuring up to Intel Core Ultra 9 275HX or AMD Ryzen 9 8940HX processors and NVIDIA RTX 50-series GPUs (up to 175W TGP). It boasts a 16:10 ROG Nebula Display (2.5K 240Hz or FHD+ 165Hz) and advanced cooling with liquid metal', 'Asus'),
(2, 'Lenovo LOQ', 84999.00, 83890.00, '2026 AI-powered gaming laptop featuring an AMD Ryzen 5 7235HS processor, dedicated NVIDIA RTX 4050 6GB GDDR6 graphics (105W TGP), 16GB DDR5 RAM, and a 512GB SSD. It offers a 15.6\" FHD (1920x1080) 144Hz display with 300nits brightness and G-SYNC. This Luna Grey laptop runs Windows 11 with Office Home 2024, includes 3 months of Game Pass, and features Hyperchamber thermal design.', 'Lenovo'),
(3, 'HP Omen Gaming Laptop', 144990.00, 143900.00, 'is a high-performance gaming laptop featuring a 14th Gen Intel Core i7-14650HX processor, NVIDIA GeForce RTX 5050 (8GB GDDR6) graphics, and 24GB DDR5 RAM. It is designed for immersive, fast-paced gaming, boasting a 16.1-inch 2K (16:10) IPS, 165Hz display, 1TB SSD, and 4-zone RGB keyboard.', 'Hp'),
(4, 'Dell 15', 65960.00, 64678.00, 'a premium, convertible 2-in-1 business laptop designed for versatility and security, featuring a 360-degree hinge that allows it to function as a laptop, tablet, or tent.', 'dell'),
(5, 'Lenovo ThinkBook 14', 73690.00, 72867.00, 'is a 14-inch, aluminium-chassis business-oriented laptop (1.36kg+) designed for SMBs, offering Intel Core Ultra processors, AI-driven performance, and high durability (MIL-STD-810H). It features 16:10 WUXGA displays, up to 64GB DDR5 RAM, and robust security including an optional fingerprint reader and privacy shutter.', 'Thickbook'),
(6, 'Apple Macbook Neo 13', 77000.00, 75990.00, 'is an entry-level laptop featuring the A18 Pro chip, designed for AI-driven performance, a 13-inch Liquid Retina display (2408x1506), and up to 16 hours of battery life. It comes in four colors with a durable, 60% recycled aluminum body and starts at a competitive price point in the Apple lineup.', 'Neo');
