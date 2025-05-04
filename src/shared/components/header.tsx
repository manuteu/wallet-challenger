'use client'

import { Button } from '@/shared/ui/button'
import { LogOut } from 'lucide-react'
import { useUserStore } from '@/shared/store/user-store'
import { logout } from '@/modules/auth/services/logout-service'
import { ModeToggle } from './toggle-theme'
import Brand from './brand'

export const Header = () => {
  const { user } = useUserStore()

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-zinc-900 shadow-sm border-b">
      <Brand />

      <div className="flex items-center gap-4">
        {user?.name && <span className="text-md font-semibold text-accent-foreground">Olá, {user?.name}</span>}
        <ModeToggle />
        <Button
          variant="ghost"
          onClick={logout}
          className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      </div>
    </header>
  )
}
