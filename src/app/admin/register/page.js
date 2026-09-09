'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminRegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', registrationCode: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function updateForm(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function submit(event) {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/auth/register-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Registration failed');
        return;
      }
      router.push('/admin/dashboard');
    } catch (requestError) {
      console.error(requestError);
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-cyan-800 flex items-center justify-center px-4 py-10">
      <form onSubmit={submit} className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md space-y-4">
        <h1 className="text-3xl font-bold text-gray-900 text-center">Create Admin Account</h1>
        <p className="text-gray-600 text-sm text-center">This page is for admin recovery only.</p>
        {error && <p className="p-3 bg-red-50 text-red-700 rounded">{error}</p>}
        <input name="name" value={form.name} onChange={updateForm} required placeholder="Full name" className="w-full px-4 py-3 border rounded-xl" />
        <input type="email" name="email" value={form.email} onChange={updateForm} required placeholder="Admin email" className="w-full px-4 py-3 border rounded-xl" />
        <input type="password" name="password" value={form.password} onChange={updateForm} required minLength={6} placeholder="New password" className="w-full px-4 py-3 border rounded-xl" />
        <input type="password" name="registrationCode" value={form.registrationCode} onChange={updateForm} required placeholder="Registration code" className="w-full px-4 py-3 border rounded-xl" />
        <button disabled={loading} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl disabled:opacity-50">
          {loading ? 'Creating account...' : 'Create Admin Account'}
        </button>
        <Link href="/login" className="block text-center text-teal-700 text-sm">Back to login</Link>
      </form>
    </main>
  );
}
