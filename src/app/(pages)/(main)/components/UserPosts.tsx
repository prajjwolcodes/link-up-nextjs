
import { Heart, MessageCircle, Share2, MoreHorizontal, Bookmark, Pencil, Trash, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import RelativeTime from '@/lib/getRelativeDate';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface PostProps {
    posts: {
        id: string;
        content: string;
        createdAt: Date;
        user: {
            username: string;
            displayName: string;
            avatarUrl: string | null | undefined;
        };
        userId: string;
    }[];

}

const UserPosts = ({ posts }: PostProps) => {
    const queryClient = useQueryClient();
    const { data: session } = useSession()
    const user = session?.user


    const mutation = useMutation({
        mutationFn: async (id: string) => {
            return await axios.delete(`/api/post/delete/${id}`)
        },
        onSuccess: () => {
            toast.success("Post Deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["post-feed", "for-you"] });
        },
        onError: (error) => {
            if (error instanceof Error) {
                console.log("Error: ", error.stack);
            }
        },
        onSettled: () => {
        }
    });

    async function handlePostDelete(id: string) {
        try {
            mutation.mutate(id);
        } catch (error) {
            console.error(error, "Error deleting post");

        }
    }

    return (
        <div className="space-y-6 w-full">
            {
                posts.map((post) => (
                    <Card key={post.id} className="w-full hover:shadow-lg transition-shadow duration-300">
                        {/* Post Header */}
                        <CardHeader className="flex flex-row items-center gap-4 p-6">
                            <div className="relative">
                                <Link href={`/user/${post.user.username}`}>

                                    <Avatar className="h-10 w-10 ring-2 ring-primary/10 hover:ring-primary/30 transition-all">
                                        <AvatarImage src={post.user.avatarUrl || undefined} alt={post.user.username} className='w-full h-full object-cover' />
                                        <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-500 text-white">
                                            {post.user.username[0].toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                </Link>


                            </div>

                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <Link href={`/user/${post.user.username}`}>
                                        <span className="font-semibold hover:text-primary cursor-pointer">
                                            {post.user.displayName}
                                        </span>
                                    </Link>

                                    <span className="text-sm text-muted-foreground">@{post.user.username}</span>
                                    <span className="text-xs text-muted-foreground"><RelativeTime createdAt={post.createdAt} /></span>
                                </div>
                            </div>

                            {user?.id === post.userId && (<DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="ml-auto rounded-full hover:bg-secondary/80">
                                        <MoreHorizontal className="h-5 w-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
                                        <Pencil className="h-4 w-4" />
                                        Edit
                                    </DropdownMenuItem>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <DropdownMenuItem className="flex cursor-pointer items-center gap-2 text-red-600" onSelect={(e) => e.preventDefault()}>
                                                <Trash className="h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete the item.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handlePostDelete(post.id)} className="bg-red-600 hover:bg-red-700">
                                                    Delete
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </DropdownMenuContent>
                            </DropdownMenu>)}


                        </CardHeader>

                        {/* Post Content */}
                        <CardContent className="px-6 space-y-4">
                            <p className="text-gray-800 leading-relaxed">{post.content}</p>

                            {post.user.avatarUrl && (
                                <div className="relative rounded-xl overflow-hidden bg-secondary/10 hover:bg-secondary/20 transition-colors">
                                    <Image
                                        src={post.user.avatarUrl}
                                        alt="Post content"
                                        className="w-full h-[300px] object-cover hover:scale-105 transition-transform duration-300"
                                        fill={true}

                                    />
                                </div>
                            )}

                        </CardContent>
                        <Separator />

                        {/* Action Buttons */}
                        <CardFooter className="p-4">
                            <div className="flex items-center justify-between w-full">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="flex-1 flex items-center gap-2 hover:text-red-500 hover:bg-red-50"
                                >
                                    <Heart className="h-5 w-5" />
                                    <span className="font-medium">Like</span>
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="flex-1 flex items-center gap-2 hover:text-blue-500 hover:bg-blue-50"
                                >
                                    <MessageCircle className="h-5 w-5" />
                                    <span className="font-medium">Comment</span>
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="flex-1 flex items-center gap-2 hover:text-purple-500 hover:bg-purple-50"
                                >
                                    <Bookmark className="h-5 w-5" />
                                    <span className="font-medium">Save</span>
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                ))
            }
        </div >
    )
}

export default UserPosts