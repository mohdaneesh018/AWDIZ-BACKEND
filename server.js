import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(express.json());

const users = [];

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
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.send("All fields are required");
            return;
        }

        const existingUser = users.find((u) => u.email === email);
        if (existingUser) {
            res.send("User already exists");
            return;
        }

        users.push({ name, email, password });
        res.send("Registered Successfully");
    }
    catch (error) {
        console.log(error);
    }
})

app.post("/login", (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.send("Email and Password are required");
            return;
        }

        const existingUser = users.find((u) => u.email === email);
        if (!existingUser || existingUser.password !== password) {
            res.send("Invalid");
            return;
        }
        res.send("Login Successfully");
    }
    catch (error) {
        console.log(error);
    }
})

app.listen(8000, () => {
    console.log("Server is running on http://localhost:8000");
});