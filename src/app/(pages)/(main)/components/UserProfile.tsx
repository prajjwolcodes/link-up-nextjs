"use client"

import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import UserPosts from './UserPosts';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from "react-hot-toast";

interface UserProps {
    username: string,
    loggedInUser: {
        id: string;
    }
}

interface Follower {
    followerId: string,

}
export default function UserProfile({ username, loggedInUser }: UserProps) {

    async function fetchClickedUser({ queryKey }: { queryKey: string[] }) {
        const [, username] = queryKey;
        const res = await axios.get(`/api/users/${username}`);
        return res.data;
    }

    const queryClient = useQueryClient()

    // Fetch userDetails profile dynamically
    const { data: user, isLoading, error } = useQuery({
        queryKey: ['userProfile', username],
        queryFn: fetchClickedUser
    });



    // Follow mutation
    const followMutation = useMutation({
        mutationFn: async (id: string) => await axios.post("/api/users/followers", { followingId: id }),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.setQueryData(['userProfile', username], (oldData: { clickedUserDetails: { following: Follower[], _count: { following: number } } } | undefined) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    clickedUserDetails: {
                        ...oldData.clickedUserDetails,
                        following: [...oldData.clickedUserDetails.following, { followerId: loggedInUser.id }],
                        _count: {
                            ...oldData.clickedUserDetails._count,
                            following: oldData.clickedUserDetails._count.following + 1 // Increase follower count
                        }
                    }
                };
            });
            toast.success("Followed successfully");
        }
    });

    // Mutation for unfollowing a userDetails
    const unfollowMutation = useMutation({
        mutationFn: async (id: string) => await axios.delete("/api/users/followers", { data: { followingId: id } }),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.setQueryData(['userProfile', username], (oldData: { clickedUserDetails: { following: Follower[], _count: { following: number } } } | undefined) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    clickedUserDetails: {
                        ...oldData.clickedUserDetails,
                        following: oldData.clickedUserDetails.following.filter((follower: Follower) => follower.followerId !== loggedInUser.id),
                        _count: {
                            ...oldData.clickedUserDetails._count,
                            following: oldData.clickedUserDetails._count.following - 1 // Decrease follower count
                        }
                    }
                };
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


    const { clickedUserDetails: userDetails } = user

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto max-w-5xl px-4">
                {/* Cover Image */}
                <div className="w-full h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-t-lg"></div>

                {/* Profile Header */}
                <div className="bg-white p-6 shadow rounded-b-lg">
                    <div className="flex flex-col md:flex-row">
                        {/* Avatar */}
                        <div className="relative -mt-16 mb-4 md:mb-0">
                            <Avatar className="h-48 w-48 border-4 border-white shadow-md">
                                <AvatarImage src={userDetails.avatarUrl ?? ""} alt={userDetails.username} />
                                <AvatarFallback>{userDetails?.username.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </div>

                        <div className="md:ml-6 flex flex-col md:flex-row w-full justify-between">
                            {/* User Info */}
                            <div>
                                <h1 className="text-2xl font-bold">{userDetails.displayName}</h1>
                                <p className="text-gray-500">@{userDetails.username}</p>
                                <p className="my-2">{userDetails.bio}</p>
                            </div>

                            {/* Follow Button */}
                            {loggedInUser.id === userDetails.id ? (
                                <div className="mt-4 flex gap-2 md:mt-0">
                                    <Button className="px-10 bg-blue-600 hover:bg-blue-700">Edit</Button>
                                </div>
                            ) : (
                                <div className="mt-4 flex gap-2 md:mt-0">
                                    {userDetails.following?.some((follower: Follower) => follower.followerId === loggedInUser.id) ? (
                                        <Button
                                            className="bg-gray-600 hover:bg-gray-700"
                                            onClick={() => handleUnfollow(userDetails.id)}
                                        >
                                            Unfollow
                                        </Button>
                                    ) : (
                                        <Button
                                            className="bg-blue-600 hover:bg-blue-700"
                                            onClick={() => handleFollow(userDetails.id)}
                                        >
                                            Follow
                                        </Button>
                                    )}
                                    <Button className="bg-gray-600 hover:bg-gray-700">Message</Button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Followers/Following Stats */}
                    <div className="flex gap-4 mt-10">
                        <div className="flex items-center">
                            <span className="font-bold mr-1">{userDetails._count.posts.toLocaleString()}</span>
                            <span className="text-gray-500">Posts</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-bold mr-1">{userDetails._count.followers.toLocaleString()}</span>
                            <span className="text-gray-500">Following</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-bold mr-1">{userDetails._count.following.toLocaleString()}</span>
                            <span className="text-gray-500">Followers</span>
                        </div>
                    </div>
                </div>

                {/* Tabs for Posts */}
                <div className="mt-2 ">
                    <Tabs defaultValue="posts">
                        <TabsList className="w-full">
                            <TabsTrigger value="posts" className="flex-1 py-1">{userDetails.username} Posts</TabsTrigger>
                        </TabsList>

                        <TabsContent value="posts">
                            <UserPosts posts={userDetails.posts} />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
