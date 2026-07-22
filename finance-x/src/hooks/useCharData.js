import { useContext, useMemo } from 'react'
import { FinanceContext } from '../context/FinanceContext'

export function useCharData() {
  const { transactions } = useContext(FinanceContext)

  const monthlyLineChartData = useMemo(() => {
    const map = {}

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date)
      const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

      if (!map[monthKey]) {
        map[monthKey] = {
          month: monthKey,
          income: 0,
          expense: 0,
        }
      }

            // add transaction amount to the corresponding month
            
            if (transaction.type === 'income') {
                map[monthKey].income += transaction.amount
            } else {
                map[monthKey].expense += transaction.amount
            }
        })

    return Object.values(map)
  }, [transactions])

  const categoryPieChartData = useMemo(() => {
    const map = {}

    transactions.forEach((transaction) => {
      if (!map[transaction.category]) {
        map[transaction.category] = {
          name: transaction.category,
          value: 0,
        }
      }

      map[transaction.category].value += transaction.amount
    })

    return Object.values(map)
  }, [transactions])

  return { monthlyLineChartData, categoryPieChartData }
}
