import { validateRequest } from "@/app/api/auth/[...nextauth]/options";
import AuthProvider from "@/context/authProvider";
import { redirect } from "next/navigation";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const session = await validateRequest()
    console.log(session);

    if (!session || !session.user) { redirect("/login") }

    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );

}