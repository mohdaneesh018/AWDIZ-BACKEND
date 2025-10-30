import { Router } from "express";
import { CreateProduct } from "../controllers/product.controllers.js";

const productRouter = Router();

productRouter.post("/create-product", CreateProduct);

export default productRouter;