import { Router } from "express";

const authRouter = Router();

authRouter.post("/login", (req, res) => {
    res.send("Login Route");
});

authRouter.post("/register", (req, res) => {
    res.send("Register Route");
});

export default authRouter;