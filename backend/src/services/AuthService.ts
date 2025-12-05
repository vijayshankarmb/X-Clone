import {prisma} from "../lib/prisma";
import bcrypt from "bcryptjs";

export const createUser = async (email: string, password: string, userName: string, name: string, avatarUrl: string)=>{

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
            userName,
            name,
            avatarUrl: avatarUrl || avatarUrl || "https://api.dicebear.com/7.x/initials/svg?seed=" + userName
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