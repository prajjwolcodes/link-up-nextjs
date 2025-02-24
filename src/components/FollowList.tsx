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
    loggedInUserId: string;
}

const FollowList: React.FC<FollowListProps> = ({ users: initialUsers, loggedInUserId }) => {
    const [localUsers, setLocalUsers] = useState<User[]>(initialUsers);
    const [animatingIds, setAnimatingIds] = useState<Set<string>>(new Set());

    const followMutation = useMutation({
        mutationFn: (id: string) => axios.post(`/api/users/followers/${id}`),
        onSuccess: (_, id) => {
            toast.success("Following");
            setAnimatingIds(prev => new Set(prev).add(id));

            setTimeout(() => {
                setAnimatingIds(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(id);
                    return newSet;
                });
            }, 500);

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

    const unfollowMutation = useMutation({
        mutationFn: (id: string) => axios.delete(`/api/users/followers/${id}`),
        onSuccess: (_, id) => {
            toast.success("Unfollowed");
            setAnimatingIds(prev => new Set(prev).add(id));

            setTimeout(() => {
                setAnimatingIds(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(id);
                    return newSet;
                });
            }, 500);

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
                                <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-500 text-white">
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

                        <button
                            onClick={() =>
                                user.following?.some(follow => follow.followerId === loggedInUserId)
                                    ? handleUnfollow(user.id)
                                    : handleFollow(user.id)
                            }
                            className={`
                                 py-1.5 rounded-full text-sm font-medium
                                transition-all duration-300 ease-in-out
                                ${animatingIds.has(user.id) ? 'scale-95' : 'scale-100'}
                                ${user.following?.some(follow => follow.followerId === loggedInUserId)
                                    ? 'bg-gray-200 px-4 text-gray-700 hover:bg-gray-300'
                                    : 'bg-gray-900 px-6 text-white hover:bg-gray-800'}
                            `}
                        >
                            {user.following?.some(follow => follow.followerId === loggedInUserId)
                                ? "Following"
                                : "Follow"}
                        </button>
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