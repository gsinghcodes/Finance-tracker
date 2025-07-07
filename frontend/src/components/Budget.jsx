import { useEffect } from "react"

export default function Budget({ monthlyBudget, summary, remaining, deleteBudget }) {

    return <div className="bg-white rounded-2xl gap-6">
        <div className="card p-6 flex flex-col items-start">
          <div className="text-gray-600 font-semibold">
          Budget Set:
          <span className="text-xl font-bold text-green-600 ml-2">
            ₹{monthlyBudget ? monthlyBudget.amount : "Not set"}
          </span>
        </div>
        <div className="text-gray-600 font-semibold">
          Total Spent:
          <span className="text-xl font-bold text-red-600 ml-2">
            ₹{summary.totalSpent}
          </span>
        </div>
        <div className="text-gray-600 font-semibold">
          Remaining:
          <span
            className={`text-xl font-bold ml-2 ${
              remaining < 0 ? "text-red-500" : "text-blue-600"
            }`}
          >
            ₹{remaining}
          </span>
        </div>  
          <button
            onClick={deleteBudget}
            className="mt-4 bg-red-500 hover:cursor-pointer text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Delete Budget
          </button>
        </div>
      </div>
}