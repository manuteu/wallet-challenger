import { RegisterForm } from '@/modules/auth/components/register-form';
import PublicRoute from '@/shared/components/public-route';

export default function RegisterPage() {
  return (
    <PublicRoute>
      <RegisterForm />
    </PublicRoute>
  );
}