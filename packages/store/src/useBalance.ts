"use client";
import { useState, useEffect } from "react";

export const useBalance = () => {
  const [balance, setBalance] = useState(1000);
  
  // Example effect that could load balance from API
  useEffect(() => {
    // In a real app, fetch from API
    // For demo, just use static value
  }, []);
  
  return balance;
}; 