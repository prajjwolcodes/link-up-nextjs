import * as z from 'zod';

export const postSchema = z.object({
    content: z.string().min(1, "Post cannot be empty").max(500, "Post cannot be longer than 500 characters"),
})

export type postValues = z.infer<typeof postSchema>;

