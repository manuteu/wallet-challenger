'use client';

import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useRegisterMutation } from '../hooks/use-register-mutation';
import { registerSchema, RegisterSchemaType } from '../schemas';
import { toastObserver } from '@/core/observers/toast-observer';
import Brand from '@/shared/components/brand';
import { Spinner } from '@/shared/ui/spinner';

export function RegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const { mutate: registerMutate, isPending } = useRegisterMutation((data) => {
    toastObserver.emit({
      title: data.message,
      description: "Você pode realizar o login com suas credenciais.",
      type: "success",
    })
    router.push('/login');
  });

  return (
    <section className='flex flex-col justify-center items-center h-screen gap-10'>
      <Brand />
      <Card className="max-w-sm w-full">
        <CardHeader>
          <CardTitle>Crie sua conta</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit((data) => registerMutate(data))} className="space-y-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input id="name" type="text" {...register('name')} />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

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

            <Button type="submit" className="w-full mt-5" disabled={isPending}>
              {isPending ? <Spinner size="sm" className='border-secondary border-t-transparent' /> : 'Cadastrar'}
            </Button>

            <Button type='button' variant='ghost' className="w-full" onClick={() => router.back()}>
              Voltar
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
