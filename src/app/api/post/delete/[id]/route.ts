import { validateRequest } from "@/app/api/auth/[...nextauth]/options";
import { db } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const user = await validateRequest();
        if (!user) {
            return new Response("Unauthorized, not logged in", { status: 401 });
        }
        const { id } = await params;
        const post = await db.post.delete({
            where: { id: id, },
        });

        if (!post) {
            return Response.json({ message: "Post with id: ${id} not found" }, { status: 404 });
        }

        return Response.json({
            message: `Post with id: ${id} deleted`,
            post
        })
    } catch (error) {
        console.error(error);

    }
}