export interface QuestItem {
  id: number
  type: string
  title: string
  description: string
  reward: string
  actionType: 'input_text' | 'check_in' | 'link'
}
