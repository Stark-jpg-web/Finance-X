import { useContext, useState } from 'react';
import { FinanceContext } from '../context/FinanceContext';

export default function AddTransaction() {
  const { dispatch } = useContext(FinanceContext);
  const [type, setType] = useState('income');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');

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

    const newTransaction = {
      id: Date.now(),
      amount: parseFloat(amount),
      type,
      category,
      date,
      note,
      colorClass
    };

    dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });

    setAmount('');
    setCategory('');
    setDate('');
    setNote('');

    console.log("submitting", newTransaction)
  }

  return (
    <div className='form-container h-screen bg-bg'>
      <form
        onSubmit={handleSubmit}
        className='add-transaction-form text-text-primary p-10 flex flex-col gap-10 justify-center items-center '
      >
        <h1 className=''>Add Transaction</h1>
        <div className='form-group w-[70%] flex flex-col gap-5 bg-surface rounded-2xl p-10'>
          <div className='toggle-button flex items-center justify-around my-5'>
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

          <div className='flex flex-col gap-5 p-5'>
            <label htmlFor='amount' className='form-label block'>Amount</label>
            <input type='number' id='amount' value={amount} placeholder='0.00' onChange={(e) => setAmount(e.target.value)} />

            <label htmlFor='category' className='form-label block'>Category</label>
            <input type='text' id='category' value={category} placeholder='Food' onChange={(e) => setCategory(e.target.value)} />
            <label htmlFor='date' className='form-label block'>Date</label>
            <input type='date' id='date' value={date} onChange={(e) => setDate(e.target.value)} />
            <label htmlFor='note' className='form-label block'>Note</label>
            <input type='text' id='note' value={note} placeholder='Weekly grocery shopping' onChange={(e) => setNote(e.target.value)} />
          </div>

          <div className='cancel-submit-buttons flex items-center justify-around my-5'>
            <button type='button' className='cancel-button'>Cancel</button>
            <button type='submit' className='submit-button'>Add Transaction</button>
          </div>
        </div>
      </form>
    </div>
  );
}
