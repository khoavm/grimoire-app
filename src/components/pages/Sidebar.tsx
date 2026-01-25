import React from 'react'
import { ListTodo, Swords } from 'lucide-react'

// --- Interfaces ---

interface NavItemProps {
  icon: React.ReactNode
  label: string
  active?: boolean
}

// --- Components ---

const NavItem: React.FC<NavItemProps> = ({ icon, label, active = false }) => (
  <div
    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
      active
        ? 'bg-slate-100 text-black'
        : 'text-slate-500 hover:bg-slate-50 hover:text-black'
    }`}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </div>
)

export function Sidebar() {
  return (
    <aside className="w-64 border-r bg-white flex flex-col sticky top-0 h-screen">
      <div className="p-6 font-bold text-lg flex items-center gap-2">
        {/*<div className="w-6 h-6 rounded-full border-2 border-black"/>*/}
        <Swords />
        Grimoire
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {/*<p className="text-xs font-semibold text-muted-foreground px-2 py-2">Home</p>*/}

        <NavItem icon={<ListTodo size={18} />} label="Quests" active />
        {/*<NavItem icon={<Users size={18}/>} label="Lifecycle"/>*/}
        {/*<NavItem icon={<BarChart3 size={18}/>} label="Analytics"/>*/}
        {/*<NavItem icon={<Folder size={18}/>} label="Projects"/>*/}
        {/*<NavItem icon={<Users2 size={18}/>} label="Team"/>*/}
      </nav>
    </aside>
  )
}
