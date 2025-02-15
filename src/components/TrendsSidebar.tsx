import React from 'react';
import { Users } from 'lucide-react';
import { db } from '@/lib/prisma';
import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar"
import { validateRequest } from '@/app/api/auth/[...nextauth]/options';
import TrendingTopics from './TrendingTopics';

const TrendsSidebar = async () => {
    const { user } = await validateRequest() as { user: { id: string } }
    const users = await db.user.findMany({
        where: {
            NOT: {
                id: user.id
            }
        },
        select: {
            username: true,
            displayName: true,
            avatarUrl: true
        },
    })

    return (
        <aside className=" rounded-lg">
            <div className="flex flex-col gap-2 mb-4">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <Users className="w-5 h-5 text-gray-600" />
                        <h2 className="text-xl font-semibold text-gray-800">Who to Follow</h2>
                    </div>
                    <div className="space-y-4">
                        {users.map((user, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage className="w-12 h-12" src={user.avatarUrl || undefined} alt="display picture" />
                                        <AvatarFallback className='bg-gradient-to-br from-purple-400 to-pink-500 text-white'>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
                                            {user.displayName}
                                        </h3>
                                        <p className="text-sm text-gray-500">{user.username}</p>
                                    </div>
                                </div>
                                <button className="px-4 py-1.5 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                                    Follow
                                </button>
                            </div>
                        ))}
                    </div>

                    <button className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium w-full text-left">
                        Show more
                    </button>
                </div>
                <div className='mt-5'>
                    <TrendingTopics />
                </div>
            </div>

        </aside>
    );
};

export default TrendsSidebar;