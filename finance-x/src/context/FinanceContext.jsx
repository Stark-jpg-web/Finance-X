import {createContext} from "react";
import {financeReducer} from './financeReducer.js'

export const FinanceContext=createContext([])



export function FinanceProvider({children}) {
    const [transaction,dispatch]=useReducer(financeReducer,[])

reutrn(
    <FinanceContext.provider value={{transaction,dispatch}}>
        {children}
    </FinanceContext.provider>
)
}
