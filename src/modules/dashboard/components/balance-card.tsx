'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { useBalanceQuery } from '../hooks/use-balance-query';
import { formatCurrency } from '@/shared/utils/formatters';
import { Button } from '@/shared/ui/button';
import { useModal } from '@/shared/store/modal-store';
import { BanknoteArrowDown, BanknoteArrowUp } from 'lucide-react';
import { Spinner } from '@/shared/ui/spinner';

export function BalanceCard() {
  const { data: balance, isLoading } = useBalanceQuery();
  const { openModal } = useModal()

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className='text-xl'>Saldo Atual</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between items-end">
        <span className='text-2xl font-bold text-green-400'>
          {isLoading ? <Spinner size="md"/> : formatCurrency(balance as number)}
        </span>
        <div className="flex gap-2">
          <Button onClick={() => openModal('deposit')}>
            <BanknoteArrowDown />
          </Button>
          <Button variant="outline" onClick={() => openModal('transfer')}>
            <BanknoteArrowUp />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
