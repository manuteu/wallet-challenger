'use client'

import { twMerge } from 'tailwind-merge'

type SpinnerProps = {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-3',
  lg: 'h-10 w-10 border-4',
}

export const Spinner = ({ className, size = 'md' }: SpinnerProps) => {
  return (
    <div
      className={twMerge(
        'animate-spin rounded-full border-4 border-primary border-t-transparent dark:border-t-transparent',
        sizeMap[size],
        className
      )}
      role="status"
    />
  )
}
