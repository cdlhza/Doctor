import Products from "../models/products.models.js";
import { unlink } from "fs";
import path from "path";

//Funcion para obtener todos los productos
export const getProducts = async (req, res) => {
  try {
    const products = await Products.find({ user: req.user.id }).populate(
      "user"
    );
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ["Error al obtener los productos"] });
  }
}; //fin de Obtener Product

//funcion para crear products
export const createProduct = async (req, res) => {
  try {
    if (!req.file.filename) {
      return res.status(500).json({
        message: ["Error al crear un producto, no se encontro la imagen"],
      });
    }
    const { name, price, year } = req.body;
    const newProduct = new Products({
      name,
      price,
      year,
      image: req.file.filename,
      user: req.user.id,
    });
    const saveProduct = await newProduct.save();
    res.json(saveProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ["Error al crear los productos"] });
  }
};

//Funcion parra obtener uun producto por id
export const getProductById = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id).populate("user");
    if (!product)
      return res.status(404).json({ message: ["Producto no encontrado"] });
    res.json(product);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: ["Error al obtener los productos "] });
  }
};

//Funcion para eliminar prodcutos
// Función para eliminar un producto
export const deleteProduct = async (req, res) => {
  try {
    // Elimina el producto de la base de datos usando el ID
    const product = await Products.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Obtiene el nombre de la imagen del producto eliminado
    const image = product.image;

    // Genera la ruta completa del archivo de imagen a eliminar
    const ruta = path.resolve("./src/public/img", image);

    // Intenta eliminar el archivo físico de la imagen
    try {
      await fs.unlink(ruta); // Usa fs.promises.unlink
    } catch (err) {
      console.error("Error al eliminar la imagen:", err.message);
      // No terminamos la ejecución si falla, pero registramos el error
    }

    // Devuelve el producto eliminado como respuesta
    return res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al eliminar un producto" });
  }
};
//Funcion para actualizar un producto

export const editProduct = async (req, res) => {
  try {
    const { id } = req.params; // ID del producto a actualizar
    const { name, price, year } = req.body; // Datos del producto enviados en el cuerpo de la solicitud
    let updatedImage;

    // Verifica si se ha enviado una nueva imagen
    if (req.file && req.file.filename) {
      updatedImage = req.file.filename; // Asigna el nombre de la nueva imagen

      // Busca el producto actual para obtener la imagen anterior
      const product = await Products.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }

      const oldImage = product.image;
      const oldImagePath = path.resolve("./src/public/img", oldImage);

      // Intenta eliminar la imagen anterior del sistema de archivos
      unlink(oldImagePath, (err) => {
        if (err) {
          console.error("Error al eliminar la imagen anterior:", err.message);
        }
      });
    }

    // Construye los datos actualizados
    const updatedData = {
      name,
      price,
      year,
      ...(updatedImage && { image: updatedImage }), // Solo incluye la imagen si hay una nueva
    };

    // Encuentra y actualiza el producto en la base de datos
    const updatedProduct = await Products.findByIdAndUpdate(id, updatedData, {
      new: true,
      s,
    });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Retorna el producto actualizado
    return res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al actualizar el producto" });
  }
};
export const updateProductNoUpdateImage = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      price: req.body.price,
      year: req.body.year,
      image: req.body.image,
      user: req.user.id,
    };

    const product = await Products.findByIdAndUpdate(req.params.id, data);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al actualizar un producto" });
  }
};

// Fin de updateProduct
