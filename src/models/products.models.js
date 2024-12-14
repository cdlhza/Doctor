import mongoose from "mongoose";
const productsSchema =new mongoose.Schema(
    {
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        default: 0.0,
        required: true
    },
    year:{
        type: Number,
        default:2024,
        required: true,
    },
    image:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

},{
   timestamps: true 
}
);// fin de productosSchema

export default mongoose.model('Prodcuts', productsSchema);