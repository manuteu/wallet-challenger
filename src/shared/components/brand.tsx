import { Wallet } from 'lucide-react'
import React from 'react'

export default function Brand() {
  return (
    <div className='flex gap-5'>
      <Wallet size={32} />
      <span className='text-2xl hidden sm:inline'>Wallet</span>
    </div>
  )
}
