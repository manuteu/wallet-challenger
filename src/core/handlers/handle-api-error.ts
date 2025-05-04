import { toastObserver } from '@/core/observers/toast-observer';

type ApiErrorResponse = {
  error: string;
  issues?: Record<string, string>;
};

export function handleApiError(error: unknown): ApiErrorResponse {
  if (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof (error as any).response?.data?.error === 'string'
  ) {
    const data = (error as any).response.data as ApiErrorResponse;

    toastObserver.emit({
      type: 'error',
      title: 'Erro na requisição',
      description: data.error,
    });

    return data;
  }

  if (error instanceof Error) {
    toastObserver.emit({
      type: 'error',
      title: 'Erro inesperado',
      description: error.message,
    });

    return { error: error.message };
  }

  toastObserver.emit({
    type: 'error',
    title: 'Erro desconhecido',
    description: 'Algo deu errado.',
  });

  return { error: 'Erro desconhecido' };
}
