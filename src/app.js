import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/products.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4000/api",
      "http://localhost",

      process.env.BASE_URL_BACKEND,
      process.env.BASE_URL_FRONTEND,
    ],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/img/", express.static(path.join(__dirname, "/public/img/")));

//indcaciones que el servidor utilise el objeto
app.use("/api/", authRoutes);
app.use("/api/", productRoutes);
app.get("/", (req, res) => {
  res.json({
    mensaje: "Bienvenido a la api rest de productos",
    version: "1.0.0",
    rutasDisponibles: [
      {
        endpoint: "/api/register",
        metodo: "POST",
        descripcion: "Crear un nuevo usuario",
      },
      {
        endpoint: "/api/login",
        metodo: "POST",
        descripcion: "Para iniciar sesion",
      },
    ],
  });
});

export default app;
