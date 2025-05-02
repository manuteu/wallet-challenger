'use client';

import { useAuthStore } from '@/shared/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function PrivateRoute({ children }: Props) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated]);

  return <>{isAuthenticated ? children : null}</>;
}
