import { pool } from "../db/mysqlClient";


export const insertMonthlyReport = async ({
  userId,
  month,
  totalSpent,
  topCategory,
  overbudgetCategories
}) => {
  try {
    const query = `
      INSERT INTO reports (user_id, month, total_spent, top_category, overbudget_categories)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
      userId,
      month,
      totalSpent,
      topCategory,
      JSON.stringify(overbudgetCategories)
    ];

    await pool.execute(query, values);
    return { success: true };
  } catch (err) {
    console.error('MySQL Insert Error:', err);
    return { success: false, error: err.message };
  }
};

export const getLastThreeReports = async (userId) => {
  const query = `
    SELECT * FROM reports
    WHERE user_id = ?
    ORDER BY month DESC
    LIMIT 3
  `;
  const [rows] = await pool.execute(query, [userId]);
  return rows;
};
