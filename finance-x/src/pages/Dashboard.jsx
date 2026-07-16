import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import {useContext} from 'react'
import {FinanceContext} from '../context/FinanceContext'
import { useCharData } from '../hooks/useCharData';


export default function Dashboard() {

    const { transactions, dispatch } = useContext(FinanceContext)
    const { monthlyLineChartData } = useCharData()

    const recentTransactions = [
      { id: 1, title: 'Salary', amount: '$3,200.00', type: 'income' },
      { id: 2, title: 'Groceries', amount: '$84.50', type: 'expense' },
      { id: 3, title: 'Freelance Project', amount: '$500.00', type: 'income' },
      { id: 4, title: 'Utilities', amount: '$120.00', type: 'expense' },
    ];

    const spendingCategories = [
      { name: 'Food', amount: '$0.00', colorClass: 'text-cat-food' },
      { name: 'Rent', amount: '$0.00', colorClass: 'text-cat-rent' },
      { name: 'Transport', amount: '$0.00', colorClass: 'text-cat-transport' },
      { name: 'Other', amount: '$0.00', colorClass: 'text-cat-other' },
      { name: 'Entertainment', amount: '$0.00', colorClass: 'text-cat-entertainment' },
    ];

function incomeCalcualtor(){
  let totalIncome = 0;
  transactions.forEach(transaction => {
    if(transaction.type === "income"){
      totalIncome += Number(transaction.amount || 0);
    }
  });
  return totalIncome;
}

function expenseCalcualtor(){
  let totalExpenses = 0;
  transactions.forEach(transaction => {
    if(transaction.type === "expense"){
      totalExpenses += Number(transaction.amount || 0);
    }
  });
  return totalExpenses;
}

function balanceCalculator(){
  const totalIncome = incomeCalcualtor();
  const totalExpenses = expenseCalcualtor();
  return totalIncome - totalExpenses;
}


const Transactionlimiter=[...transactions].sort((a,b)=> new Date(b.date)- new Date(a.date)).slice(0,5)


const categoryColors = {
  Food: '#534AB7',
  Rent: '#D85A30',
  Transport: '#1D9E75',
  Other: '#BA7517',
  Entertainment: '#F59E0B',
  Salary: '#10b981',
  default: '#6B7280'
};

function getCategoryColor(category) {
  return categoryColors[category] || categoryColors.default;
}

    // Bar chart
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


    return(

<div className="dashboard min-h-screen bg-bg text-text-primary p-5 flex flex-col gap-5">


<h3 className="text-2xl font-bold mb-5 text-text-primary">Overview</h3>


<div className="metric-container grid grid-cols-3 gap-3 mb-5">

<div className="metric-card ">
    <h3 className="card-label text-income ">$ TOTAL INCOME</h3>
    <p className='card-value text-income'>$ {incomeCalcualtor()}</p>
</div>

<div className="metric-card">
    <h3 className="card-label text-expense">TOTAL EXPENSES</h3>
    <p className="card-value text-expense">$ {expenseCalcualtor()}</p>
</div>

<div className="metric-card ">
    <h3 className="card-label ">BALANCE</h3>
    <p className="card-value ">${balanceCalculator()}</p> 
</div>
</div> 

<div className="chart-container bg-surface p-5 rounded-lg shadow-md flex flex-col items-center gap-5">

<h3 className="text-2xl font-bold mb-5  self-start ">Monthly Income vs  Expenses</h3>

 <BarChart width="80%" height={500} data={monthlyLineChartData} margin={{ top: 80, right: 50, left: 50, bottom: 80 }}>
      <XAxis
        dataKey="month"
        tickFormatter={formatAxisTick}
        tickMargin={30}
        label={{ position: 'insideBottomRight', value: 'Month', offset: -20, dy: 5 }}
      />
      <YAxis domain={[0, yAxisMax]} label={{ position: 'insideTopLeft', value: 'Amount', angle: -90, dy: 42, dx: -10 }} />
      <Bar dataKey="income" name="Income" fill="#10b981" label={renderIncomeLabel} />
      <Bar dataKey="expense" name="Expense" fill="#D85A30" label={renderExpenseLabel} />
    </BarChart>

</div>

<div className="transactions flex min-h-full justify-around gap-5">


  

<ol className="recent-transactions-list w-1/2">
  <h3 className="text-lg font-semibold mb-2">Recent Transactions</h3>
  {Transactionlimiter.slice(0,5).map((item) => {
    const transactionColorClass = item.type === 'income' ? 'text-income' : 'text-expense';

    return (
      <li key={item.id} className={`${transactionColorClass} list-none`}>
        <div className="flex items-center gap-2.5 w-full">
          <span className="inline-block h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: item.type === 'income' ? '#1D9E75' : '#D85A30' }} />
          <div className="flex justify-between items-center gap-2.5 flex-1">
            <span>{item.category}</span>
            <span className="font-bold">{item.amount}</span>
          </div>
        </div>
      </li>
    );
  })}
</ol>


<div className="all-transactions w-1/2">
  <h3>spending by category</h3>
  <ol className="spending-category-list">
    {Transactionlimiter.map((item) => (
      <li key={item.id} className="list-none">
        <div className="flex items-center gap-2.5 w-full">
          <span className="inline-block h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: getCategoryColor(item.category) }} />
          <div className="flex justify-between items-center gap-2.5 flex-1">
            <span>{item.category}</span>
            <span>{item.amount}</span>
          </div>
        </div>
      </li>
    ))}
  </ol>
</div>






</div>

</div>  




    )


}
