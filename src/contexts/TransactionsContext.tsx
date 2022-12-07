import { createContext, useEffect, useState } from "react";

interface Transaction {
  id: number;
  description: string;
  type: "entrada" | "saida";
  price: number;
  category: string
  createdAt: string;

}

interface TransactionContextType {
  transactions: Transaction[];
}

interface TransactionProviderProps {
  children: React.ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionProviderProps) {

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function loadTransactions() {
    const response = await fetch("http://localhost:3000/transactions");
    const json = await response.json();

    setTransactions(json);
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}