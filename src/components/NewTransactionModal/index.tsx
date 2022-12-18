import * as Dialog from '@radix-ui/react-dialog';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles';
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import { useContext } from 'react';

const newTransactionFormSchena = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['entrada', "saida"]),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchena>

export function NewTransactionModal() {
  const { createTransaction } = useContext(TransactionsContext)

  const { control, register, handleSubmit, formState: { isSubmitting }, reset } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchena),
    defaultValues: {
      type: 'entrada'
    }
  })

  async function handleSubmitTransaction(data: NewTransactionFormInputs) {
    const { description, category, price, type } = data;
    await createTransaction({ description, category, price, type })
    reset();
  }
  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <form onSubmit={handleSubmit(handleSubmitTransaction)}>
          <input type="text" placeholder='Descrição' required {...register('description')} />
          <input type="number" placeholder='Preço' required {...register('price', { valueAsNumber: true })} />
          <input type="text" placeholder='Categoria' required {...register('category')} />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType onValueChange={field.onChange} value={field.value}>
                  <TransactionTypeButton variant='entrada' value='entrada'>
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>

                  <TransactionTypeButton variant='saida' value='saida'>
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />
          <button type="submit" disabled={isSubmitting}>Cadastrar</button>
        </form>

      </Content>
    </Dialog.Portal>
  )
}