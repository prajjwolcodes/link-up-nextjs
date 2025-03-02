import { db } from "@/lib/prisma"
import { validateRequest } from "../../auth/[...nextauth]/options"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    try {
        const { user } = await validateRequest()

        if (!user) return { status: 401, data: { message: "Unauthorized, User not found" } }

        const { searchParams } = new URL(req.url)
        const page = Number(searchParams.get("page")) || 1;
        const limit = Number(searchParams.get("limit")) || 10;
        const skip = (page - 1) * limit;

        console.log(searchParams);

        const posts = await db.post.findMany({
            skip,
            take: limit,
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        displayName: true,
                        avatarUrl: true,
                        followers: {
                            select: {
                                followerId: true,
                                followingId: true
                            }
                        },
                        following: {
                            select: {
                                followerId: true,
                                followingId: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        const nextPage = posts.length < limit ? null : page + 1;

        return Response.json({
            posts, nextPage, message: "For-you posts fetched successfully"
        })
    } catch (error) {
        console.log(error, "Error in getting for-you posts")
    }
}