import { db } from '@/lib/prisma';
import { validateRequest } from '@/app/api/auth/[...nextauth]/options';
import TrendingTopics from './TrendingTopics';
import FollowList from './FollowList';

const TrendsSidebar = async () => {
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

    return (
        <aside className=" rounded-lg">
            <div className="flex flex-col gap-2 mb-4">
                <FollowList users={users || null} loggedInUserId={user.id} />
                <div className='mt-5'>
                    <TrendingTopics />
                </div>
            </div>

        </aside>
    );
};

export default TrendsSidebar;