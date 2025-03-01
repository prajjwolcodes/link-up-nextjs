import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { validateRequest } from "@/app/api/auth/[...nextauth]/options";

export const POST = async (req: Request) => {
    try {
        const { user } = await validateRequest() as { user: { id: string } };
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { followingId } = await req.json();

        // Check if already following
        const existingFollow = await db.follow.findFirst({
            where: { followerId: user.id, followingId }
        });

        if (existingFollow) {
            console.log("Already following");

            return NextResponse.json({ message: "Already following" }, { status: 400 });
        }

        // Follow user
        await db.follow.create({
            data: { followerId: user.id, followingId }
        });

        return NextResponse.json({ message: "Followed successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
};

export const DELETE = async (req: Request) => {
    try {
        const { user } = await validateRequest() as { user: { id: string } };
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { followingId } = await req.json();

        // Unfollow user
        await db.follow.deleteMany({
            where: { followerId: user.id, followingId }
        });

        return NextResponse.json({ message: "Unfollowed successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
};
