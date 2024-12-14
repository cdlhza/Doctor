//Funcion para registrar usuarios
import User from "../models/user.models.js";
import { createAccessToken } from "../libs/jwt.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  // console.log(username, email, password);

  try {
    //validamos que el email no este registrado en la base de datos
    const userFound = await User.findOne({ email });
    if (userFound) {
      // si se encontro un usuario que ya tenga este mail
      return res
        .status(400) // terona un mensaje de error
        .json({ message: "Email ya esta en uso" });
    }
    const passwordHash = await bcryptjs.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save();
    //console.log(newSaved);
    //res.send("Registrando");
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
    });

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createAt: userSaved.createAt,
      updateAt: userSaved.updateAt,
    });
  } catch (error) {
    console.log(error);
  }
};

//Funcion para iniciar sesion
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }
    //comparamos el password que envio el usuario con el de la base de datos
    const isMatch = await bcryptjs.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }
    const token = await createAccessToken({ id: userFound._id });
    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
    });

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createAt: userFound.createAt,
      updateAt: userFound.updateAt,
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  return res.sendStatus(200);
};

/*export const profile = (req, res) => {
  console.log(req.user);
  res.send("Profile");
}   */

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound) {
    return res.status(400).json({ message: "Usuario no encontrado" });
  }
  res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
  });
}; // fin de profile

// Función para validar el token de inicio de sesión
export const verifyToken = async (req, res) => {
  const { token } = req.cookies; // Se obtiene el token de las cookies

  if (!token) {
    return res.status(401).json({ message: ["No autorizado"] }); // Si no hay token, retorna un error 401
  }

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    // Verifica el token usando el secreto (TOKEN_SECRET)
    if (err)
      // Si hay un error al validar el token
      return res.status(401).json({ message: ["No autorizado"] });

    const userFound = await User.findById(user.id);
    // Busca al usuario en la base de datos usando el ID obtenido del token
    if (!userFound)
      // Si no se encuentra el usuario asociado al token
      return res.status(401).json({ message: ["No autorizado"] });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
    // Retorna los datos del usuario si todo es válido
  });
};
