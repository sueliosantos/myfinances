import { BuscaFormContainer } from "./styles";
import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from "react-hook-form";
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionsContext } from "../../../../contexts/TransactionsContext";
import { useContext } from "react";

const searchFormShema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormShema>;

export function BuscaForm() {
  const { loadTransactions } = useContext(TransactionsContext);

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormShema),
  })

  async function handleSearch(data: SearchFormInputs) {
    await loadTransactions(data.query);
  }

  return (

    <BuscaFormContainer onSubmit={handleSubmit(handleSearch)} >
      <input type="text" placeholder="Buscar uma transação" {...register('query')} />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass />
        Buscar

      </button>

    </BuscaFormContainer>
  )
}