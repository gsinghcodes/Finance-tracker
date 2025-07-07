"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import Modal from "@/components/Modal";
import AddExpenseModal from "@/components/AddExpenseModal";
import AddBudgetModal from "@/components/AddBudgetModal";
import ExpenseList from "@/components/ExpenseList";
import Budget from "@/components/Budget";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#6366f1", "#22d3ee", "#fbbf24", "#f472b6", "#34d399"];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [pieData, setPieData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [monthlyBudget, setMonthlyBudget] = useState(null);
  const [remaining, setRemaining] = useState(0);

  const fetchAll = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Unauthorized",
        text: "Please log in to access the dashboard",
      });
      router.push("/login");
      return;
    }

    try {
      const userRes = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(userRes.data.user);

      const expRes = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/expense`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setExpenses(expRes.data);

      const budgetRes = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/budget?month=${new Date().toISOString().slice(0, 7)}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const monthBudget = budgetRes.data[0];
      setMonthlyBudget(monthBudget);
      if (monthBudget) {
        setRemaining(monthBudget.amount - summary?.totalSpent || 0);
      }

      const suggRes = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/suggestion/smart`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuggestions(suggRes.data.suggestions || []);
    } catch (err) {
      Swal.fire({ icon: "error", title: "Failed to load dashboard" });
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, [router]);

  useEffect(() => {
    const month = new Date().toISOString().slice(0, 7);
    const thisMonth = expenses.filter((e) => e.date?.startsWith(month));
    const totalSpent = thisMonth.reduce((sum, e) => sum + Number(e.amount), 0);

    const catTotals = {};
    const methodTotals = {};
    thisMonth.forEach((e) => {
      catTotals[e.category] = (catTotals[e.category] || 0) + Number(e.amount);
      methodTotals[e.paymentMethod] = (methodTotals[e.paymentMethod] || 0) + 1;
    });

    const topCategory = Object.entries(catTotals).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";
    const topMethods = Object.entries(methodTotals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([k]) => k);

    setSummary({ totalSpent, topCategory, topMethods });

    setPieData(Object.entries(catTotals).map(([name, value]) => ({ name, value })));
    const byDay = {};
    thisMonth.forEach((e) => {
      const d = e.date?.slice(0, 10);
      byDay[d] = (byDay[d] || 0) + Number(e.amount);
    });
    setLineData(Object.entries(byDay).map(([date, amount]) => ({ date, amount })));
  }, [expenses]);

  useEffect(() => {
    if (monthlyBudget && summary) {
      setRemaining(monthlyBudget.amount - summary.totalSpent);
    }
  }, [monthlyBudget, summary]);

  const deleteBudget = async () => {
    const token = localStorage.getItem("token");
    if (!token || !monthlyBudget?._id) return;

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this budget?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/budget/${monthlyBudget._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire("Deleted!", "Budget has been removed.", "success");
      setMonthlyBudget(null);
      setRemaining(0);
    } catch (err) {
      Swal.fire("Error", "Failed to delete budget", "error");
    }
  };

  const deleteExpense = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/expense/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAll();
    } catch (err) {
      alert("Failed to delete expense");
    }
  };

  const editExpense = async (id, newData) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/expense/${id}`, newData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAll();
    } catch (err) {
      alert("Failed to update expense");
    }
  };

  const handleExpenseAdded = () => fetchAll();

  if (loading) return <div className="text-center text-5xl mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 px-4 py-6">
      <div className="text-center text-4xl font-bold text-indigo-700 mb-10">Finance Tracker</div>
      <div className="flex flex-col md:flex-row justify-center gap-6 mb-6">
        <button onClick={() => setShowExpenseModal(true)} className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-6 py-2 rounded-lg shadow hover:scale-105 transition">
          + Add Expense
        </button>
        <button onClick={() => setShowBudgetModal(true)} className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-6 py-2 rounded-lg shadow hover:scale-105 transition">
          + Add Budget
        </button>
        <button onClick={() => setShowListModal(true)} className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-6 py-2 rounded-lg shadow hover:scale-105 transition">
          View Expenses
        </button>
      </div>

      {summary && (
        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="bg-white rounded-2xl p-6 shadow-lg flex-1">
            <h2 className="text-xl font-semibold mb-4 text-indigo-600">Monthly Expenditure</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-red-50 p-4 rounded-lg shadow-inner">
                <p className="text-sm text-gray-500">Total Spent</p>
                <p className="text-2xl font-bold text-red-600">₹{summary.totalSpent}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg shadow-inner">
                <p className="text-sm text-gray-500">Top Category</p>
                <p className="text-lg font-bold">{summary.topCategory}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg shadow-inner">
                <p className="text-sm text-gray-500">Top Methods</p>
                <ul className="list-disc pl-4 text-sm">
                  {summary.topMethods.map((method, i) => (
                    <li key={i}>{method}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg flex-1">
            <h2 className="text-xl font-semibold mb-4 text-indigo-600">Monthly Budget</h2>
            {monthlyBudget ? (
              <Budget
                monthlyBudget={monthlyBudget}
                deleteBudget={deleteBudget}
                summary={summary}
                remaining={remaining}
              />
            ) : (
              <p className="text-gray-500">No budget set for this month.</p>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 max-w-6xl w-full mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="font-semibold text-lg text-indigo-600 mb-3">Category-wise Spending</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie dataKey="value" data={pieData} label>
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="font-semibold text-lg text-indigo-600 mb-3">Spending Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg mt-10 max-w-4xl w-full mx-auto">
        <h2 className="text-xl font-semibold text-indigo-600 mb-4">Smart Suggestions</h2>
        <ul className="space-y-3 list-disc list-inside text-gray-700">
          {suggestions.map((s, i) => (
            <li key={i} className="pl-2">{s}</li>
          ))}
        </ul>
      </div>

      <Modal isOpen={showExpenseModal} onClose={() => setShowExpenseModal(false)}>
        <AddExpenseModal onClose={() => setShowExpenseModal(false)} onExpenseAdded={handleExpenseAdded} />
      </Modal>

      <Modal isOpen={showBudgetModal} onClose={() => setShowBudgetModal(false)}>
        <AddBudgetModal fetchAll={fetchAll} onClose={() => setShowBudgetModal(false)} />
      </Modal>

      <Modal isOpen={showListModal} onClose={() => setShowListModal(false)}>
        <Suspense>
          <ExpenseList expenses={expenses} editExpense={editExpense} deleteExpense={deleteExpense} />
        </Suspense>
      </Modal>
    </div>
  );
}
