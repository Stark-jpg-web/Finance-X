import {createContext} from "react";
import {useReducer} from "react";
import {useEffect} from "react";
import {financeReducer} from "./financeReducer"


export const FinanceContext=createContext([])



export function FinanceProvider({children}) {
 

//saves data to local storage and retrieves it when the app is reloaded
    const saved = JSON.parse(localStorage.getItem("transactions")) || [];
//log local storage data to console
console.log("saved:", saved);

    const [transactions, dispatch] = useReducer(financeReducer, saved);

    //saves data to local storage whenever transactions change
    useEffect(() => {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);

    //log new local storage when transactions change
    console.log("transactions:", transactions);
    
    return(
        <FinanceContext.Provider value={{transactions, dispatch}}>
            {children}
        </FinanceContext.Provider>
)
}
