import { SignUpForm } from '@/modules/auth/components/sign-up-form';
import PublicRoute from '@/shared/components/public-route';

export default function RegisterPage() {
  return (
    <PublicRoute>
      <SignUpForm />
    </PublicRoute>
  );
}