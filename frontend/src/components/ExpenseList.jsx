"use client";
import { useState } from "react";

export default function ExpenseList({ expenses, deleteExpense, editExpense }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    amount: '',
    category: '',
    paymentMethod: '',
    date: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleConfirm = (id) => {
    if (!form.amount || !form.category || !form.paymentMethod || !form.date) return;
    editExpense(id, form);
    setEditing(null);
  };

  const startEditing = (index, expense) => {
    setEditing(index);
    setForm({
      amount: expense.amount,
      category: expense.category,
      paymentMethod: expense.paymentMethod,
      date: expense.date?.slice(0, 10),
    });
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto px-4 py-2">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">Your Expenses</h2>

      {expenses.length > 0 ? (
        expenses.map((expense, index) => (
          <div
            key={index}
            className="bg-white shadow-xl rounded-xl p-6 mb-5 transition hover:scale-[1.01] hover:shadow-2xl"
          >
            {editing !== index ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div><span className="text-gray-500 font-medium">Amount:</span> ₹{expense.amount}</div>
                  <div><span className="text-gray-500 font-medium ">Category:</span> <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-sm">{expense.category}</span></div>
                  <div><span className="text-gray-500 font-medium">Payment:</span> {expense.paymentMethod}</div>
                  <div><span className="text-gray-500 font-medium">Date:</span> {new Date(expense.date).toLocaleDateString()}</div>
                </div>
                <div className="mt-4 flex gap-4">
                  <button
                    onClick={() => startEditing(index, expense)}
                    className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteExpense(expense._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={form.amount}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    <option value="">Select Category</option>
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
                    value={form.paymentMethod}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    <option value="">Select Method</option>
                    <option>Cash</option>
                    <option>Credit Card</option>
                    <option>UPI</option>
                    <option>Bank Transfer</option>
                    <option>Other</option>
                  </select>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>

                <div className="mt-4 flex gap-4">
                  <button
                    onClick={() => handleConfirm(expense._id)}
                    disabled={!form.amount || !form.category || !form.paymentMethod || !form.date}
                    className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600 transition disabled:opacity-50"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setEditing(null)}
                    className="bg-gray-400 text-white px-4 py-1 rounded-lg hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center mt-6">No expenses found.</p>
      )}
    </div>
  );
}
