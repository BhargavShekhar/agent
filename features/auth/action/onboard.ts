"use server";

import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function onBoard() {
    try {
        const clerkUser = await currentUser();

        if (!clerkUser) {
            throw new Error("Unauthorized");
        }

        const { firstName, lastName, imageUrl } = clerkUser;
        const email = clerkUser.emailAddresses[0]?.emailAddress ?? null;

        return prisma.user.upsert({
            where: { clerkId: clerkUser.id },
            create: {
                clerkId: clerkUser.id,
                email,
                firstName,
                lastName,
                imageUrl
            },
            update: {
                email,
                firstName,
                lastName,
                imageUrl
            }
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}