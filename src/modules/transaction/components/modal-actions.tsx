'use client'

import { ModalType, useModal } from '@/shared/store/modal-store'
import { Dialog, DialogContent, DialogHeader } from '@/shared/ui/dialog'
import { DepositForm } from './deposit-form'
import { TransferForm } from './transfer-form'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Revert } from './revert'

type DialogTitleType = Exclude<ModalType, null>

export const ModalActions = () => {
  const { open, closeModal } = useModal()

  const dialogTitle = (value: DialogTitleType) => {
    const title: Record<DialogTitleType, string> = {
      deposit: 'Depositar',
      transfer: 'Transferir',
      revert: 'Reverter'
    }

    return title[value]
  }

  return (
    <Dialog open={!!open} onOpenChange={closeModal}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className='text-lg font-semibold'>{dialogTitle(open as DialogTitleType)}</DialogTitle>
        </DialogHeader>
        {open === 'deposit' && <DepositForm />}
        {open === 'transfer' && <TransferForm />}
        {open === 'revert' && <Revert />}
      </DialogContent>
    </Dialog>
  )
}