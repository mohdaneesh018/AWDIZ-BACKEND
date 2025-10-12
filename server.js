import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Welcome to the Express Server");
});

app.get("/name", (req, res) => {
    res.send("I am Mohd Aneesh");
}); 

app.listen(8000, () => {
    console.log("Server is running on http://localhost:8000");
});