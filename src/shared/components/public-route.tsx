'use client';

import { useAuthStore } from '@/shared/store/auth-store';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function PublicRoute({ children }: Props) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated]);

  return <>{!isAuthenticated ? children : null}</>;
}