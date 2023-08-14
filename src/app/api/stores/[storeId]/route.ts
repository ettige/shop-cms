import { NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";
import authOptions from "@/lib/utils/authOptions";
import { getServerSession } from "next-auth";
export const GET = async (req: Request, context: { params: { storeId: string } }) => {
    try {
        const session = await getServerSession(authOptions);

        const storeId = context.params.storeId
        console.log(storeId)
        if (!session) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        if (!storeId) {
            return new NextResponse("Name is required", { status: 400 });
        }

        const store = await prisma.store.findUnique(
            {
                where: {
                    id: storeId,
                }
            }
        );
        if (!store) {
            return NextResponse.json("Store Do Not exist", { status: 404 })
        }
        const user = await prisma.user.findUnique({
            where: {
                email: session.user?.email || ""
            }
        })

        if (user?.id != store.userId) {
            return NextResponse.json("Permission Denied", { status: 403 })
        }

        return NextResponse.json(store);
    } catch (error) {
        console.log('[STORES_[storeId]_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}