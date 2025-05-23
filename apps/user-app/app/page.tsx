import { Suspense } from "react";
import { prisma } from "@repo/db/src";
import ClientComponent from "./client-component";

export default async function Home() {
  // Fetch users from the database - server-side operation
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
      
      <Suspense fallback={<div>Loading balance...</div>}>
        <ClientComponent />
      </Suspense>
    </div>
  );
}
