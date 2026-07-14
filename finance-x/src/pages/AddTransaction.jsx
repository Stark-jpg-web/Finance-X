import {useContext} from 'react'
import { useState } from 'react';
import {FinanceContext} from '../context/FinanceContext'

export default function AddTransaction() {

 const { transactions, dispatch } = useContext(FinanceContext)
 const [type, setType] = useState('');
 const [amount, setAmount] = useState('');
 const [category, setCategory] = useState('');
 const [date, setDate] = useState('');
 const [note, setNote] = useState('');


    return(

<form className="add-transaction-form bg-bg text-text-primary p-10 flex flex-col gap-10 justify-center items-center ">
<h1 className=''>Add Transaction</h1>
<div className="form-group w-[70%] flex flex-col gap-5 bg-surface rounded-2xl p-10">
    
    


    <div className="toggle-button flex items-center justify-around my-5">
 <button className={`toggle-btn income ${type==="income" ? "active" :""}`}
 >Income</button>
 <button className={`toggle-btn income ${type==="expense" ? "active" :""}`} >Expense</button>
    </div>


    <label htmlFor="amount" className="form-label block">Amount</label>
    <input type="number" id="amount" value={amount} placeholder="0.00" onChange={(e) => setAmount(e.target.value)} />


<label htmlFor="category" className="form-label block">Category</label>
    <input type="text" id="category" value={category} placeholder="Food" onChange={(e) => setCategory(e.target.value)} />
    <label htmlFor="date" className="form-label block">Date</label>
    <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
<label htmlFor="note" className="form-label block">Note</label>
    <input type="text" id="note" value={note} placeholder="Weekly grocery shopping" onChange={(e) => setNote(e.target.value)} />
    <div className="cancel-submit-buttons">
    <button type="button" className="cancel-button ">Cancel</button>
    <button type="submit" className="submit-button ">Add Transaction</button>
    </div>
</div>



</form>

    )


}
