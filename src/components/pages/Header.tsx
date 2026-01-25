import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import avatarImg from '../../assets/icon/avatar.jpg'
import { Coins, Expand, LogOut, Shrink, UserIcon } from 'lucide-react'

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------

interface UserHUDProps {
  level: number
  gold: number
  currentExp: number
  maxExp: number
}

export function UserHUD({ level, gold, currentExp, maxExp }: UserHUDProps) {
  const expPercentage = Math.min(100, Math.max(0, (currentExp / maxExp) * 100))

  return (
    <div className="flex items-center gap-4 mr-4 border-r border-gray-200 pr-4 h-8">
      {/* Gold Display */}
      <div className="flex items-center gap-1.5 text-amber-600 font-semibold text-sm bg-amber-50 px-2 py-1 rounded-full border border-amber-100">
        <Coins className="w-3.5 h-3.5 fill-current" />
        <span>{gold.toLocaleString()}</span>
      </div>

      {/* Level & XP Container */}
      <div className="flex flex-col items-end justify-center w-32">
        <div className="flex items-center gap-1 text-xs font-bold text-indigo-700 leading-none mb-1">
          <span>Lv.{level}</span>
          <span className="text-gray-400 font-normal">
            ({currentExp}/{maxExp})
          </span>
        </div>

        {/* Slim XP Bar */}
        <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-500"
            style={{ width: `${expPercentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}

// -----------------------------------------------------------------------------
// COMPONENT: Profile Toggle Menu (The Dropdown)
// -----------------------------------------------------------------------------
function ProfileToggleMenu({ isMenuOpen }: { isMenuOpen: boolean }) {
  if (!isMenuOpen) return null

  return (
    <div className="absolute right-0 top-full mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg z-50 py-1">
      <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left">
        <UserIcon className="w-4 h-4" /> Profile Settings
      </button>
      <div className="h-px bg-gray-100 my-1" />
      <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left">
        <LogOut className="w-4 h-4" /> Đăng xuất
      </button>
    </div>
  )
}

// -----------------------------------------------------------------------------
// COMPONENT: Main Profile Menu (The Trigger)
// -----------------------------------------------------------------------------
function HeaderProfileSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Mock Data
  const user = {
    name: 'Khoavm',
    avatar: avatarImg,
    level: 5,
    gold: 1250,
    currentExp: 350,
    maxExp: 1000,
  }

  // ... (keep click outside logic) ...
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    if (isMenuOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen])

  return (
    <div className="flex items-center">
      {/* 1. The Stats HUD (Always Visible) */}
      <UserHUD
        level={user.level}
        gold={user.gold}
        currentExp={user.currentExp}
        maxExp={user.maxExp}
      />

      {/* 2. The Profile Dropdown */}
      <div className="relative" ref={menuRef}>
        <div
          className="flex cursor-pointer items-center gap-2 pl-2 hover:opacity-80 transition-opacity"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <img
            src={user.avatar}
            alt="avatar"
            className="h-9 w-9 rounded-full border border-gray-200"
          />
          <span className="hidden md:block font-medium text-sm text-gray-700">
            {user.name}
          </span>
        </div>
        <ProfileToggleMenu isMenuOpen={isMenuOpen} />
      </div>
    </div>
  )
}

function Header({
  isExpand,
  setIsExpand,
  currentMenu,
}: {
  isExpand: boolean
  setIsExpand: Dispatch<SetStateAction<boolean>>
  currentMenu: string
}) {
  return (
    <header className="flex flex-1 h-1 pt-2 pb-2 items-center justify-between bg-white px-6">
      <div className="flex items-center justify-center gap-2 text-xl text-gray-700">
        <div
          className="cursor-pointer font-bold"
          onClick={() => setIsExpand((e) => !e)}
        >
          {isExpand ? <Shrink /> : <Expand />}
        </div>
        <span>{currentMenu}</span>
      </div>
      <div className="flex flex-row-reverse">
        <HeaderProfileSection />
      </div>
    </header>
  )
}

export default Header
