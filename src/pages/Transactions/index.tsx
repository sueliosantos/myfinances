import { useContext, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { BuscaForm } from "./components/Buscar";
import { Price, TransactionContainer, TransactionTable } from "./styles";


export function Transactions() {

  const { transactions } = useContext(TransactionsContext)
  return (
    <div>
      <Header />
      <Summary />

      <TransactionContainer>
        <BuscaForm />
        <TransactionTable>

          <tbody>
            {transactions.map(transaction => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <Price variant={transaction.type}>
                      {transaction.type === 'saida' && '- '}
                      {priceFormatter.format(transaction.price)}
                    </Price>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
                </tr>
              )
            })}


          </tbody>
        </TransactionTable>
      </TransactionContainer >
    </div >
  )
}