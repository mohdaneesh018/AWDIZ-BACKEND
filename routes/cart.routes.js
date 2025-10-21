import { Router } from "express";

const cartRouter = Router();

cartRouter.post("/cart-page", (req, res) => {
    res.send("Cart Page");
}); 

export default cartRouter;