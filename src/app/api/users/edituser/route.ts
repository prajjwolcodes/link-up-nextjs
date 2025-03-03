import { editUserSchema } from "@/schema/editUserSchema";
import { NextRequest } from "next/server";
import { validateRequest } from "../../auth/[...nextauth]/options";
import { db } from "@/lib/prisma";
import { getUserDataSelect } from "@/lib/types";

export async function POST(req: NextRequest) {
    const body = await req.json();
    console.log(body);
    const validatedValues = editUserSchema.parse(body);

    const { user } = await validateRequest() as { user: { id: string } };

    if (!user) return Response.json({ message: "UnAuthorized" }, { status: 401 });

    const updatedUser = await db.user.update({
        where: { id: user.id },
        data: validatedValues,
        select: getUserDataSelect(user.id)
    })

    return Response.json({ message: "User Updated", updatedUser });
}