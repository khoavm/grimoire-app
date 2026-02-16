import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import {
  CheckCircle2,
  Coins,
  Loader2,
  PenTool,
  Plus,
  Sparkles,
  Tag,
  Trophy,
  Activity,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Textarea } from '@/components/ui/Textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select.tsx'
import { questApi } from '@/lib/api/api.ts'
import {
  type QuestDTO,
  type CreateQuestRequest,
  type CreateQuestRequestActionTypeEnum,
} from '@/lib/api/grimoire_svc'

interface CreateQuestDialogProps {
  onQuestCreated: () => void
}

interface QuestFormValues {
  title: string
  description: string
  type: string
  actionType: CreateQuestRequestActionTypeEnum
  rewardGold: number
  rewardExp: number
  answerHint: string
}

export function CreateQuestDialog({ onQuestCreated }: CreateQuestDialogProps) {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  // -------------------------------------------------------------------------
  // REACT QUERY MUTATIONS
  // -------------------------------------------------------------------------
  const createQuestMutation = useMutation({
    mutationFn: async (questData: CreateQuestRequest) => {
      return await questApi.createQuest(questData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quests'] })
      onQuestCreated()
    },
    onError: (error) => {
      console.error('Failed to create questboard:', error)
    },
  })

  const suggestMutation = useMutation({
    mutationFn: async (prompt: string) => {
      const response = await questApi.suggestQuest({
        prompt,
      })
      return response.data?.data || []
    },
  })

  // -------------------------------------------------------------------------
  // REACT HOOK FORM
  // -------------------------------------------------------------------------
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuestFormValues>({
    defaultValues: {
      title: '',
      description: '',
      type: 'General',
      actionType: 'input_text' as CreateQuestRequestActionTypeEnum,
      rewardGold: 10,
      rewardExp: 50,
      answerHint: '',
    },
  })

  const actionTypeValue = watch('actionType')

  const onSubmit = async (values: QuestFormValues) => {
    const payload: CreateQuestRequest = {
      title: values.title,
      description: values.description,
      type: values.type,
      actionType: values.actionType,
      answerHint: values.answerHint,
      reward: {
        gold: Number(values.rewardGold),
        exp: Number(values.rewardExp),
      },
    }

    await createQuestMutation.mutateAsync(payload)
    reset()
    setOpen(false)
  }

  // -------------------------------------------------------------------------
  // AI MODE STATE
  // -------------------------------------------------------------------------
  const [step, setStep] = useState<'prompt' | 'selection'>('prompt')
  const [prompt, setPrompt] = useState('')
  const [addedIndices, setAddedIndices] = useState<Set<number>>(new Set())

  const handleAiGenerate = () => {
    if (!prompt.trim()) return
    suggestMutation.mutate(prompt, {
      onSuccess: () => setStep('selection'),
    })
  }

  const handleAddAiQuest = async (quest: QuestDTO, index: number) => {
    const payload: CreateQuestRequest = {
      title: quest.title,
      description: quest.description,
      type: quest.type,
      actionType: quest.actionType || 'input_text',
      reward: quest.reward,
    }

    try {
      await createQuestMutation.mutateAsync(payload)
      setAddedIndices((prev) => new Set(prev).add(index))
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  const resetState = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {
      setTimeout(() => {
        setStep('prompt')
        setPrompt('')
        suggestMutation.reset()
        setAddedIndices(new Set())
        reset()
      }, 300)
    }
  }

  return (
    <Dialog open={open} onOpenChange={resetState}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md cursor-pointer">
          <Sparkles className="h-4 w-4" />
          New Quest
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-150 max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Create New Quest</DialogTitle>
          <DialogDescription>
            Draft a new objective for your journey.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="ai"
          className="w-full flex flex-col flex-1 overflow-hidden"
        >
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="ai" className="gap-2 cursor-pointer">
              <Sparkles className="h-4 w-4" /> AI Generator
            </TabsTrigger>
            <TabsTrigger value="manual" className="gap-2 cursor-pointer">
              <PenTool className="h-4 w-4" /> Manual
            </TabsTrigger>
          </TabsList>

          {/* --- TAB 1: AI MODE --- */}
          <TabsContent
            value="ai"
            className="flex-1 flex flex-col overflow-hidden"
          >
            {step === 'prompt' ? (
              <div className="flex flex-col space-y-4 h-full">
                <Textarea
                  placeholder="E.g., I want to learn React, or I need to exercise more..."
                  className="flex-1 p-4 resize-none text-base"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  autoFocus
                />
                <Button
                  onClick={handleAiGenerate}
                  disabled={suggestMutation.isPending || !prompt.trim()}
                  className="w-full bg-linear-to-r from-purple-500 to-indigo-600 text-white"
                >
                  {suggestMutation.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-4 w-4" />
                  )}
                  Generate Plan
                </Button>
              </div>
            ) : (
              <div className="flex flex-col h-full overflow-hidden">
                <div className="flex-1 overflow-y-auto pr-2 space-y-3 pb-4">
                  {suggestMutation.data?.map((quest, index) => {
                    const isAdded = addedIndices.has(index)
                    return (
                      <Card
                        key={index}
                        className={`border ${isAdded ? 'border-green-300 bg-green-50' : 'hover:border-indigo-300'}`}
                      >
                        <CardHeader className="p-3 flex flex-row items-center justify-between space-y-0">
                          <div className="flex-1 mr-2">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="bg-indigo-100 text-indigo-700 text-[10px] px-1.5 py-0.5 rounded font-medium uppercase tracking-wide">
                                {quest.type}
                              </span>
                              <span className="text-xs text-amber-600 font-medium flex items-center gap-1">
                                <Coins size={10} /> {quest.reward?.gold || 0}
                              </span>
                            </div>
                            <CardTitle className="text-sm font-semibold">
                              {quest.title}
                            </CardTitle>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {quest.description}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant={isAdded ? 'ghost' : 'outline'}
                            className={isAdded ? 'text-green-600' : ''}
                            disabled={isAdded || createQuestMutation.isPending}
                            onClick={() => handleAddAiQuest(quest, index)}
                          >
                            {isAdded ? (
                              <CheckCircle2 className="h-4 w-4" />
                            ) : (
                              <Plus className="h-4 w-4" />
                            )}
                          </Button>
                        </CardHeader>
                      </Card>
                    )
                  })}
                </div>
                <div className="pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setStep('prompt')}
                    className="w-full"
                  >
                    Back to Prompt
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          {/* --- TAB 2: MANUAL MODE --- */}
          <TabsContent value="manual" className="flex-1 flex flex-col">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 flex-1"
            >
              {/* Title Field */}
              <div className="grid gap-2">
                <Label htmlFor="title">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="Quest Title"
                  {...register('title', { required: 'Title is required' })}
                />
                {errors.title && (
                  <span className="text-xs text-red-500">
                    {errors.title.message}
                  </span>
                )}
              </div>

              {/* Type and Action Type Row */}
              <div className="grid grid-cols-2 gap-4">
                {/* Custom Category Type */}
                <div className="grid gap-2">
                  <Label className="flex items-center gap-1">
                    <Tag size={14} /> Type
                  </Label>
                  <Input placeholder="e.g. Daily" {...register('type')} />
                </div>

                {/* Action Type Selector */}
                <div className="grid gap-2">
                  <Label className="flex items-center gap-1">
                    <Activity size={14} /> Action
                  </Label>
                  <Select
                    value={actionTypeValue}
                    onValueChange={(val: CreateQuestRequestActionTypeEnum) =>
                      setValue('actionType', val)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="input_text">Text Answer</SelectItem>
                      <SelectItem value="quiz">Quiz</SelectItem>
                      <SelectItem value="file_submission">
                        File Upload
                      </SelectItem>
                      <SelectItem value="voice_record">Voice Record</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Reward Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label className="flex items-center gap-1">
                    <Coins size={14} /> Gold
                  </Label>
                  <Input
                    type="number"
                    placeholder="10"
                    {...register('rewardGold', { valueAsNumber: true })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label className="flex items-center gap-1">
                    <Trophy size={14} /> Exp
                  </Label>
                  <Input
                    type="number"
                    placeholder="50"
                    {...register('rewardExp', { valueAsNumber: true })}
                  />
                </div>
              </div>

              {/* Description Field */}
              <div className="grid gap-2">
                <Label htmlFor="desc">Description</Label>
                <Textarea
                  id="desc"
                  placeholder="Detailed instructions..."
                  className="min-h-25"
                  {...register('description')}
                />
              </div>

              {/* Answer Hint Field */}
              <div className="grid gap-2">
                <Label htmlFor="answerHint">Example Answer / Hint</Label>
                <Textarea
                  id="answerHint"
                  placeholder="e.g. Expected format or keywords..."
                  className="min-h-15 text-sm font-mono"
                  {...register('answerHint')}
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting || createQuestMutation.isPending}
                >
                  {isSubmitting || createQuestMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Create Quest'
                  )}
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
