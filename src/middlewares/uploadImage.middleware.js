import multer from 'multer';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { fileURLToPath } from 'url';

// Obtenemos el nombre del archivo actual a partir de la variable de entorno meta.url
// Posteriormente, obtenemos el nombre de la carpeta actual (en este caso, 'middlewares')
// Concatenamos ../ a dirname para subir a la carpeta src del proyecto
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/img'), // Carpeta donde se guardarán las imágenes
    filename: (req, file, cb, filename) => {
      cb(null, uuid() + path.extname(file.originalname)); // Renombra el archivo con un UUID + su extensión original
    }
  });
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 5 * 1024 * 1024 // Límite de tamaño del archivo: 5MB
    }
  }).single('image'); // Solo se permite subir un archivo con el campo 'image'

  export function uploadImage(req, res, next){
    upload (req, res, (err)=>{
        if (err){
            return res.status(500)
            .json({Message: ['Error al subir la imagem']})
        }
        next();
    })
  }
  