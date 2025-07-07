import pandas as pd
from datetime import datetime, timedelta

def generate_suggestions(expense_data):
    df = pd.DataFrame(expense_data)

    if df.empty:
        return ["No expenses found in the last 30 days."]

    df['date'] = pd.to_datetime(df['date'])

    # ❗ Remove timezone info to make the comparison safe
    if df['date'].dt.tz is not None:
        df['date'] = df['date'].dt.tz_localize(None)

    # ✅ Safe comparison now
    thirty_days_ago = datetime.now()
    df = df[df['date'] >= thirty_days_ago - timedelta(days=30)]

    suggestions = []

    # Total spent per category
    category_spending = df.groupby('category')['amount'].sum().sort_values(ascending=False)

    if not category_spending.empty:
        top_category = category_spending.index[0]
        top_amount = category_spending.iloc[0]
        suggestions.append(f"You are spending the most on **{top_category}** (₹{top_amount:.2f}). Consider reducing it by 15%.")

    # Detect sharp increase in any category
    df['week'] = df['date'].dt.isocalendar().week
    week_groups = df.groupby(['category', 'week'])['amount'].sum().unstack(fill_value=0)

    for category in week_groups.index:
        if week_groups.loc[category].shape[0] >= 2:
            last_week = week_groups.loc[category].iloc[-1]
            prev_week = week_groups.loc[category].iloc[-2]
            if prev_week > 0 and (last_week - prev_week) / prev_week > 0.5:
                suggestions.append(f"Your spending on {category} increased by more than 50% last week.")

    if not suggestions:
        suggestions.append("You're managing your expenses well. Keep it up!")

    return suggestions
