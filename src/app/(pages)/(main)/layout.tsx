import { validateRequest } from "@/app/api/auth/[...nextauth]/options";
import Navbar from "@/app/(pages)/(main)/components/Navbar";
import AuthProvider from "@/context/authProvider";
import { redirect } from "next/navigation";
import MenuBar from "./components/MenuBar";
import PostSection from "./components/PostSection";
import FollowSection from "./components/FollowSection";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const session = await validateRequest()

    if (!session || !session.user) { redirect("/signin") }

    return (
        <AuthProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <Navbar />
                <div className="mt-16 h-screen max-w-7xl mx-auto border border-red-500">
                    <MenuBar />
                    {children}
                </div>
            </div>
        </AuthProvider>
    );

}