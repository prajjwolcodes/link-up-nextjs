'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { Users } from 'lucide-react';
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

interface User {
    id: string;
    username: string;
    displayName: string;
    avatarUrl?: string;
    following?: Follower[];
}

interface Follower {
    followerId: string;
}

const fetchUsers = async () => {
    const res = await axios.get('/api/users/otherusers');
    return res.data;
}

const FollowList = ({ loggedInUserId }: { loggedInUserId: string }) => {
    const queryClient = useQueryClient();

    const { data: users, isLoading, error } = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers
    });

    // Follow Mutation with UI Cache Update
    const followMutation = useMutation({
        mutationFn: async (id: string) => await axios.post("/api/users/followers", { followingId: id }),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ["userProfile"] });
            queryClient.setQueryData(["users"], (oldData: User[] | undefined) => {
                if (!oldData) return oldData;
                return oldData.map((user: User) =>
                    user.id === id
                        ? { ...user, following: [...(user.following || []), { followerId: loggedInUserId }] }
                        : user
                );
            });
            toast.success("Followed successfully");
        }
    });

    // Unfollow Mutation with UI Cache Update
    const unfollowMutation = useMutation({
        mutationFn: async (id: string) => await axios.delete("/api/users/followers", { data: { followingId: id } }),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ["userProfile"] });
            queryClient.setQueryData(["users"], (oldData: User[] | undefined) => {
                if (!oldData) return oldData;
                return oldData.map((user: User) =>
                    user.id === id
                        ? {
                            ...user,
                            following: user.following?.filter((follower) => follower.followerId !== loggedInUserId)
                        }
                        : user
                );
            });
            toast.success("Unfollowed successfully");
        }
    });

    const handleFollow = async (id: string) => {
        try {
            followMutation.mutate(id);
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const handleUnfollow = async (id: string) => {
        try {
            unfollowMutation.mutate(id);
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    if (isLoading) return <p>Loading users...</p>;
    if (error) return <p>Error loading users</p>;

    return (
        <div>
            <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-800">Who to Follow</h2>
            </div>
            <div className="space-y-4">
                {users?.map((user: User) => (
                    <div key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link href={`/user/${user.username}`}>
                                <Avatar>
                                    <AvatarImage className="w-12 h-12" src={user.avatarUrl || undefined} alt="display picture" />
                                    <AvatarFallback className='bg-gradient-to-br from-purple-400 to-pink-500 text-white'>
                                        {user.username.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </Link>

                            <div>
                                <Link href={`/user/${user.username}`}>
                                    <h3 className="font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
                                        {user.displayName}
                                    </h3>
                                </Link>
                                <p className="text-sm text-gray-500">{user.username}</p>
                            </div>
                        </div>

                        {user.following?.some((follower: Follower) => follower.followerId === loggedInUserId) ? (
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
