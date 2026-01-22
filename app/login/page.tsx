'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/shared/Logo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { loginUser, getUserProfile } from '@/lib/firebase/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await loginUser(email, password);
      const profile = await getUserProfile(userCredential.user.uid);
      
      // Redirect based on role
      if (profile?.role === 'admin') {
        router.push('/admin/courses');
      } else {
        router.push('/student/courses');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to login. Please check your credentials.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size="lg" showText={false} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
          <p className="text-slate-600 mt-2">Sign in to Beta Academy</p>
        </div>

        {error && (
          <Alert variant="error" className="mb-6" dismissible onDismiss={() => setError('')}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="email"
            label="Email Address"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <Input
            type="password"
            label="Password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-600">
            Don't have an account?{' '}
            <Link href="/register" className="text-primary-600 hover:text-primary-700 font-semibold">
              Register here
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-slate-500 hover:text-slate-700 text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}