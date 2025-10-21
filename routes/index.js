import { Router } from "express";
import authRouter from "./auth.routes.js";
import productRouter from "./product.routes.js";
import cartRouter from "./cart.routes.js";

const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/product", productRouter);
mainRouter.use("/cart", cartRouter);

export default mainRouter;