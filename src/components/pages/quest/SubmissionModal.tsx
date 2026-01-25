import React, { useState } from 'react'
import type { AnswerQuestRequest, QuestDTO } from '@/api/grimoire_svc'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { questApi } from '@/lib/api.ts'

interface SubmissionModalProps {
  quest: QuestDTO
  isOpen: boolean
  onClose: () => void
}

const SubmissionModal: React.FC<SubmissionModalProps> = ({
  quest,
  isOpen,
  onClose,
}) => {
  const [answer, setAnswer] = useState('')
  const queryClient = useQueryClient()

  // 1. Setup the Mutation
  const mutation = useMutation({
    mutationFn: (userAnswer: string) => {
      if (!quest.id) throw new Error('Quest ID is missing')

      const requestBody: AnswerQuestRequest = {
        answer: userAnswer,
        // We send the description too if the backend needs it for context
        questionDescription: quest.description || '',
      }

      // This matches POST /api/v1/quest/{questId}/answer
      return questApi.answerQuest(quest.id, requestBody)
    },
    onSuccess: async () => {
      // Optional: Refresh the quest list to show this quest as "Completed"
      await queryClient.invalidateQueries({ queryKey: ['quests'] })
    },
    onError: (error) => {
      console.error('Submission failed', error)
    },
  })

  if (!isOpen) return null

  const isPending = mutation.isPending
  const result = mutation.data?.data.data // Access the GradingResult from response
  const isSuccess = mutation.isSuccess && result

  // Xử lý khi nhấn nút Gửi trong Modal

  return (
    // Overlay (Lớp nền mờ)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      {/* Modal Box */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center shrink-0">
          <h3 className="font-bold text-slate-800 text-lg">
            {isSuccess ? 'Kết quả chấm điểm' : 'Nộp bài làm'}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          {isPending && (
            <div className="absolute inset-0 z-10 bg-white/90 flex flex-col items-center justify-center animate-fadeIn">
              <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4"></div>
              <h4 className="text-lg font-semibold text-slate-700">
                Đang chấm điểm...
              </h4>
              <p className="text-sm text-slate-500">
                Hệ thống đang phân tích câu trả lời của bạn
              </p>
            </div>
          )}
          {/* View 1: Submission Form (Hidden after success) */}
          {!isSuccess && (
            <>
              <div className="mb-4">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">
                  {quest.type}
                </span>
                <h2 className="text-xl font-bold text-slate-800 mt-1">
                  {quest.title}
                </h2>
                <p className="text-sm text-slate-500 mt-2">
                  {quest.description}
                </p>
              </div>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Câu trả lời của bạn:
              </label>
              <textarea
                className="w-full h-32 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none text-slate-700"
                placeholder={quest.answerHint || 'Nhập câu trả lời...'}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={isPending}
              ></textarea>

              {mutation.isError && (
                <div className="mt-3 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
                  Lỗi khi gửi bài: {mutation.error.message}
                </div>
              )}
            </>
          )}

          {/* View 2: Grading Result (Shown after success) */}
          {isSuccess && result && (
            <div className="space-y-4 text-center animate-fadeIn">
              {/* Score Circle */}
              <div
                className={`mx-auto w-24 h-24 flex items-center justify-center rounded-full border-4 text-3xl font-bold 
                                ${result.isCorrect ? 'border-green-500 text-green-600 bg-green-50' : 'border-orange-500 text-orange-600 bg-orange-50'}`}
              >
                {result.score}
              </div>

              <div>
                <h4
                  className={`text-xl font-bold ${result.isCorrect ? 'text-green-700' : 'text-orange-700'}`}
                >
                  {result.isCorrect ? 'Xuất sắc!' : 'Cần cải thiện'}
                </h4>
                <p className="text-slate-600 mt-2 text-sm text-left bg-slate-50 p-4 rounded-lg border border-slate-100">
                  {result.feedback}
                </p>
              </div>

              {/* Improvement Hint if score is low */}
              {result.improvementHint && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-left">
                  <span className="text-xs font-bold text-blue-600 uppercase">
                    Gợi ý cải thiện
                  </span>
                  <p className="text-sm text-blue-800 mt-1">
                    {result.improvementHint}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors"
          >
            Hủy bỏ
          </button>
          <button
            onClick={() => mutation.mutate(answer)}
            disabled={!answer.trim()} // Disable nếu chưa nhập gì
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Gửi câu trả lời
          </button>
        </div>
      </div>
    </div>
  )
}

export default SubmissionModal
