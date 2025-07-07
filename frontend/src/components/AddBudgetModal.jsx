"use client"

import axios from "axios";
import { useState } from "react";

export default function AddBudgetModal({onClose, fetchAll}) {
    const [form, setForm] = useState({ category: '', amount: '' , user: '', month: '' });

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/budget`, form, {
                headers: {  Authorization: `Bearer ${token}` }
            }); 
            onClose()
            fetchAll()
        } catch (error) {
            console.error('Error adding budget:', error);
            alert('Failed to add budget');
            return;
        }
    }

    return (
                    <div className="bg-white w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Add New Budget</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="number"
                                name="amount"
                                placeholder="Amount"
                                required
                                value={form.amount}
                                onChange={handleChange}
                                className="w-full p-2 mb-3 border-none shadow-md focus:outline-none rounded"
                            />
                            <input type="month" placeholder="Month" name="month" value={form.month} onChange={handleChange} required  className="w-full p-2 mb-3 border-none shadow-md focus:outline-none rounded" id="" />
                            <button
                                type="submit"
                                className="bg-green-500 hover:cursor-pointer text-white px-4 py-2 rounded shadow hover:bg-green-600 transition w-full"
                            >
                                Add Budget
                            </button>
                        </form>
                    </div>
    );
}