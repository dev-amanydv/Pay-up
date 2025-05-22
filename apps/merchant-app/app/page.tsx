import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { prisma } from "@repo/db/src";

export default async function Home() {
  // Fetch users from the database
  const users = await prisma.user.findMany();

  return (
    <div>
      <h1 className="italic text-3xl font-bold">Hello world</h1>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Users:</h2>
        <ul className="list-disc pl-5 mt-2">
          {users.map((user) => (
            <li key={user.id}>{user.name || 'Unnamed'} ({user.email})</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
