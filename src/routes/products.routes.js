import { Router } from "express";
import { authRequiered } from "../middlewares/validateToken.js";
import {
  createProduct,
  getProducts,
  getProductById,
  editProduct,
  deleteProduct,
  updateProductNoUpdateImage,
} from "../controllers/products.controller.js";

//importaremos el validateSchema
import { validateSchema } from "../middlewares/validator.middleware.js";
//importaremos  los esqumas de validacion
import { productSchema } from "../schemas/product.schemas.js";

import { uploadImage } from "../middlewares/uploadImage.middleware.js";

const router = Router();

//router.get('/productos', authRequiered, (req, res)=>res.send('Productos'));
//ruta para obetern el producto
router.get("/products", authRequiered, getProducts);

//ruta para crear UN PRODUCTO
router.post(
  "/products",
  authRequiered,
  uploadImage,
  validateSchema(productSchema),
  createProduct
);

//ruta para get producto id
router.get("/products/:id", authRequiered, getProductById);

//ruta para eliminar un producto
router.delete("/products/:id", authRequiered, deleteProduct);

//ruta para atulizar un producto
router.put(
  "/products/:id",
  authRequiered,
  uploadImage,
  validateSchema(productSchema),
  editProduct
);
router.put(
  "/productsupdatenoimage/:id",
  authRequiered,
  uploadImage,
  validateSchema(productSchema),
  updateProductNoUpdateImage
);

export default router;
