import authOptions from "@/lib/utils/authOptions";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";
export const GET = async (req: Request) => {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const user = await prisma.user.findUnique({
            where: {
                email: session.user?.email || ""
            }
        })
        const userId = user?.id || ""

        const stores = await prisma.store.findMany({
            where: {
                userId: userId
            }
        });
       
        return NextResponse.json({ user: user, stores: stores });
        
    } catch (error) {
        console.log('[STORES_POST]', error);
        return new NextResponse("Internal error", { status: 500 });
    }

}