import {prisma} from "../lib/prisma";
import bcrypt from "bcryptjs";

export const createUser = async ({ username, email, password, name, avatarUrl }: { username: string, email: string, password: string, name?: string, avatarUrl?: string })=>{

    const existingUser = await prisma.user.findUnique({
        where: {email}
    })

    if (existingUser){
        throw new Error("User already exists");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashPassword,
            userName: username,
            name,
            avatarUrl: avatarUrl || "https://api.dicebear.com/7.x/initials/svg?seed=" + username
        },
        select: {
            id: true,
            email: true,
            userName: true,
            name: true,
            avatarUrl: true
        }
    });

    return user;
}