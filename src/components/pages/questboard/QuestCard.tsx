import React, { useState, useRef, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QuestDTOActionTypeEnum } from '@/lib/api/grimoire_svc'
import { questApi } from '@/lib/api/api.ts'

// --- 2. Interface Update ---
interface QuestCardProps {
  id: string // [Added] We need ID to delete
  type: string
  title: string
  description: string
  reward: string
  actionType: QuestDTOActionTypeEnum
  onClick?: () => void
}

const QuestCard: React.FC<QuestCardProps> = ({
  id,
  type,
  title,
  description,
  reward,
  onClick,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const queryClient = useQueryClient()

  // --- 3. React Query Mutation for Delete ---
  const deleteMutation = useMutation({
    mutationFn: (questId: string) => questApi.deleteQuest(questId),
    onSuccess: () => {
      // Refresh the questboard list after successful delete
      queryClient.invalidateQueries({ queryKey: ['quests'] })
      // Close menu
      setIsMenuOpen(false)
    },
    onError: (error) => {
      console.error('Failed to delete questboard:', error)
      alert('Failed to delete questboard')
    },
  })

  // Handle clicking outside to close menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuRef])

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering the card's onClick
    if (confirm('Are you sure you want to delete this questboard?')) {
      deleteMutation.mutate(id)
    }
  }

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMenuOpen(!isMenuOpen)
  }

  // 1. Define a palette of safe, nice-looking colors (Tailwind classes)
  const TYPE_COLORS = [
    'bg-red-50 text-red-700 border-red-200',
    'bg-orange-50 text-orange-700 border-orange-200',
    'bg-amber-50 text-amber-700 border-amber-200',
    'bg-green-50 text-green-700 border-green-200',
    'bg-emerald-50 text-emerald-700 border-emerald-200',
    'bg-teal-50 text-teal-700 border-teal-200',
    'bg-blue-50 text-blue-700 border-blue-200',
    'bg-cyan-50 text-cyan-700 border-cyan-200',
    'bg-indigo-50 text-indigo-700 border-indigo-200',
    'bg-violet-50 text-violet-700 border-violet-200',
    'bg-purple-50 text-purple-700 border-purple-200',
    'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
    'bg-pink-50 text-pink-700 border-pink-200',
    'bg-rose-50 text-rose-700 border-rose-200',
  ]

  const getTypeStyle = (typeStr: string): string => {
    // Fallback for empty/null types
    if (!typeStr) return 'bg-gray-100 text-gray-700 border-gray-200'
    // 3. Hashing Algorithm: Turn string into a number
    let hash = 0
    for (let i = 0; i < typeStr.length; i++) {
      // Standard string hashing logic
      hash = typeStr.charCodeAt(i) + ((hash << 5) - hash)
    }
    // 4. Pick a color based on the hash
    // Use Math.abs to handle negative hash results
    const index = Math.abs(hash) % TYPE_COLORS.length

    return TYPE_COLORS[index]
  }

  return (
    <div
      onClick={onClick}
      className="
        group relative w-full max-w-sm bg-white
        rounded-xl border border-slate-200 shadow-sm
        transition-all duration-300 ease-in-out
        hover:shadow-lg hover:-translate-y-1 hover:border-blue-300 cursor-pointer
        overflow-visible
      "
    >
      <div className="p-6 relative">
        {/* --- Header: Type & Menu --- */}
        <div className="flex items-center justify-between mb-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getTypeStyle(type)}`}
          >
            {type}
          </span>

          {/* --- [Added] Dropdown Menu Trigger --- */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={toggleMenu}
              className="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              {/* Three dots icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </button>

            {/* --- [Added] Dropdown Content --- */}
            {isMenuOpen && (
              <div className="absolute right-0 top-8 w-40 bg-white rounded-lg shadow-xl border border-slate-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <button
                  onClick={handleDelete}
                  disabled={deleteMutation.isPending}
                  className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  {deleteMutation.isPending ? (
                    // Spinner
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    // Trash Icon
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  )}
                  Delete Quest
                </button>
              </div>
            )}
          </div>
        </div>

        {/* --- Body: Title & Description --- */}
        <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>

        <div className="text-sm text-slate-500 leading-relaxed mb-6 h-24 pb-6 line-clamp-3">
          {description}
        </div>

        {/* --- Divider --- */}
        <div className="border-t border-slate-100 mb-4"></div>

        {/* --- Footer: Reward --- */}
        <div className="flex items-center gap-2 text-emerald-600 font-semibold bg-emerald-50/50 p-2 rounded-lg -mx-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 5h1v1a1 1 0 01-2 0V7zm5-5a1 1 0 011 1v1h1a1 1 0 010 2h-1v1a1 1 0 01-2 0V6h-1a1 1 0 010-2h1V3a1 1 0 011-1zm0 5h1v1a1 1 0 01-2 0V7zM6 10a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm5-4a1 1 0 011 1v9a1 1 0 11-2 0V7a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm">{reward}</span>
        </div>
      </div>
    </div>
  )
}

export default QuestCard
