"use client";
import { useState, useEffect } from "react";

export const useBalance = () => {
  const [balance, setBalance] = useState(1000);
  // Example effect that could load balance from API
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setBalance(2500);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return balance;
}