import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { FinanceProvider } from './context/FinanceContext'
import './App.css'
import NavBar from './components/NavBar'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import AddTransaction from './pages/AddTransaction'
import Settings from './pages/Settings'


function App() {
 
  return (
    <>
    <FinanceProvider>
     <BrowserRouter>
      <NavBar />
      <main>
     <Routes>
       <Route path="/" element={<Dashboard />} />
       <Route path="/transactions" element={<Transactions />} />
       <Route path="/add" element={<AddTransaction />} />
       <Route path="/settings" element={<Settings />} />
     </Routes>
      </main>
     </BrowserRouter>
    </FinanceProvider>
    </>
  )
}

export default App
