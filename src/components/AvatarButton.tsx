import avatar from "../../public/images/avatar.png"
import React from 'react'
import Image from 'next/image'

interface AvatarButtonProps {
    avatarUrl: string | null | undefined
    size: number
}

const AvatarButton = ({ avatarUrl, size }: AvatarButtonProps) => {

    return (
        <div className="rounded-full mt-2 overflow-hidden border-2 border-gray-200 hover:border-blue-500 transition-colors"
            style={{ width: `${size}px`, height: `${size}px`, minWidth: `${size}px`, minHeight: `${size}px` }}>
            <div className="relative w-full h-full">
                <Image
                    src={avatarUrl ? avatarUrl : avatar}
                    alt="avatar"
                    className="object-cover"
                    fill
                />
            </div>
        </div>
    )
}

export default AvatarButton