"use client";
import { useBalance } from "@repo/store/useBalance";

export default function ClientComponent() {
  const balance = useBalance();
  
  return (
    <div className="mt-6 p-4 bg-gray-100 rounded">
      <h2 className="text-xl font-semibold">Your Balance:</h2>
      <p className="text-2xl font-bold">${balance}</p>
    </div>
  );
} 