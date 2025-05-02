'use client';

import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useSignUpMutation } from '../services/use-sign-up-mutation';

const signUpSchema = z.object({
  name: z.string().min(2, { message: 'Nome obrigatório' }),
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(6, { message: 'Mínimo 6 caracteres' }),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const { mutate: signUp, isPending } = useSignUpMutation(() => {
    alert('Cadastro realizado com sucesso!');
    router.push('/login');
  });

  return (
    <Card className="max-w-sm mx-auto mt-20">
      <CardHeader>
        <CardTitle>Crie sua conta</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit((data) => signUp(data))} className="space-y-4">
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

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Criando conta...' : 'Cadastrar'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
