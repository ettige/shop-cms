import { NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";
import authOptions from "@/lib/utils/authOptions";
import { getServerSession } from "next-auth";
export const GET = async (req: Request) => {
    try {
        const session = await getServerSession(authOptions);
        console.log(session?.user)
        const userId = "1"

        const body = await req.json();

        const { name } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        const store = await prisma.store.create({
            data: {
                name,
                userId,
            }
        });

        return NextResponse.json(store);
    } catch (error) {
        console.log('[STORES_POST]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}