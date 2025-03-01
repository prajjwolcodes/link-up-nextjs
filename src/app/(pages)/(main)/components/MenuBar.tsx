import React from 'react';
import { Home, Bell, MessageSquare, Bookmark } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

const MenuBar = () => {
    const menuItems = [
        { icon: Home, label: 'Home', href: '/' },
        { icon: Bell, label: 'Notifications', href: '/notifications' },
        { icon: MessageSquare, label: 'Messages', href: '/messages' },
        { icon: Bookmark, label: 'Bookmarks', href: '/bookmarks' },
    ];

    return (
        <>
            <nav className="w-[25%] relative text-black dark:text-gray-100">
                <div className=''>
                    {menuItems.map((item) => (
                        <Button
                            key={item.label}
                            variant="ghost"
                            className="w-full justify-start gap-6 px-6 py-6 text-lg hover:bg-gray-100"
                            asChild
                        >
                            <Link href={item.href}>
                                <item.icon className="w-6 h-6" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        </Button>
                    ))}
                </div>
            </nav>

            <div className="sticky bottom-0 flex w-full justify-center gap-5 border-t bg-card p-3 sm:hidden">
                <nav className="flex justify-around p-3">
                    {menuItems.map((item) => (
                        <Button
                            key={item.label}
                            variant="ghost"
                            size="icon"
                            className="hover:bg-gray-100"
                            asChild
                        >
                            <a href={item.href} aria-label={item.label}>
                                <item.icon className="w-7 h-7" />
                            </a>
                        </Button>
                    ))}
                </nav>
            </div>
        </>
    );
};

export default MenuBar;