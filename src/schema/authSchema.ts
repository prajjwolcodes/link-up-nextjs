import * as z from 'zod';

export const signUpSchema = z.object({
    username: z.string().trim().min(5, "Username must be at least 5 characters long").max(20),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
})

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

export type signUpValues = z.infer<typeof signUpSchema>;
export type signInValues = z.infer<typeof signInSchema>;