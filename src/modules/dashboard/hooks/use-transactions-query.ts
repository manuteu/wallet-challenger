import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { handleApiError } from '@/core/handlers/handle-api-error';
import { getTransactions } from '../services/transactions-service';

export function useTransactionsQuery() {
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions,
    staleTime: 1000 * 60 * 1,
  });

  useEffect(() => {
    if (isError) {
      handleApiError(error);
    }
  }, [isError]);

  return { data, isLoading };
}
