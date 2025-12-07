import {prisma} from "../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

    const secretKey = process.env.JWT_SECRET_KEY;

    if(!secretKey){
        throw new Error("JWT secret key not found");
    }

    const token = jwt.sign(
        {authorId: user.id},
        secretKey,
        {expiresIn: "7d"}
    );

    return {
        id: user.id,
        email: user.email,
        userName: user.userName,
        name: user.name,
        avatarUrl: user.avatarUrl,
        token
    };
}

export const loginUser = async ({email, password}: {email: string, password: string})=>{
    
    const user = await prisma.user.findUnique({
        where: {email}
    })

    if (!user){
        throw new Error("User not found");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch){
        throw new Error("Invalid password");
    }

    const secretKey = process.env.JWT_SECRET_KEY;

    if(!secretKey){
        throw new Error("JWT secret key not found");
    }

    const token = jwt.sign(
        {authorId: user.id},
         secretKey,
         {expiresIn: "7d"})
    
    return {
        id: user.id,
        email: user.email,
        userName: user.userName,
        name: user.name,
        avatarUrl: user.avatarUrl,
        token
    };
}