import { Heart, MessageCircle, Share2, MoreHorizontal, Bookmark, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { db } from '@/lib/prisma'
import Image from 'next/image';
import RelativeTime from '@/lib/getRelativeDate';

const Posts = async () => {
    const posts = await db.post.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            user: {
                select: {
                    username: true,
                    displayName: true,
                    avatarUrl: true
                }
            }
        }
    })
    return (
        <div className="w-[1/3] space-y-6 mt-4">
            {
                posts.map((post) => (
                    <Card key={post.id} className="w-full hover:shadow-lg transition-shadow duration-300">
                        {/* Post Header */}
                        <CardHeader className="flex flex-row items-center gap-4 p-6">
                            <div className="relative">
                                <Avatar className="h-10 w-10 ring-2 ring-primary/10 hover:ring-primary/30 transition-all">
                                    <AvatarImage src={post.user.avatarUrl || undefined} alt={post.user.username} className='w-full h-full object-cover' />
                                    <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-500 text-white">
                                        {post.user.username[0].toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>

                            </div>

                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold hover:text-primary cursor-pointer">
                                        {post.user.displayName}
                                    </span>
                                    <span className="text-sm text-muted-foreground">@{post.user.username}</span>
                                    <span className="text-xs text-muted-foreground"><RelativeTime createdAt={post.createdAt.toISOString()} /></span>
                                </div>
                            </div>

                            <Button variant="ghost" size="icon" className="ml-auto rounded-full hover:bg-secondary/80">
                                <MoreHorizontal className="h-5 w-5" />
                            </Button>
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

                            {/* Engagement Stats */}
                            {/* <div className="flex items-center justify-between pt-4 text-sm text-muted-foreground">
                            <span>{post.likes || 0} likes</span>
                            <span>{post.comments || 0} comments</span>
                            <span>{post.shares || 0} shares</span>
                        </div> */}
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

export default Posts