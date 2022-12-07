import { TransactionsContext } from "./../contexts/TransactionsContext";
import { useContext } from "react";

export function useSummary() {
  const { transactions } = useContext(TransactionsContext);

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "entrada") {
        acc.entradas += transaction.price;
        acc.total += transaction.price;
      } else {
        acc.saidas += transaction.price;
        acc.total -= transaction.price;
      }

      return acc;
    },
    {
      entradas: 0,
      saidas: 0,
      total: 0,
    }
  );

  return summary;
}
