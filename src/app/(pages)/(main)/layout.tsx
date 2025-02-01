import { validateRequest } from "@/app/api/auth/[...nextauth]/options";
import Navbar from "@/app/(pages)/(main)/components/Navbar";
import AuthProvider from "@/context/authProvider";
import { redirect } from "next/navigation";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const session = await validateRequest()

    if (!session || !session.user) { redirect("/signin") }

    return (
        <AuthProvider>
            <Navbar />
            {children}
        </AuthProvider>
    );

}