import { QuestControllerApi, Configuration } from '@/api/grimoire_svc'
const env = import.meta.env
// We point this to your Spring Boot backend
const config = new Configuration({
  basePath: env.VITE_GRIMOIRE_API_URL,
})

export const questApi = new QuestControllerApi(config)
