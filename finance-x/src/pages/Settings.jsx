import {useContext} from 'react'
import {FinanceContext} from '../context/FinanceContext'


export default function Settings() {
    const { transactions, dispatch } = useContext(FinanceContext)

    return(
<>
<h1>Settings</h1>
{console.log("transactions:", transactions)}
</>
    )


}
