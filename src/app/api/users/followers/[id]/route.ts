import { NextRequest } from "next/server";
import { validateRequest } from "../../../auth/[...nextauth]/options";
import { db } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { user: loggedInUser }: { user: { id: string } } = await validateRequest() as { user: { id: string } };
    const { id } = await params


    if (!loggedInUser)
        return Response.json({ message: "Not logged in" }, { status: 401 });

    try {
        const user = await db.user.findUnique({
            where: { id },
            select: {
                followers: {
                    where: {
                        followerId: loggedInUser?.id
                    },
                    select: {
                        followerId: true
                    },
                },
                _count: {
                    select: {
                        followers: true
                    }
                }
            }
        })

        if (!user)
            return Response.json({ message: "User Not found" }, { status: 404 });

        const followData = {
            followers: user._count.followers,
            isFollowedByMe: !!user.followers.length
        }

        return Response.json({ message: "Follower Fetched Succesfully", followData }, { status: 200 });
    } catch (error) {
        console.log("Error while fetching follower", error)
        return Response.json({ message: " Error while fetching followers" });

    }


}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    const { user: loggedInUser }: { user: { id: string } } = await validateRequest() as { user: { id: string } };

    const { id } = await params


    // if (!loggedInUser)
    //     return Response.json({ message: "Not logged in" }, { status: 401 });
    try {
        const user = await db.follow.upsert({
            where: {
                followerId_followingId: {
                    followerId: loggedInUser?.id,
                    followingId: id
                }
            },
            create: {
                followerId: loggedInUser?.id,
                followingId: id
            },
            update: {}
        })

        if (!user)
            return Response.json({ message: "User Not found" }, { status: 404 });

        return Response.json({ message: "Succesfully followed" }, { status: 200 });
    } catch (error) {
        console.log("Error while following user", error)
        return Response.json({ message: " Error while following user" });


    }
}

export async function DELETE(eq: NextRequest, { params }: { params: { id: string } }) {
    const { user: loggedInUser }: { user: { id: string } } = await validateRequest() as { user: { id: string } };
    const { id } = await params

    // if (!loggedInUser)
    //     return Response.json({ message: "Not logged in" }, { status: 401 });
    try {
        const user = await db.follow.deleteMany({
            where: {
                followerId: loggedInUser.id,
                followingId: id
            }
        })

        return Response.json({ message: " Unfollowed" }, { status: 200 });
    } catch (error) {
        console.log("Error while unfollowing user", error)
        return Response.json({ message: " Error while unfollowing user" });


    }
}