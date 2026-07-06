import {useContext} from 'react'
import {FinanceContext} from '../context/FinanceContext'

export default function AddTransaction() {

    const { transactions, dispatch } = useContext(FinanceContext)

    return(
<>
<h1>Add Transaction</h1>
</>
    )


}
