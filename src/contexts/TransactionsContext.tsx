import { createContext, useEffect, useState } from "react";
import { api } from "../server/axios";

interface Transaction {
  id: number;
  description: string;
  type: "entrada" | "saida";
  price: number;
  category: string
  createdAt: string;

}

interface CreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: 'entrada' | 'saida';
}

interface TransactionContextType {
  transactions: Transaction[];
  loadTransactions: (query?: string) => void;
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

interface TransactionProviderProps {
  children: React.ReactNode;
}



export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionProviderProps) {

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function loadTransactions(query?: string) {

    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'createdAt',
        q: query,
      }
    })

    setTransactions(response.data);
  }

  async function createTransaction(data: CreateTransactionInput) {
    const { description, category, price, type } = data;
    const response = await api.post('/transactions', {
      description,
      category,
      price,
      type,
      createAt: new Date()
    })

    setTransactions(state => [response.data, ...state])

  }
  useEffect(() => {
    loadTransactions()
  }, [])

  return (
    <TransactionsContext.Provider value={{ transactions, loadTransactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}