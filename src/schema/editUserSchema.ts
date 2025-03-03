import * as z from 'zod';

export const editUserSchema = z.object({
    displayName: z.string().min(1, "Display name cannot be empty").max(500, "Display name cannot be longer than 500 characters"),
    bio: z.string().max(500, "Bio cannot be longer than 500 characters"),
})

export type editUserSchemaValues = z.infer<typeof editUserSchema>;

