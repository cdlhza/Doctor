import { z } from 'zod';

export const productSchema = z.object({
  name: z.string({
    required_error: 'Nombre del producto requerido'
  }),
  price: z.string({
    required_error: 'Precio debe ser un número'
  }).optional(),
  year: z.string({
    required_error: 'Año debe ser un número'
  }).optional()
});
// Fin de productSchema
