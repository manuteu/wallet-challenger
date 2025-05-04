'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import { toastObserver } from '@/core/observers/toast-observer';

type ToastType = 'success' | 'error' | 'info' | 'warning';

export function ToastListener() {
  useEffect(() => {
    const handler = (payload: { type?: string; title: string; description?: string }) => {
      toast[payload.type as ToastType ?? 'info'](payload.title, {
        description: payload.description,
      });
    };

    toastObserver.subscribe(handler);
    return () => toastObserver.unsubscribe(handler);
  }, []);

  return null;
}
