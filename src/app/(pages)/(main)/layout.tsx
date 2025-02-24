import { validateRequest } from "@/app/api/auth/[...nextauth]/options";
import Navbar from "@/app/(pages)/(main)/components/Navbar";
import AuthProvider from "@/context/authProvider";
import { redirect } from "next/navigation";
import MenuBar from "./components/MenuBar";

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
                <div className="relative mt-16 max-w-[90rem] grid grid-cols-5 gap-4 mx-auto border border-red-500">
                    <MenuBar />
                    <div className="col-span-4">
                        {children}
                    </div>
                </div>
            </div>
        </AuthProvider>
    );

}