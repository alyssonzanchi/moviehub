'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface AuthFormProps {
  type: 'login' | 'register';
}

export function AuthForm({ type }: AuthFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (type === 'register') {
      if (!name || !email || !password || !confirmPassword) {
        setError('Preencha todos os campos');
        return;
      }

      if (password !== confirmPassword) {
        setError('As senhas não coincidem!');
        return;
      }

      const res = await fetch('api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      if (res.ok) {
        router.push('/login');
      } else {
        const data = await res.json();
        setError(data.message || 'Erro ao registrar!');
      }
    }

    if (type === 'login') {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password
      });

      if (res?.ok) {
        router.push('/');
      } else {
        setError('Credenciais inválidas. Verifique seu email e senha.');
      }
    }
  };

  return (
    <Card className="w-full md:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
      <CardContent>
        <CardTitle className="text-2xl font-semibold text-center text-gray-800 mb-6">
          {type === 'login' ? 'Acesse sua conta' : 'Crie sua conta'}
        </CardTitle>

        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'register' && (
            <Input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {type === 'register' && (
            <div className="relative">
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirmar Senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          )}

          <Button type="submit" className="w-full cursor-pointer">
            {type === 'login' ? 'Entrar' : 'Registrar'}
          </Button>
        </form>

        <div className="flex justify-center items-center text-sm mt-4">
          {type === 'login' ? (
            <>
              Não tem uma conta?{' '}
              <button
                type="button"
                onClick={() => router.push('/register')}
                className="cursor-pointer"
              >
                <span className="px-1 underline">Registre-se</span>
              </button>
            </>
          ) : (
            <>
              Já tem uma conta?
              <button
                type="button"
                onClick={() => router.push('/login')}
                className="cursor-pointer"
              >
                <span className="px-1 underline">Entrar</span>
              </button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
