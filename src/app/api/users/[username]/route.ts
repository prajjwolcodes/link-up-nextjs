import { db } from "@/lib/prisma"
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { username: string } }) {
    try {
        const { username } = await params

        const clickedUserDetails = await db.user.findUnique({
            where: { username },
            select: {
                id: true,
                username: true,
                displayName: true,
                avatarUrl: true,
                email: true,
                bio: true,
                following: {
                    select: {
                        followerId: true,
                        followingId: true
                    }
                },
                followers: {
                    select: {
                        followerId: true,
                        followingId: true
                    }
                },
                posts: {
                    select: {
                        id: true,
                        content: true,
                        createdAt: true,
                        user: {
                            select: {
                                username: true,
                                displayName: true,
                                avatarUrl: true
                            }
                        },
                        userId: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }

                },
                _count: {
                    select: {
                        followers: true,
                        following: true,
                        posts: true
                    }
                }
            }
        })

        if (!clickedUserDetails) return {}

        return Response.json({ clickedUserDetails })
    } catch (error) {
        console.log("Error in fetching user details", error);
        return Response.json("Error in fetching user details")


    }

}