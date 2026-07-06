import {useContext} from 'react'
import {FinanceContext} from '../context/FinanceContext'


export default function Transactions() {

    const { transactions, dispatch } = useContext(FinanceContext)

    return(
<>
<h1>Transactions</h1>
{console.log("transactions:", transactions)}
</>
    )


}
