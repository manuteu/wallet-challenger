import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { handleApiError } from '@/core/handlers/handle-api-error';
import { getBalance } from '../services/balance-service';

export function useBalanceQuery() {
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['balance'],
    queryFn: getBalance,
    staleTime: 1000 * 60 * 1,
  });

  useEffect(() => {
    if (isError) {
      handleApiError(error);
    }
  }, [isError]);

  return { data, isLoading };
}
