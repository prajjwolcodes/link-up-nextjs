import { db } from "@/lib/prisma"
import { validateRequest } from "../../auth/[...nextauth]/options"

export async function GET() {
    try {
        const { user } = await validateRequest()

        if (!user) return { status: 401, data: { message: "Unauthorized, User not found" } }

        const posts = await db.post.findMany({
            include: {
                user: {
                    select: {
                        username: true,
                        displayName: true,
                        avatarUrl: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return Response.json({
            posts, message: "For-you posts fetched successfully"
        })
        console.log(posts);
    } catch (error) {
        console.log(error, "Error in getting for-you posts")
    }
}