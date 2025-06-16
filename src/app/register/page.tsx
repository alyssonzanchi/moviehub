'use client';
import { AuthForm } from '@/components/AuthForm';
import { AuthSidePanel } from '@/components/AuthSidePanel';

export default function Register() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden">
        <AuthSidePanel />
        <AuthForm type="register" />
      </div>
    </div>
  );
}
