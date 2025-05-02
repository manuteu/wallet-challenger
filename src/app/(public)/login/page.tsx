import { LoginForm } from '@/modules/auth/components/login-form';
import PublicRoute from '@/shared/components/public-route';

export default function LoginPage() {
  return (
    <PublicRoute>
      <LoginForm />
    </PublicRoute>
  )
}