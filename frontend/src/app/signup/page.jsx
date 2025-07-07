'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Swal from 'sweetalert2';
import Link from 'next/link';

export default function SignupPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const data = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/signup`, form);
      Swal.fire({
        icon: 'success',
        title: 'Account created!',
        text: 'Redirecting to login...',
        });

      router.push('/login');
    } catch (err) {
      setError(err.response.data?.error || 'Signup failed');
      console.error('Signup error:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className='bg-white p-6 flex flex-col items-center rounded-xl shadow-md w-full max-w-sm'>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <input name="username" placeholder="Username" onChange={handleChange} required className="font-semibold w-full p-2 mb-3 border shadow border-none rounded focus:outline-none" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="font-semibold w-full p-2 mb-3 border shadow border-none rounded focus:outline-none" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="font-semibold w-full p-2 mb-4 border shadow border-none rounded focus:outline-none" />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 hover:cursor-pointer">
          Sign Up
        </button>
      </form>
      <div><span className=''>Already an user?</span><Link href={'/login'} className='ml-2 font-semibold text-blue-600 hover:text-blue-700'>Login</Link></div>
      </div>
    </div>
  );
}
