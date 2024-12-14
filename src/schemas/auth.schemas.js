import {z} from 'zod';

export const registerShema = z.object({

    username:z.string({
        required_error: 'Nombre de usario requerido'
    }),
    email: z.string({
        required_error: 'Email es requerido'
    })
    .email({
        required_error: 'Email invalido'
    }),
    password: z.string({
        required_error: 'Contrana requerida'
    })
    .min(6,{
        message: 'El password dede tener al menenos 6 carateres'
    }),

});//fin de registerShema
export const loginSchema = z.object({

    email: z.string({
        required_error: 'Email es requerido'
    })
    .email({
        required_error: 'Email invalido'
    }),
    password: z.string({
        required_error: 'Contrana requerida'
    })
    .min(6,{
        message: 'El password dede tener al menenos 6 carateres'
    }),

});//fin de loginSchema