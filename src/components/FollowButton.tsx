'use client'

import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

const FollowButton = ({ loggedInUserId, user }: { loggedInUserId: string, user: User }) => {
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
        <>
            {user.following?.some((follower: Follower) => follower.followerId === loggedInUserId) ? (
                <button
                    onClick={() => handleUnfollow(user.id)}
                    className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                >
                    Following
                </button>
            ) : (
                <button
                    onClick={() => handleFollow(user.id)}
                    className="px-4 py-1.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                    Follow
                </button>
            )}

        </>
    )
}

export default FollowButton

