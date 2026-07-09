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

    // Bar chart
    const formatAxisTick = (value) => {
      return `*${value}*`;
    };

    const renderIncomeLabel = ({ x, y, width, value }) => {
      if (value == null) return null;
      return (
        <text x={x + width / 2} y={y} fill="#10b981" textAnchor="middle" dy={-16}>
          Income
        </text>
      );
    };

    const renderExpenseLabel = ({ x, y, width, value }) => {
      if (value == null) return null;
      return (
        <text x={x + width / 2} y={y} fill="#D85A30" textAnchor="middle" dy={-16}>
          Expense
        </text>
      );
    };


    return(

<div className="dashboard bg-bg text-text-primary p-5 flex flex-col gap-5">


<h3 className="text-2xl font-bold mb-5 text-text-primary">Overview</h3>


<div className="metric-container grid grid-cols-3 gap-3 mb-5">

<div className="metric-card ">
    <h3 className="card-label text-income ">$ TOTAL INCOME</h3>
    <p className='card-value text-income'>$ 0000</p>
</div>

<div className="metric-card">
    <h3 className="card-label text-expense">TOTAL EXPENSES</h3>
    <p className="card-value text-expense">$ 0000</p>
</div>

<div className="metric-card ">
    <h3 className="card-label ">BALANCE</h3>
    <p className="card-value ">$ 0000</p> 
</div>
</div> 

<div className="chart-container bg-surface p-5 rounded-lg shadow-md flex flex-col items-center gap-5">

<h3 className="text-2xl font-bold mb-5  self-start ">Monthly Income vs  Expenses</h3>

 <BarChart width="80%" height={500} data={monthlyLineChartData} margin={{ top: 80, right: 50, left: 50, bottom: 80 }}>
      <XAxis
        dataKey="month"
        tickFormatter={formatAxisTick}
        tickMargin={20}
        label={{ position: 'insideBottomRight', value: 'Month', offset: -20, dy: 5 }}
      />
      <YAxis label={{ position: 'insideTopLeft', value: 'Amount', angle: -90, dy: 42, dx: -10 }} />
      <Bar dataKey="income" name="Income" fill="#10b981" label={renderIncomeLabel} />
      <Bar dataKey="expense" name="Expense" fill="#D85A30" label={renderExpenseLabel} />
    </BarChart>

</div>

<div className="transactions flex min-h-full justify-around gap-5">


  

<ol className="recent-transactions-list w-1/2">
  <h3 className="text-lg font-semibold mb-2">Recent Transactions</h3>
  {recentTransactions.map((item) => {
    const transactionColorClass = item.type === 'income' ? 'text-income' : 'text-expense';

    return (
      <li key={item.id} className={`${transactionColorClass} list-none`}>
        <div className="flex items-center gap-2.5 w-full">
          <span className="inline-block h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: item.type === 'income' ? '#1D9E75' : '#D85A30' }} />
          <div className="flex justify-between items-center gap-2.5 flex-1">
            <span>{item.title}</span>
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
    {spendingCategories.map((item) => (
      <li key={item.name} className={`${item.colorClass} list-none`}>
        <div className="flex items-center gap-2.5 w-full">
        
          <span className="inline-block h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: item.colorClass.includes('food') ? '#534AB7' : item.colorClass.includes('rent') ? '#D85A30' : item.colorClass.includes('transport') ? '#1D9E75' : item.colorClass.includes('other') ? '#BA7517' : '#F59E0B' }} />
          <div className="flex justify-between items-center gap-2.5 flex-1">
            <span>{item.name}</span>
            <span>$0.00</span>
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
