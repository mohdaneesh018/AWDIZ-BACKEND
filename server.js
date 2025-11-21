import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { verifyToken } from "./middleware/verifytoken.middleware.js";
import mainRouter from "./routes/index.js";
import blogRoute from "./routes/blog.route.js"
import Product from "./model/product.model.js";
import Order from "./model/order.model.js";


dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:5173", // Replace with your actual frontend origin
  credentials: true, // Crucial for allowing cookies
};
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/blog", blogRoute);


let users = [
  {
    id: 1,
    name: "Aneesh",
    email: "aneesh1234@gmail.com",
    password: "1234",
  },
];

app.get("/", (req, res) => {
  res.send(`Hey hello, I'm ${process.env.MYNAME}, Welcome to Express Server!`);
});

app.get("/name", (req, res) => {
  res.send("Hello, I am Mohd Aneesh");
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.send("All fields are required");
  }

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.send("User already exists");
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password,
  };

  users.push(newUser);
  res.send("Registered successfully");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.send("Email and password are required");
  }

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.send("Invalid credentials");
  }

  res.send("Login successful");
});

app.get("/getuser/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u.id == id);

  if (!user) {
    return res.send("User not found");
  }

  res.send(user);
});

app.delete("/deleteuser/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u.id == id);

  if (!user) {
    return res.send("User not found");
  }

  users = users.filter((u) => u.id != id);
  res.send("User deleted successfully");
});

app.put("/edituser/:id", (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;

  const user = users.find((u) => u.id == id);

  if (!user) {
    return res.send("User not found");
  }

  if (email) user.email = email;
  if (password) user.password = password;

  res.status(200).json({
    message: "User updated successfully",
    users,
  });
});

app.use("/api/v1", verifyToken, mainRouter);

// app.get("/test", async (req, res) => {
//   try {

// Comparison Qperators

//     const product = await Product.find({ category: { $eq: "shoes" } });

//     const product = await Product.find({ brand: { $ne: "Puma" } });

//     const product = await Product.find({ price: { $gt: 1600 } });

//     const product = await Product.find({ price: { $gte: 1400 } });

//     const product = await Product.find({ price: { $lt: 1000 } });

//     const product = await Product.find({ price: { $lte: 900 } });

//     const product = await Product.find({ category: { $in: ["t-shirts", "jeans"] } });

//     const product = await Product.find({ category: { $nin: ["t-shirts", "jeans"] } });

// Logical Operators
//     const product = await Product.find({
//       $and: [
//         { category: "shoes" },
//         { brand: "Puma" }
//       ]
//     });

//     const product = await Product.find({
//       $or: [
//         { brand: "adidas" },
//         { price: { $gt: 700 } }
//       ]
//     });

//     const product = await Product.find({
//       $nor: [{ brand: "Fozy" }, { category: "jeans" }],
//     });

//     const product = await Product.find({ price: { $not: { $gt: 1000 } } });

//     const product = await Product.find({
//       stock: { $exists: true },
//     });

//     const product = await Product.find({
//       title: { $type: "string" },
//     });

//     res.json({ success: true, product });
//   } catch (error) {
//     res.status(500).json({ success: false, error });
//   }
// });

// app.get("/test/Pipeline", async (req, res) => {
//   try {
//     const product = await Product.aggregate([
//       { $match: { brand: { $eq: "Puma" } } },

//       { $match: { brand: { $ne: "puma" } } },

//       { $match: { brand: { $in: ["Puma", "jeans"] } } },

//       { $match: { brand: { $nin: ["Puma", "jeans"] } } },

//       {
//         $group: {
//           // _id: "$category",
//           // totalQuantity: { $sum: "$stock" },
//           // totalPrice: { $sum: { $multiply: ["$stock", "$price"] } }

//           _id: "$brand",
//           totalQuantity: { $sum: "$stock" },
//           totalPrice: { $sum: { $multiply: ["$stock", "$price"] } }
//         },
//       },
//     ]);
//     res.status(201).json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// })

app.get("/test/unwind-project", async (req, res) => {
  try {
    const product = await Order.aggregate([
      // { $unwind: "$products" },

      {
        $project: { 
          user: 2,
          productId: "$products.product",
          quantity: "$products.quantity",
        },
      },
    ]);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Hello Aneesh, Database is Connected.");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
