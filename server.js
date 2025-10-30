import express from "express";
import dotenv from "dotenv";
import mainRouter from "./routes/index.js";
import mongoose from "mongoose";


const app = express();
dotenv.config();
app.use(express.json());

// const users = [];
let users = [
  {
    name: "Aneesh",
    id: 1,
    email: "aneesh123@gmail.com",
    password: "1234",
  },
];

app.get("/", (req, res) => {
  console.log(process.env.JMT_SECRET, "-process.env.JMT_SECRET");
  console.log(process.env.MONGODB_URL, "-process.env.mongodb_url");
  res.send(`Welcome to the ${process.env.MY_NAME} to the Express Server`);
  // res.send("Welcome to the Express Server");
});


app.get("/name", (req, res) => {
  res.send("I am Mohd Aneesh");
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

  if (email) {
    user.email = email;
  }
  if (password) {
    user.password = password;
  }

  res.status(200).json({ message: "User updated successfully", users, });
});


app.use("/api/v1", mainRouter);

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Hello Aneesh, Your DataBase is Connected")
}).catch((error) => {
  console.log("MongoDB Connection Error", error)
})

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});