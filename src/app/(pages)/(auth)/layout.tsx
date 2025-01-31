import { validateRequest } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { user } = await validateRequest()
    console.log(user);

    if (user) redirect("/")
    return (
        <>
            {children}
        </>
    );
}