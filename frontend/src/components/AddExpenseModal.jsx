'use client';
import { useState } from 'react';
import axios from 'axios';

export default function AddExpenseModal({ onClose, onExpenseAdded }) {
  const [form, setForm] = useState({
    amount: '',
    category: '',
    paymentMethod: '',
    date: '',
  });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(form)
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/expense`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Expense added!');
      onClose(); // Close modal after successful submission
      onExpenseAdded()
    } catch (err) {
      alert('Error adding expense');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Add New Expense</h2>
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        required
        onChange={handleChange}
        className="w-full p-2 mb-3 border-none shadow-md focus:outline-none rounded "
      />
      <select
      name='category'
      required
  className="w-full p-2 mb-3 border-none shadow-md focus:outline-none rounded"
  onChange={handleChange}
>
  <option value="">All Categories</option>
  <option>Food</option>
  <option>Travel</option>
  <option>Shopping</option>
  <option>Health</option>
  <option>Entertainment</option>
  <option>Utilities</option>
  <option>Rent</option>
  <option>Other</option>
</select>

      <select
        name="paymentMethod"
        required
        onChange={handleChange}
        className="w-full p-2 mb-3 border-none shadow-md focus:outline-none rounded "
      >
        <option value="">Select Payment Method</option>
        <option>Cash</option>
        <option>Credit Card</option>
        <option>UPI</option>
        <option>Bank Transfer</option>
        <option>Other</option>
      </select>
      <input
        type="date"
        name="date"
        required
        onChange={handleChange}
        className="w-full p-2 mb-3 border-none shadow-md focus:outline-none rounded "
      />
      <button
        type="submit" 
        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 hover:cursor-pointer"
      >
        Add Expense
      </button>
    </form>
  );
}
