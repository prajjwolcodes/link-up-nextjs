import { NextRequest } from "next/server";
import bcrypt from "bcrypt"
import { db } from "@/lib/prisma";
import { signUpSchema } from "@/schema/authSchema";

export async function POST(req: NextRequest,) {
    function generateRandom3DigitNumber(): string {
        return Math.floor(1000 + Math.random() * 9000).toString();
    }
    try {
        const body = await req.json();
        const parsedBody = signUpSchema.safeParse(body);

        if (!parsedBody.success) {
            return Response.json(
                { user: null, message: parsedBody.error.format() },
                { status: 400 }
            );
        }

        const { email, password, username } = parsedBody.data;
        const existingUserByUsername = await db.user.findUnique({ where: { username } });
        if (existingUserByUsername) {
            return Response.json({ user: null, message: "User already exists with that username" }, { status: 400 });
        }

        const existingUserByEmail = await db.user.findUnique({ where: { email } });
        if (existingUserByEmail) {
            return Response.json({ user: null, message: "User already exists with that email" }, { status: 400 });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const randomNumber = generateRandom3DigitNumber();
        const displayName = `guest${randomNumber}`;
        const user = await db.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                displayName
            }
        })
        return Response.json({ user, message: "User created successfully" }, { status: 201 });
    } catch (error) {
        console.log(error);
        return Response.json({ user: null, message: "Error while signing up" }, { status: 500 });
    }

}

export async function GET() {
    const users = await db.user.findMany();
    console.log(users)

    return Response.json(users);
}