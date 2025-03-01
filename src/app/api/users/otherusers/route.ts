import { db } from '@/lib/prisma';
import { validateRequest } from '../../auth/[...nextauth]/options';

export async function GET() {
    try {
        const { user } = await validateRequest() as { user: { id: string } }
        const users = await db.user.findMany({
            where: {
                NOT: {
                    id: user.id
                }
            },
            select: {
                id: true,
                username: true,
                displayName: true,
                avatarUrl: true,
                following: {
                    select: {
                        followerId: true,
                        followingId: true
                    }
                }
            },
        })
        return Response.json(users);

    } catch (error) {
        console.log(error, "Error in getting users")
        return Response.json("Error in getting users");


    }
}