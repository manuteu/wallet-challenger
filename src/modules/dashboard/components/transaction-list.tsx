'use client'

import { useTransactionsQuery } from '../hooks/use-transactions-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { useUserStore } from '@/shared/store/user-store';
import { formatCurrency, translateTransactionsStatus } from '@/shared/utils/formatters';
import { TransactionResponse } from '../types/dashboard-types';
import { useModal } from '@/shared/store/modal-store';
import { Spinner } from '@/shared/ui/spinner';

export function TransactionList() {
  const { data, isLoading } = useTransactionsQuery();
  const { user } = useUserStore()
  const { openModal } = useModal()

  const isReceiver = (transaction: TransactionResponse) => {
    if (transaction.receiverId === user?.id && transaction.status === 'COMPLETED') {
      return 'text-green-400'
    } else if (transaction.status === 'REVERSED') {
      return 'text-gray-400'
    } else {
      return 'text-red-400'
    }
  }

  return (
    <>
      <Card className="flex flex-col flex-1 overflow-y-auto">
        <CardHeader className='border-b'>
          <CardTitle className='text-xl'>Transações</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className='flex justify-center'>
              <Spinner size="md" />
            </div>
          ) : (
            <ul className="space-y-2">
              {data?.map((transaction) => (
                <li key={transaction.id} className="border px-4 py-2 rounded-md flex justify-between items-center">
                  <div>
                    <p className="font-medium">{transaction.type === 'DEPOSIT' ? 'Depósito' : 'Transferência'}</p>
                    <p className="text-sm text-muted-foreground">{new Date(transaction.createdAt).toLocaleString()}</p>
                    {transaction.receiver.name && <p className="text-xs">Para: {transaction.receiver.name}</p>}
                    <p className="text-xs font-bold tracking-widest">{translateTransactionsStatus(transaction.status)}</p>
                  </div>
                  <span className={`font-bold ${isReceiver(transaction)}`}>
                    {formatCurrency(transaction.amount)}
                  </span>
                  <Button
                    variant='outline'
                    className=""
                    onClick={() => {
                      openModal('revert', transaction.id)
                    }}
                  >
                    Reverter
                  </Button>
                </li>
              ))}
            </ul>
          )}

          {!isLoading && data?.length === 0 && (
            <span className='text-lg flex justify-center'>Não encontramos transações.</span>
          )}
        </CardContent>
      </Card>
    </>
  );
}
