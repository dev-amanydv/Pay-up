import { PrismaClient } from "@repo/db/src";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                phone: { label: "Phone Number", type: "text", placeholder: "Enter your phone number" },
                password: { label: "Password", type: "password", placeholder: "Enter your password"}
            },
            async authorize(credentials : any) {
                if (!credentials.phone || !credentials.password) {
                    throw new Error("Phone number and password are required.");
                }
                const existingUser = await prisma.user.findUnique({
                    where: {
                        number: credentials.phone
                    }
                })
                if (existingUser) {
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                    if (passwordValidation) {
                        return {
                            id: String(existingUser.id),
                            name: existingUser.name,
                            email: existingUser.email ?? null,
                            number: existingUser.number ?? null,
                        }
                    }
                    return null;
                }
                try {
                    const hashedPassword = await bcrypt.hash(credentials.password, 10);
                    const user = await prisma.user.create({
                        data: {
                            number: credentials.phone,
                            password: hashedPassword
                        }
                    })
                    return {
                        id: String(user.id),
                        name: user.name,
                        email: user.email ?? null,
                        number: user.number ?? null,
                    }
                } catch (error) {
                    console.log("Error creating user: ", error);
                    throw new Error("Failed to create user. Please try again later.");
                }
                return null;
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET || "secret",
    callbacks: {
        async session({ session, token} : any) {
            session.user.id = token.sub;
            return session;
        }
    }
}
