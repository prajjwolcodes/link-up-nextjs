import { Prisma } from "@prisma/client";

export function getUserDataSelect(loggedInUserId: string) {
    return {
        id: true,
        username: true,
        displayName: true,
        avatarUrl: true,
        bio: true,
        createdAt: true,
        followers: {
            where: {
                followerId: loggedInUserId,
            },
            select: {
                followerId: true,
            },
        },
        _count: {
            select: {
                posts: true,
                followers: true,
            },
        },
    } satisfies Prisma.UserSelect;
}

interface Follower {
    followerId: string;
    followingId: string;
}


export interface UserProps {
    id: string;
    username: string;
    displayName: string;
    avatarUrl: string;
    bio: string;
    createdAt: Date;
    followers: Follower[];
    _count: {
        posts: number;
        followers: number;
        following: number;
    };
}