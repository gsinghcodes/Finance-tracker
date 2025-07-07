"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const fetchReports = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/report/monthly`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReports(res.data);
      } catch {
        setReports([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-yellow-50 via-blue-50 to-indigo-100 px-4 py-8">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-yellow-100 p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-extrabold mb-6 text-yellow-700 flex items-center gap-2">
          <span>📊</span> Reports
        </h2>
        <p className="text-gray-600 mb-6">Your last 3 months' spending summary:</p>
        {loading ? (
          <div className="text-center text-gray-400 py-8">Loading...</div>
        ) : reports.length === 0 ? (
          <div className="text-center text-gray-400 py-8">No reports found.</div>
        ) : (
          <table className="w-full text-sm border rounded">
            <thead>
              <tr className="bg-yellow-50">
                <th className="p-2">Month</th>
                <th className="p-2">Total Spent</th>
                <th className="p-2">Top Category</th>
                <th className="p-2">Overbudget Categories</th>
              </tr>
            </thead>
            <tbody>
              {reports.map(r => (
                <tr key={r.id || r._id || r.month} className="border-b hover:bg-yellow-50">
                  <td className="p-2">{r.month}</td>
                  <td className="p-2 text-blue-700 font-bold">₹{r.total_spent || r.totalSpent}</td>
                  <td className="p-2">{r.top_category || r.topCategory}</td>
                  <td className="p-2">{Array.isArray(r.overbudget_categories || r.overbudgetCategories) ? (r.overbudget_categories || r.overbudgetCategories).join(', ') : (r.overbudget_categories || r.overbudgetCategories)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
