'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/shared/lib/react-query';
import { ReactNode } from 'react';
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

type Props = {
  children: ReactNode;
};

export function AppProviders({ children }: Props) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

 
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}