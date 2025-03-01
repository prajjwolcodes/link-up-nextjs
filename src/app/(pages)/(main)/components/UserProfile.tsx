"use client"

import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import UserPosts from './UserPosts';
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from "react-hot-toast";

interface UserProps {
    user: {
        id: string;
        displayName: string;
        username: string;
        email: string | null;
        avatarUrl: string | null;
        bio: string | null;
        posts: {
            id: string;
            content: string;
            createdAt: Date;
            user: {
                username: string;
                displayName: string;
                avatarUrl: string | undefined | null;
            };
            userId: string;
        }[];
        followers: {
            followerId: string;
            followingId: string;
        }[];
        _count: {
            followers: number,
            following: number,
            posts: number
        };
    },
    loggedInUser: {
        id: string;
    }
}




export default function UserProfile({ user, loggedInUser }: UserProps) {
    const { data } = useQuery({
        queryKey: ["follower-info", user.id],
        queryFn: () =>
            axios.get(`/api/users/followers/${user.id}`),
        staleTime: Infinity,
    });

    const [isFollowing, setIsFollowing] = useState(user.followers.some(({ followerId }) => followerId === loggedInUser.id));
    const [followersCount, setFollowersCount] = useState(user._count.followers);

    console.log(data?.data.followData, "data")

    // Follow mutation
    const followMutation = useMutation({
        mutationFn: () => axios.post(`/api/users/followers/${user.id}`),
        onSuccess: () => {
            toast.success("Following");
        },
        onError: (error) => {
            console.log(error, "Error in follow");
            toast.error("Failed to follow");
        }
    });

    // Unfollow mutation
    const unfollowMutation = useMutation({
        mutationFn: () => axios.delete(`/api/users/followers/${user.id}`),
        onSuccess: () => {
            toast.success("Unfollowed");
        },
        onError: (error) => {
            console.log(error, "Error in unfollow");
            toast.error("Failed to unfollow");
        }
    });

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
                                <AvatarImage src={user.avatarUrl ?? ""} alt={user.username} />
                                <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </div>

                        <div className="md:ml-6 flex flex-col md:flex-row w-full justify-between">
                            {/* User Info */}
                            <div>
                                <h1 className="text-2xl font-bold">{user.displayName}</h1>
                                <p className="text-gray-500">@{user.username}</p>
                                <p className="my-2">{user.bio}</p>
                            </div>

                            {/* Follow Button */}
                            {loggedInUser.id === user.id ? (
                                <div className="mt-4 flex gap-2 md:mt-0">
                                    <Button className="px-10 bg-blue-600 hover:bg-blue-700">Edit</Button>
                                </div>
                            ) : (
                                <div className="mt-4 flex gap-2 md:mt-0">
                                    {data?.data.followData.isFollowedByMe ? (
                                        <Button
                                            className="bg-gray-600 hover:bg-gray-700"
                                            onClick={() => unfollowMutation.mutate()}
                                            disabled={unfollowMutation.isPending}
                                        >
                                            Unfollow
                                        </Button>
                                    ) : (
                                        <Button
                                            className="bg-blue-600 hover:bg-blue-700"
                                            onClick={() => followMutation.mutate()}
                                            disabled={followMutation.isPending}
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
                            <span className="font-bold mr-1">{user._count.posts.toLocaleString()}</span>
                            <span className="text-gray-500">Posts</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-bold mr-1">{data?.data.followData.followers}</span>
                            <span className="text-gray-500">Following</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-bold mr-1">{user._count.following.toLocaleString()}</span>
                            <span className="text-gray-500">Followers</span>
                        </div>
                    </div>
                </div>

                {/* Tabs for Posts */}
                <div className="mt-2 ">
                    <Tabs defaultValue="posts">
                        <TabsList className="w-full">
                            <TabsTrigger value="posts" className="flex-1 py-1">{user.username} Posts</TabsTrigger>
                        </TabsList>

                        <TabsContent value="posts">
                            <UserPosts posts={user.posts} />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
