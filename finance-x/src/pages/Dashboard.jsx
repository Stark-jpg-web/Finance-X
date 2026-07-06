import {useContext} from 'react'
import {FinanceContext} from '../context/FinanceContext'


export default function Dashboard() {

    const { transactions, dispatch } = useContext(FinanceContext)

    return(
<>
<h1>Dashboard</h1>
</>
    )


}
