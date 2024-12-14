import { TOKEN_SECRET } from '../config.js';
import jwt from 'jsonwebtoken';

export const authRequiered= (req, res, next)=>{
   const {token}= req.cookies;
   if(!token)
        return res.status(401).json({message: ['No token, authorizacion denegada']});
   
   jwt.verify(token, TOKEN_SECRET, (err, user)=>{
    if(err)
        return res.status(403).json({message: ['Token invalido']})
    // si no hay error guardamos los datos en la base de datos
    req.user=user;
    next();
})
   }
  
