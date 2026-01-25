import React, { useState } from 'react'

import Header from '@/components/pages/Header.tsx'
import { Sidebar } from '@/components/pages/Sidebar.tsx'
import Main from '@/components/pages/Main.tsx'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import QuestBoard from '@/components/pages/quest/QuestBoard.tsx'
const App: React.FC = () => {
  const [isExpand, setIsExpand] = useState(false)

  return (
    <div className="flex items-start w-full bg-slate-50/50">
      {/* SIDEBAR */}
      {!isExpand && <Sidebar />}
      {/* MAIN CONTENT */}
      <Main>
        <Header
          isExpand={isExpand}
          setIsExpand={setIsExpand}
          currentMenu="Quests"
        />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/quests" replace />} />
            <Route path="/quests" element={<QuestBoard />} />
          </Routes>
        </BrowserRouter>
      </Main>
    </div>
  )
}

export default App
