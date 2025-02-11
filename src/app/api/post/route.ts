import { NextRequest } from "next/server";
import { validateRequest } from "../auth/[...nextauth]/options";
import { db } from "@/lib/prisma";
import { postSchema } from "@/schema/postSchema";

export async function POST(req: NextRequest) {
    const { user }: { user: { id: string } } = await validateRequest() as { user: { id: string } }

    if (!user) throw new Error("Unauthorized")

    console.log(user)

    const { content } = await req.json()
    console.log(content)

    const newPost = await db.post.create({
        data: {
            content,
            userId: user.id
        }
    })

    return Response.json({
        newPost,
        message: "Post created successfully"
    })
}