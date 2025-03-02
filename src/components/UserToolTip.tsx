
import React from 'react'
import * as Tooltip from '@radix-ui/react-tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import FollowButton from './FollowButton';

interface User {
    user: {
        id: string;
        username: string;
        displayName: string;
        avatarUrl: string;
        followers: {
            followerId: string,
            followingId: string,
        }[] | null,
        _count: {
            following: number,
            followers: number
        }
    };
    children: React.ReactNode,
    loggedInUserId: string

}
const UserToolTip = ({ children, user, loggedInUserId }: User) => {
    return (
        <Tooltip.Provider>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content
                        className="bg-white rounded-xl shadow-lg p-6 w-72 border border-gray-300 z-50"
                        sideOffset={5}
                        avoidCollisions
                    >
                        <div className="flex flex-col">
                            <div className="flex gap-3 items-center mb-4">
                                <Avatar className="h-10 w-10 ring-2 rounded-full ring-primary/10 hover:ring-primary/30 transition-all">
                                    <AvatarImage src={user.avatarUrl || undefined} alt={user.username} className='w-full h-full rounded-full object-cover' />
                                    <AvatarFallback className="bg-gradient-to-br flex justify-center items-center h-full rounded-full from-purple-400 to-pink-500 text-white">
                                        {user.username[0].toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-bold text-gray-900">{user.displayName}</p>
                                    <p className="text-gray-500">@{user.username}</p>
                                </div>
                            </div>
                            <div className="flex justify-between mb-3">
                                <div>
                                    <span className="font-semibold text-gray-900">{user._count.following}</span>
                                    <span className="text-gray-500 ml-1">Followers</span>
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-900">{user._count.followers}</span>
                                    <span className="text-gray-500 ml-1">Following</span>
                                </div>
                            </div>
                            {user.id !== loggedInUserId && <FollowButton user={user} loggedInUserId={loggedInUserId} />}

                        </div>
                        <Tooltip.Arrow className="fill-white" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    )
}

export default UserToolTip