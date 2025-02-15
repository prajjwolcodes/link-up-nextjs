"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Send } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { postSchema } from '@/schema/postSchema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import avatarPng from "../../../../../public/images/avatar.png";
import axios from 'axios';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

import toast from 'react-hot-toast';

const PostSection = () => {
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession();
    const user = session?.user;

    const MAX_LENGTH = 500;

    const form = useForm({
        resolver: zodResolver(postSchema),
        defaultValues: {
            content: ''
        },
    });

    const watchContent = form.watch("content");

    async function onSubmit(data: z.infer<typeof postSchema>) {
        setLoading(true);
        try {
            const res = await axios.post('/api/post/new-post', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            toast.success("Post created successfully");
            form.reset();

        } catch (error) {
            if (error instanceof Error) {
                console.log("Error: ", error.stack)
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="p-4">
            <div className="flex gap-3">
                {/* User Avatar */}
                <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                        {/* <Image
                            src={user?.avatarUrl ?? avatarPng}
                            alt="User avatar"
                            className="w-full h-full object-cover"
                            width={40}
                            height={40}
                        /> */}
                        <Avatar className="h-10 w-10 ring-2 ring-primary/10 hover:ring-primary/30 transition-all">
                            <AvatarImage src={user?.avatarUrl || undefined} alt={user?.username} className='w-full h-full object-cover' />
                            <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-500 text-white">
                                {(user?.username?.[0] || '').toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                </div>

                {/* Post Form */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex-grow space-y-4">
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="What's on your mind?"
                                            className="min-h-[120px] resize-none text-lg placeholder:text-gray-500"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    <div className="text-sm text-gray-500 text-right">
                                        {field.value.length}/{MAX_LENGTH}
                                    </div>
                                </FormItem>
                            )}
                        />

                        {/* Actions Bar */}
                        <div className="flex items-center justify-between border-t pt-3">
                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="default"
                                    className="text-gray-600 border border-gray-400 rounded-md  hover:text-gray-800"
                                >
                                    Photo/Video
                                </Button>
                            </div>
                            <Button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                                disabled={loading || !watchContent.trim() || watchContent.length > MAX_LENGTH}
                            >
                                <Send className="w-4 h-4 mr-2" />
                                {loading ? "Posting..." : "Post"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </Card>
    );
};

export default PostSection;