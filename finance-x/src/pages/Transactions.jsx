import { useContext, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";
import { useNavigate } from "react-router-dom";
import { colors } from "../utils/colors";
export default function Transactions() {
  const { transactions, dispatch } = useContext(FinanceContext);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const navigate = useNavigate();
  const cateColors=colors.cat
  const uniqueCategories = [
    ...new Set(transactions.map((transaction) => transaction.category)),
  ];

  const uniqueMonths = [
    ...new Set(
      transactions.map((transaction) =>
        new Date(transaction.date).toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
      ),
    ),
  ];

  const filteredTransactions = transactions.filter((tx) => {
    const txMonth = new Date(tx.date).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    const matchesCategory =
      categoryFilter === "all" || tx.category === categoryFilter;
    const matchesMonth = monthFilter === "all" || txMonth === monthFilter;
    const matchesType = typeFilter === "all" || tx.type === typeFilter;
    return matchesCategory && matchesMonth && matchesType;
  });


  function getCategoryColor(category) {
    return cateColors[category] || cateColors.default;
  }
  function handleEditSave() {
    e.preventDefault();
  }

  return (
    <div className="page-shell flex min-h-screen flex-col gap-5 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="page-title text-xl sm:text-2xl lg:text-3xl xl:text-5xl">
            Transactions
          </h3>
          <p className="text-sm text-text-secondary sm:text-[15px] lg:text-base xl:text-xl">
            Review, filter, and track your spending activity.
          </p>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary sm:text-sm xl:text-lg">
            Category
          </span>
          <select
            className="filter-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary sm:text-sm xl:text-lg">
            Month
          </span>
          <select
            className="filter-select"
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
          >
            <option value="all">All Months</option>
            {uniqueMonths.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary sm:text-sm xl:text-lg">
            Type
          </span>
          <select
            className="filter-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.3fr_0.7fr_0.7fr] text-ce">
        <section className="list-card p-4 sm:p-5">
          <h3 className="section-title text-[11px] sm:text-[12px] lg:text-[13px] xl:text-[15px]">
            All Transactions
          </h3>
          {filteredTransactions.length === 0 ? (
            <p className="empty-state">
              No transactions match these filters yet.
            </p>
          ) : (
            <ol className="flex flex-col gap-2">
              {filteredTransactions.map((item) => (
                <li key={item.id} className="transaction-row">
                  <span
                    className={`transaction-dot ${item.type === "income" ? "bg-income" : "bg-expense"}`}
                  />
                  <div className="flex flex-1 items-center justify-between gap-3">
                    <div className="flex min-w-0 flex-col">
                      <span
                        className="transaction-category"
                        style={{ color: getCategoryColor(item.category) }}
                      >
                        {item.category}
                      </span>
                      {item.note ? (
                        <span className="transaction-note">{item.note}</span>
                      ) : null}
                    </div>
                    <div className="ml-auto flex items-center gap-3">
                      <span
                        className={`shrink-0 self-center font-semibold ${item.type === "income" ? "text-income" : "text-expense"}`}
                      >
                        {item.type === "income" ? "+" : "-"} ${item.amount}
                      </span>
                      <div className="control-btns flex gap-2 p-2">
                        <button
                          onClick={() => {
                            dispatch({
                              type: "DELETE_TRANSACTION",
                              payload: item,
                            });
                          }}
                          className="rounded-md border border-[#D85A30] bg-[#2A0D08] px-5 py-2.5 text-sm font-medium text-[#FF6B4A] transition-all duration-200 hover:border-[#FF6B4A] hover:bg-[#38130D] hover:text-white active:scale-95"
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            navigate("/add", { state: { transaction: item } })
                          }
                          className="rounded-md border border-[#1D9E75] bg-[#072A21] px-5 py-2.5 text-sm font-medium text-[#2DD4BF] transition-all duration-200 hover:border-[#2DD4BF] hover:bg-[#0C3D2D] hover:text-white active:scale-95"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </section>

        <section className="list-card p-4 sm:p-5">
          <h3 className="section-title text-[11px] sm:text-[12px] lg:text-[13px] xl:text-[15px]">
            Spending by Category
          </h3>
          {filteredTransactions.filter((item) => item.type === "expense")
            .length === 0 ? (
            <p className="empty-state">No expense data to show.</p>
          ) : (
            <ol className="flex flex-col gap-2">
              {filteredTransactions
                .filter((item) => item.type === "expense")
                .map((item) => (
                  <li key={item.id} className="transaction-row">
                    <span className="transaction-dot bg-expense" />
                    <div className="flex flex-1 items-center justify-between gap-3">
                      <div className="flex min-w-0 flex-col">
                        <span
                          className="transaction-category"
                          style={{ color: getCategoryColor(item.category) }}
                        >
                          {item.category}
                        </span>
                        {item.note ? (
                          <span className="transaction-note">{item.note}</span>
                        ) : null}
                      </div>
                      <div className="ml-auto flex items-center gap-3">
                        <span className="shrink-0 self-center font-semibold text-expense">
                          -${item.amount}
                        </span>
                        <div className="control-btns flex gap-2 p-2">
                          <button
                            onClick={() => {
                              dispatch({
                                type: "DELETE_TRANSACTION",
                                payload: item,
                              });
                            }}
                            className="rounded-md border border-[#D85A30] bg-[#2A0D08] px-5 py-2.5 text-sm font-medium text-[#FF6B4A] transition-all duration-200 hover:border-[#FF6B4A] hover:bg-[#38130D] hover:text-white active:scale-95"
                          >
                            Delete
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              navigate("/add", { state: { transaction: item } })
                            }
                            className="rounded-md border border-[#1D9E75] bg-[#072A21] px-5 py-2.5 text-sm font-medium text-[#2DD4BF] transition-all duration-200 hover:border-[#2DD4BF] hover:bg-[#0C3D2D] hover:text-white active:scale-95"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </ol>
          )}
        </section>

        <section className="list-card p-4 sm:p-5">
          <h3 className="section-title text-[11px] sm:text-[12px] lg:text-[13px] xl:text-[15px]">
            Income by Category
          </h3>
          {filteredTransactions.filter((item) => item.type === "income")
            .length === 0 ? (
            <p className="empty-state">No income data to show.</p>
          ) : (
            <ol className="flex flex-col gap-2">
              {filteredTransactions
                .filter((item) => item.type === "income")
                .map((item) => (
                  <li key={item.id} className="transaction-row">
                    <span className="transaction-dot bg-income" />
                    <div className="flex flex-1 items-center justify-between gap-3">
                      <div className="flex min-w-0 flex-col">
                        <span
                          className="transaction-category"
                          style={{ color: getCategoryColor(item.category) }}
                        >
                          {item.category}
                        </span>
                        {item.note ? (
                          <span className="transaction-note ">{item.note}</span>
                        ) : null}
                      </div>
                      <div className="ml-auto flex items-center gap-3">
                        <span className="shrink-0 self-center font-semibold text-income">
                          +${item.amount}
                        </span>
                        <div className="control-btns flex gap-2 p-2">
                          <button
                            onClick={() => {
                              dispatch({
                                type: "DELETE_TRANSACTION",
                                payload: item,
                              });
                            }}
                            className="rounded-md border border-[#D85A30] bg-[#2A0D08] px-5 py-2.5 text-sm font-medium text-[#FF6B4A] transition-all duration-200 hover:border-[#FF6B4A] hover:bg-[#38130D] hover:text-white active:scale-95"
                          >
                            Delete
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              navigate("/add", { state: { transaction: item } })
                            }
                            className="rounded-md border border-[#1D9E75] bg-[#072A21] px-5 py-2.5 text-sm font-medium text-[#2DD4BF] transition-all duration-200 hover:border-[#2DD4BF] hover:bg-[#0C3D2D] hover:text-white active:scale-95"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </ol>
          )}
        </section>
      </div>
    </div>
  );
}
