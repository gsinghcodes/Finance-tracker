'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Swal from 'sweetalert2';
import Link from 'next/link';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login`, form);
      const { token } = res.data;
      console.log(res)

      // Save token locally
      localStorage.setItem('token', token);

      Swal.fire({
        icon: 'success',
        title: 'Login successful!',
        text: 'Redirecting to dashboard...',
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        router.push('/')
      }, 2000);
    } catch (err) {
      const msg = err.response?.data?.error || 'Login failed';
        setError(msg);;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className='bg-white flex flex-col items-center p-6 rounded-xl shadow w-full max-w-sm'>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Log In</h2>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="font-semibold w-full p-2 mb-3 border shadow border-none rounded focus:outline-none"
          />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="font-semibold w-full p-2 mb-3 border shadow border-none rounded focus:outline-none"
        />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 hover:cursor-pointer">
          Log In
        </button>
      </form>
      <div><span className=''>Register Now</span><Link href={'/signup'} className='ml-2 font-semibold text-blue-600 hover:text-blue-700'>Signup</Link></div>
          </div>
    </div>
  );
}
