import PrivateRoute from '@/shared/components/private-route';
import { BalanceCard } from '@/modules/dashboard/components/balance-card';
import { TransactionList } from '@/modules/dashboard/components/transaction-list';
import { ModalActions } from '@/modules/transaction/components/modal-actions';
import { Header } from '@/shared/components/header';

export default function DashboardPage() {
  return (
    <PrivateRoute>
      <main className="flex flex-col w-full h-screen">
        <Header />
        <div className='flex flex-col p-4 gap-4 overflow-hidden max-w-3xl w-full mx-auto'>
          <BalanceCard />
          <TransactionList />
        </div>
      </main>
      <ModalActions />
    </PrivateRoute>
  );
}
