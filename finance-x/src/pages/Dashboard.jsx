import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { useCharData } from '../hooks/useCharData';

export default function Dashboard() {
  const { transactions, dispatch } = useContext(FinanceContext);
  const { monthlyLineChartData } = useCharData();

  function incomeCalculator() {
    let totalIncome = 0;
    transactions.forEach((transaction) => {
      if (transaction.type === 'income') {
        totalIncome += Number(transaction.amount || 0);
      }
    });
    return totalIncome;
  }

  function expenseCalculator() {
    let totalExpenses = 0;
    transactions.forEach((transaction) => {
      if (transaction.type === 'expense') {
        totalExpenses += Number(transaction.amount || 0);
      }
    });
    return totalExpenses;
  }

  function balanceCalculator() {
    const totalIncome = incomeCalculator();
    const totalExpenses = expenseCalculator();
    return totalIncome - totalExpenses;
  }

  function clearAllData() {
    dispatch({ type: 'CLEAR_ALL' });
  }

  const transactionLimiter = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const categoryColors = {
    Food: '#534AB7',
    Rent: '#D85A30',
    Transport: '#1D9E75',
    Other: '#BA7517',
    Entertainment: '#F59E0B',
    Salary: '#10b981',
    default: '#6B7280',
  };

  function getCategoryColor(category) {
    return categoryColors[category] || categoryColors.default;
  }

  function formatAxisTick(value) {
    return `*${value}*`;
  }

  const maxChartValue = Math.max(
    ...monthlyLineChartData.map((item) => Math.max(item.income, item.expense)),
    0
  );

  const yAxisMax = maxChartValue + 200;

  const renderIncomeLabel = ({ x, y, width, value }) => {
    if (value == null) return null;
    return (
      <text x={x + width / 2} y={y} fill="#10b981" textAnchor="middle" dy={-10}>
        {`$${value.toFixed(0)}`}
      </text>
    );
  };

  const renderExpenseLabel = ({ x, y, width, value }) => {
    if (value == null) return null;
    return (
      <text x={x + width / 2} y={y} fill="#D85A30" textAnchor="middle" dy={-10}>
        {`$${value.toFixed(0)}`}
      </text>
    );
  };

  return (
    <div className="page-shell flex min-h-screen flex-col gap-5 p-4 sm:p-6 lg:p-8">
      <h3 className="page-title text-xl sm:text-2xl lg:text-3xl xl:text-4xl">Overview</h3>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <div className="metric-card">
          <h3 className="metric-label text-income text-[11px] sm:text-[12px] lg:text-[13px] xl:text-[14px]">$ Total Income</h3>
          <p className="metric-value text-income text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">$ {incomeCalculator()}</p>
        </div>

        <div className="metric-card">
          <h3 className="metric-label text-expense text-[11px] sm:text-[12px] lg:text-[13px] xl:text-[14px]">Total Expenses</h3>
          <p className="metric-value text-expense text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">$ {expenseCalculator()}</p>
        </div>

        <div className="metric-card sm:col-span-2 xl:col-span-1">
          <h3 className="metric-label text-[11px] sm:text-[12px] lg:text-[13px] xl:text-[14px]">Balance</h3>
          <p className="metric-value text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">${balanceCalculator()}</p>
        </div>
      </div>

      <div className="section-card flex flex-col gap-5 p-4 sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="section-title mb-0 text-[11px] sm:text-[12px] lg:text-[13px] xl:text-[14px]">Monthly Income vs Expenses</h3>
          {/*<p className="text-[11px] uppercase tracking-[0.25em] text-text-secondary sm:text-xs lg:text-sm xl:text-base">Last 6 months</p>*/}
        </div>

        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyLineChartData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
              <XAxis
                dataKey="month"
                tickFormatter={formatAxisTick}
                tickMargin={20}
                label={{ position: 'insideBottomRight', value: 'Month', offset: -10, dy: 5 }}
              />
              <YAxis
                domain={[0, yAxisMax]}
                label={{ position: 'insideTopLeft', value: 'Amount', angle: -90, dy: 42, dx: -10 }}
              />
              <Bar dataKey="income" name="Income" fill="#10b981" label={renderIncomeLabel} />
              <Bar dataKey="expense" name="Expense" fill="#D85A30" label={renderExpenseLabel} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="list-card p-4 sm:p-5">
          <h3 className="section-title text-[11px] sm:text-[12px] lg:text-[13px] xl:text-[14px]">Recent Transactions</h3>
          {transactionLimiter.length === 0 ? (
            <p className="empty-state">No recent transactions to show yet.</p>
          ) : (
            <ol className="flex flex-col gap-2">
              {transactionLimiter.map((item) => (
                <li key={item.id} className="transaction-row">
                  <span className={`transaction-dot ${item.type === 'income' ? 'bg-income' : 'bg-expense'}`} />
                  <div className="flex flex-1 items-start justify-between gap-3">
                    <div className="flex min-w-0 flex-col">
                      <span
                        className={`transaction-category ${item.type === 'income' ? 'is-income' : 'is-expense'}`}
                        style={{ color: getCategoryColor(item.category) }}
                      >
                        {item.category}
                      </span>
                      {item.note ? <span className="transaction-note">{item.note}</span> : null}
                    </div>
                    <span className={`shrink-0 font-semibold ${item.type === 'income' ? 'text-income' : 'text-expense'}`}>
                      {item.type === 'income' ? '+' : '-'} ${item.amount}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </section>

        <section className="list-card p-4 sm:p-5">
          <h3 className="section-title text-[11px] sm:text-[12px] lg:text-[13px] xl:text-[14px]">Recent Spending</h3>
          {transactionLimiter.filter((item) => item.type === 'expense').length === 0 ? (
            <p className="empty-state">No expense data to show.</p>
          ) : (
            <ol className="flex flex-col gap-2">
              {transactionLimiter
                .filter((item) => item.type === 'expense')
                .map((item) => (
                  <li key={item.id} className="transaction-row">
                    <span className="transaction-dot bg-expense" />
                    <div className="flex flex-1 items-start justify-between gap-3">
                      <div className="flex min-w-0 flex-col">
                        <span
                          className="transaction-category is-expense"
                          style={{ color: getCategoryColor(item.category) }}
                        >
                          {item.category}
                        </span>
                        {item.note ? <span className="transaction-note">{item.note}</span> : null}
                      </div>
                      <span className="shrink-0 font-semibold text-expense">-${item.amount}</span>
                    </div>
                  </li>
                ))}
            </ol>
          )}
        </section>
      </div>

      <div className="grid gap-5 lg:grid-cols-1">
        <section className="list-card p-4 sm:p-5">
          <h3 className="section-title text-[11px] sm:text-[12px] lg:text-[13px] xl:text-[14px]">Recent Income</h3>
          {transactionLimiter.filter((item) => item.type === 'income').length === 0 ? (
            <p className="empty-state">No income data to show.</p>
          ) : (
            <ol className="flex flex-col gap-2">
              {transactionLimiter
                .filter((item) => item.type === 'income')
                .map((item) => (
                  <li key={item.id} className="transaction-row">
                    <span className="transaction-dot bg-income" />
                    <div className="flex flex-1 items-start justify-between gap-3">
                      <div className="flex min-w-0 flex-col">
                        <span
                          className="transaction-category is-income"
                          style={{ color: getCategoryColor(item.category) }}
                        >
                          {item.category}
                        </span>
                        {item.note ? <span className="transaction-note">{item.note}</span> : null}
                      </div>
                      <span className="shrink-0 font-semibold text-income">+${item.amount}</span>
                    </div>
                  </li>
                ))}
            </ol>
          )}
        </section>
      </div>

      <div className="section-card flex flex-col gap-3 p-4 sm:p-5">
        <h3 className="text-sm font-semibold text-[#FF6B4A] sm:text-base lg:text-lg xl:text-xl">Danger Zone</h3>
        <p className="text-sm leading-6 text-text-secondary sm:text-[15px] lg:text-base xl:text-lg">
          Permanently delete all transactions, categories, and settings stored in this application.
          This action cannot be undone.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm text-text-secondary">This will erase all local data.</span>
          <button
            onClick={() => {
              clearAllData();
            }}
            className="rounded-md border border-[#D85A30] bg-[#2A0D08] px-5 py-2.5 text-sm font-medium text-[#FF6B4A] transition-all duration-200 hover:border-[#FF6B4A] hover:bg-[#38130D] hover:text-white active:scale-95"
          >
            Clear All Data
          </button>
        </div>
      </div>
    </div>
  );
}