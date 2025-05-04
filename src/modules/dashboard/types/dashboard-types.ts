export type StatusType = 'COMPLETED' | 'REVERSED';
export type TransactionType = 'DEPOSIT' | 'TRANSFER';

export interface TransactionResponse {
  amount: number;
  createdAt: string;
  id: string;
  receiver: {
    name: string;
  };
  receiverId: string;
  sender: {
    name: string;
  };
  senderId: string;
  status: StatusType;
  type: TransactionType;
}

export interface BalanceResponse {
  balance: number
}