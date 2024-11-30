import {z} from 'zod';

export const registerSchema = z.object({
    username: z.string({
        required_error: "Usuario es requerido",
    }),

    code: z
        .string({
        required_error: "Código es requerido",
    }),

    password: z
        .string({
            required_error: "Contraseña es requerido"
        })
        .min(6, {
            message: "La contraseña debe tener mínimo 6 caracteres"
        })
});




export const loginSchema = z.object({
    code: z
    .string({
    required_error: "Código es requerido",
    }),

    password: z
    .string({
        required_error: "Contraseña es requerido"
    })
    .min(6, {
        message: "La contraseña debe tener mínimo 6 caracteres"

    })
})