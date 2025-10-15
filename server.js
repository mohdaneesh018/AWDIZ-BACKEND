import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.get("/", (req, res) => {
    console.log(process.env.JMT_SECRET, "-process.env.JMT_SECRET");
    console.log(process.env.MONGODB_URL, "-process.env.mongodb_url");
    res.send(`Welcome to the ${process.env.MY_NAME} to the Express Server`);
    // res.send("Welcome to the Express Server");
});

app.get("/name", (req, res) => {
    res.send("I am Mohd Aneesh");
});

app.listen(8000, () => {
    console.log("Server is running on http://localhost:8000");
});