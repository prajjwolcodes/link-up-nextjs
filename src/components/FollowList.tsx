'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { Users } from 'lucide-react';
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface User {
    id: string;
    avatarUrl?: string | null;
    username: string;
    displayName: string;
    following: {
        followerId: string,
        followingId: string,
    }[] | null;
}

interface FollowListProps {
    users: User[];
    loggedInUserId: string; // Pass the logged-in user's ID
}

const FollowList: React.FC<FollowListProps> = ({ users: initialUsers, loggedInUserId }) => {
    const [localUsers, setLocalUsers] = useState<User[]>(initialUsers);

    // Mutation for following a user
    const followMutation = useMutation({
        mutationFn: (id: string) => axios.post(`/api/users/followers/${id}`),
        onSuccess: (_, id) => {
            toast.success("Following");

            // Update the local state to reflect the follow action
            setLocalUsers(prevUsers =>
                prevUsers.map(user =>
                    user.id === id
                        ? {
                            ...user,
                            following: [
                                ...(user.following || []),
                                { followerId: loggedInUserId, followingId: id },
                            ],
                        }
                        : user
                )
            );
        },
        onError: (error) => {
            console.log(error, "Error in follow");
        },
    });

    // Mutation for unfollowing a user
    const unfollowMutation = useMutation({
        mutationFn: (id: string) => axios.delete(`/api/users/followers/${id}`),
        onSuccess: (_, id) => {
            toast.success("Unfollowed");

            // Update the local state to reflect the unfollow action
            setLocalUsers(prevUsers =>
                prevUsers.map(user =>
                    user.id === id
                        ? {
                            ...user,
                            following: user.following?.filter(
                                follow => follow.followerId !== loggedInUserId
                            ) || [],
                        }
                        : user
                )
            );
        },
        onError: (error) => {
            console.log(error, "Error in unfollow");
        },
    });

    const handleFollow = (id: string) => {
        followMutation.mutate(id);
    };

    const handleUnfollow = (id: string) => {
        unfollowMutation.mutate(id);
    };

    return (
        <div>
            <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-800">Who to Follow</h2>
            </div>
            <div className="space-y-4">
                {localUsers?.map((user, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage className="w-12 h-12" src={user.avatarUrl || undefined} alt="display picture" />
                                <AvatarFallback className='bg-gradient-to-br from-purple-400 to-pink-500 text-white'>
                                    {user.username.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
                                    {user.displayName}
                                </h3>
                                <p className="text-sm text-gray-500">{user.username}</p>
                            </div>
                        </div>

                        {user.following?.some(follow => follow.followerId === loggedInUserId) ? (
                            <button
                                onClick={() => handleUnfollow(user.id)}
                                className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors"
                            >
                                Following
                            </button>
                        ) : (
                            <button
                                onClick={() => handleFollow(user.id)}
                                className="px-4 py-1.5 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                            >
                                Follow
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <button className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium w-full text-left">
                Show more
            </button>
        </div>
    );
};

export default FollowList;