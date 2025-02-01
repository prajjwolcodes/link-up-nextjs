'use client'

import React from 'react'
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import AvatarButton from './AvatarButton';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const ProfileButton = () => {
    const { data: session } = useSession()
    const user = session?.user
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                    <AvatarButton avatarUrl={user?.avatarUrl} size={40} />
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56 mt-2">
                    <DropdownMenuLabel className="font-bold text-gray-700">My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-base text-gray-600">
                        {user?.displayName}
                    </DropdownMenuItem>
                    <Link href={`/user/${user?.username}`}>
                        <DropdownMenuItem className="text-gray-600 text-base cursor-pointer hover:text-blue-600">
                            Profile
                        </DropdownMenuItem>
                    </Link>


                    <DropdownMenuItem
                        onClick={() => signOut()}
                        className="text-red-600 cursor-pointer text-base hover:text-red-700 hover:bg-red-50"
                    >
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default ProfileButton