import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import SubmissionModal from '@/components/pages/quest/SubmissionModal.tsx'
import QuestCard from '@/components/pages/quest/QuestCard.tsx'
import { useQuery } from '@tanstack/react-query'
import { type GetQuestListRequest, type QuestDTO } from '@/api/grimoire_svc'
import { questApi } from '@/lib/api.ts'
import { CreateQuestDialog } from '@/components/pages/quest/CreateQuestDialog.tsx'

export default function QuestBoard() {
  const [selectedQuest, setSelectedQuest] = useState<QuestDTO | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  // API Request State
  const [filters, setFilters] = useState<GetQuestListRequest>({
    page: 0,
    size: 10,
    query: '',
    type: '',
  })

  // Debounce Search Logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        query: searchTerm,
        page: 0,
      }))
    }, 500)
    return () => clearTimeout(handler)
  }, [searchTerm])

  // Data Fetching
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['quests', filters],
    queryFn: async () => {
      const response = await questApi.getQuestList(filters)
      return response.data
    },
  })

  const questList = data?.data?.data || []

  const handleQuestClick = (quest: QuestDTO) => {
    if (quest.actionType === 'input_text') {
      setSelectedQuest(quest)
    } else {
      alert(`Đã nhận thưởng check-in: ${quest.title}`)
    }
  }
  const getReward = (quest: QuestDTO) => {
    let rs = ''
    if (quest.reward.gold) {
      rs += `${quest.reward.gold} Xu + `
    }
    if (quest.reward.exp) {
      rs += `${quest.reward.exp} EXP`
    }
    return rs
  }

  return (
    <div className="m-6">
      {/* Unified Toolbar Section */}
      <div className="bg-white p-4 rounded-lg border shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Search Bar */}
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search quests..."
            className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 pl-9 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Create Quest Button */}
        <CreateQuestDialog onQuestCreated={refetch} />
      </div>

      {/* Quest Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-1">
        {questList.map((quest) => (
          <QuestCard
            key={quest.id}
            type={quest.type}
            title={quest.title}
            description={quest.description}
            reward={getReward(quest)}
            actionType={quest.actionType}
            onClick={() => handleQuestClick(quest)}
            id={quest.id}
          />
        ))}

        {/* Loading & Error States */}
        {isLoading && (
          <p className="col-span-full text-center py-10 text-muted-foreground">
            Loading quests...
          </p>
        )}
        {isError && (
          <p className="col-span-full text-center py-10 text-red-500">
            Error: {error.message}
          </p>
        )}
        {!isLoading && !isError && questList.length === 0 && (
          <p className="col-span-full text-center py-10 text-muted-foreground">
            No quests found matching "{filters.query}"
          </p>
        )}
      </div>

      {/* Submission Modal */}
      {selectedQuest && (
        <SubmissionModal
          quest={selectedQuest}
          isOpen={!!selectedQuest}
          onClose={() => setSelectedQuest(null)}
        />
      )}
    </div>
  )
}
