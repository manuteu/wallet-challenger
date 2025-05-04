'use client';

import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { storageKeys } from '@/shared/config/storage-keys';
import useAuthStore from '@/shared/store/auth-store';
import { useRouter } from 'next/navigation';
import { useLoginMutation } from '../hooks/use-login-mutation';
import { loginSchema, LoginSchemaType } from '../schemas';
import { useUserStore } from '@/shared/store/user-store';
import Brand from '@/shared/components/brand';
import { Spinner } from '@/shared/ui/spinner';

export function LoginForm() {
  const { changeAuthStatus } = useAuthStore();
  const { setUser } = useUserStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate: login, isPending } = useLoginMutation((data) => {
    sessionStorage.setItem(storageKeys.accessToken, data.token);
    changeAuthStatus(true);
    router.push('/dashboard');

    setUser(data.user);
  })

  return (
    <section className='flex flex-col justify-center items-center h-screen gap-10'>
      <Brand />
      <Card className="max-w-sm w-full">
        <CardHeader>
          <CardTitle>Entrar na carteira</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit((data) => login(data))} className="space-y-4">
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" {...register('email')} />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" {...register('password')} />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? <Spinner size="sm" className='border-secondary border-t-transparent' /> : 'Acessar'}
            </Button>

            <Button type='button' variant='ghost' className="w-full" onClick={() => router.push('/register')}>
              Cadastrar Conta
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
