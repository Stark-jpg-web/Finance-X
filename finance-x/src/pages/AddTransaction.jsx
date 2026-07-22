import { useContext, useState } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { useNavigate,useLocation } from "react-router-dom";

export default function AddTransaction() {
const location = useLocation();
const transaction = location.state?.transaction;
const { transactions,dispatch } = useContext(FinanceContext);
const [type, setType] = useState(transaction?.type || "income");
const [amount, setAmount] = useState(transaction?.amount || "");
const [category, setCategory] = useState(transaction?.category || "");
const [date, setDate] = useState(transaction?.date || "");
const [note, setNote] = useState(transaction?.note || "");

const navigate=useNavigate();
const isEditing = !!transaction;


  function handleSubmit(e) {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    if (!category) {
      alert('Please enter a category');
      return;
    }
    if (!date) {
      alert('Please enter a date');
      return;
    }
    

    const normalizedCategory = category.trim().toLowerCase();

    const transactionData = {
      id: isEditing?transaction.id : Date.now(),
      amount: parseFloat(amount),
      type,
      category: normalizedCategory,
      date,
      note,
    };

    dispatch({ type: isEditing?'EDIT_TRANSACTION':'ADD_TRANSACTION', payload: transactionData });

navigate("/transactions")

    setAmount('');
    setCategory('');
    setDate('');
    setNote('');

    console.log('submitting', transactionData);
  }


  return (
    <div className='min-h-screen bg-bg px-3 py-4 sm:px-4 sm:py-6 lg:px-6'>
      <form
        onSubmit={handleSubmit}
        className='mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-2xl flex-col items-center justify-center gap-4 rounded-2xl p-3 text-text-primary sm:gap-6 sm:p-6 lg:p-8'
      >
        <h1 className='text-center text-xl font-semibold sm:text-2xl'>
          {isEditing ? 'Edit Transaction' : 'Add Transaction'}
        </h1>

        <div className='form-group flex w-full flex-col gap-4 rounded-2xl border border-border/70 bg-surface p-4 shadow-sm shadow-black/20 sm:gap-5 sm:p-6 lg:p-8'>
          <div className='toggle-button my-2 flex items-center justify-around gap-2 rounded-lg bg-elevated/70 p-1.5 sm:my-3'>
            <button
              type='button'
              className={`toggle-btn income ${type === 'income' ? 'active' : ''}`}
              onClick={() => setType('income')}
            >
              Income
            </button>
            <button
              type='button'
              className={`toggle-btn expense ${type === 'expense' ? 'active' : ''}`}
              onClick={() => setType('expense')}
            >
              Expense
            </button>
          </div>

          <div className='flex flex-col gap-4 sm:gap-5'>
            <label htmlFor='amount' className='form-label block text-sm font-medium'>Amount</label>
            <input
              type='number'
              id='amount'
              value={amount}
              placeholder='0.00'
              onChange={(e) => setAmount(e.target.value)}
              className='w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-text-primary outline-none transition focus:border-income sm:px-4'
            />

            <label htmlFor='category' className='form-label block text-sm font-medium'>Category</label>
            <input
              type='text'
              id='category'
              value={category}
              placeholder='Food'
              onChange={(e) => setCategory(e.target.value)}
              className='w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-text-primary outline-none transition focus:border-income sm:px-4'
            />

            <label htmlFor='date' className='form-label block text-sm font-medium'>Date</label>
            <input
              type='date'
              id='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className='w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-text-primary outline-none transition focus:border-income sm:px-4'
            />

            <label htmlFor='note' className='form-label block text-sm font-medium'>Note</label>
            <input
              type='text'
              id='note'
              value={note}
              placeholder='Weekly grocery shopping'
              onChange={(e) => setNote(e.target.value)}
              className='w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-text-primary outline-none transition focus:border-income sm:px-4'
            />
          </div>

          <div className='mt-1 flex flex-col gap-3 sm:mt-2 sm:flex-row sm:justify-stretch'>
            
            <button
              type='submit'
              className='w-full rounded-md border border-[#1D9E75] bg-[#072A21] px-4 py-2.5 text-sm font-medium text-[#2DD4BF] transition-all duration-200 hover:border-[#2DD4BF] hover:bg-[#0C3D2D] hover:text-white active:scale-95 sm:flex-1'
            >
              {isEditing ? 'Save Changes' : 'Add Transaction'}
            </button>
            <button
              type='button'
              onClick={() => navigate('/transactions')}
              className='w-full rounded-md border border-[#D85A30] bg-[#2A0D08] px-4 py-2.5 text-sm font-medium text-[#FF6B4A] transition-all duration-200 hover:border-[#FF6B4A] hover:bg-[#38130D] hover:text-white active:scale-95 sm:flex-1'
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
