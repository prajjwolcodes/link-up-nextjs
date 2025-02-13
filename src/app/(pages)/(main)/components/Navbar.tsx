import React from 'react';
import Link from 'next/link';
import ProfileButton from '../../../../components/ProfileButton';
import SearchButton from '../../../../components/SearchButton';
import ThemeChanger from '@/components/ThemeChanger';



const Navbar = () => {
    return (
        <nav className=" border-b fixed w-full top-0 z-10 h-16 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and App Name */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-500 hover:to-purple-500 transition-colors">
                                Link Up
                            </h1>
                        </Link>
                    </div>

                    <div className="flex-1 max-w-xl">
                        <SearchButton />
                    </div>

                    {/* Navigation Links and Profile */}
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/settings"
                            className="light:text-gray-600 dark:text-gray-200 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
                        >
                            Settings
                        </Link>

                        <ProfileButton />

                        <ThemeChanger />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;