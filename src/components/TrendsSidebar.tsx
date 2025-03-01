import { validateRequest } from '@/app/api/auth/[...nextauth]/options';
import TrendingTopics from './TrendingTopics';
import FollowList from './FollowList';

const TrendsSidebar = async () => {
    const { user } = await validateRequest() as { user: { id: string } }
    return (
        <aside className=" rounded-lg">
            <div className="flex flex-col gap-2 mb-4">
                <FollowList loggedInUserId={user.id} />
                <div className='mt-5'>
                    <TrendingTopics />
                </div>
            </div>

        </aside>
    );
};

export default TrendsSidebar;