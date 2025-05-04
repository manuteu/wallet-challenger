import { create } from 'zustand';

export type ModalType = 'deposit' | 'transfer' | 'revert' | null;

interface ModalStore {
  open: ModalType;
  transactionId?: string;
  openModal: (type: ModalType, transactionId?: string) => void;
  closeModal: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  open: null,
  data: undefined,
  openModal: (type, transactionId) => set({ open: type, transactionId }),
  closeModal: () => set({ open: null, transactionId: undefined }),
}));
