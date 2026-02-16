import React, { useState } from 'react'

import Header from '@/components/pages/Header.tsx'
import { Sidebar } from '@/components/pages/Sidebar.tsx'
import Main from '@/components/pages/Main.tsx'

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Index from '@/components/pages/questboard'
import LoginPage from '@/components/pages/login'
import { useAuth } from '@/context/AuthContext.tsx'

const App: React.FC = () => {
  const [isExpand, setIsExpand] = useState(false)
  const { isAuthenticated } = useAuth()
  return (
    <div className="flex items-start min-h-screen w-full bg-slate-50/50">
      {/* SIDEBAR */}
      {!isExpand && <Sidebar />}
      {/* MAIN CONTENT */}
      <Main>
        <Header
          isExpand={isExpand}
          setIsExpand={setIsExpand}
          currentMenu="Quests"
        />
        {isAuthenticated ? (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/quests" replace />} />
              <Route path="/quests" element={<Index />} />
            </Routes>
          </BrowserRouter>
        ) : (
          <LoginPage />
        )}
      </Main>
    </div>
  )
}

export default App
