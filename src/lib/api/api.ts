import {
  QuestControllerApi,
  Configuration,
  AuthControllerApi,
  type LoginResponse,
} from './grimoire_svc'
import { storage } from '@/lib/storage.ts'
import axios from 'axios'
const env = import.meta.env

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use(
  async (config) => {
    // Automatically get the fresh token from storage
    let token = storage.getToken()
    const tokenExp = storage.getTokenExpireTime()
    const currentTime = Date.now() / 1000
    const isTokenExpired = token && tokenExp && tokenExp <= currentTime

    if (isTokenExpired) {
      const refreshToken = storage.getRefreshToken()
      if (refreshToken) {
        try {
          const response = await axios.post(
            `${env.VITE_GRIMOIRE_API_URL}/api/v1/auth/refresh`,
            { refreshToken }
          )
          const refreshData: LoginResponse = response.data.data
          storage.setToken(refreshData.token, refreshData.refreshToken)
          token = refreshData.token
        } catch (error) {
          console.error('Token refresh failed', error)
          storage.clearAuth()
          window.location.href = '/'
          return Promise.reject(error)
        }
      } else {
        storage.clearAuth()
        window.location.href = '/'
      }
    }
    console.log('token in axios interceptor', token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the backend says "401 Unauthorized", force logout
    if (error.response?.status === 401) {
      storage.clearAuth()
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)

const config = new Configuration({
  basePath: env.VITE_GRIMOIRE_API_URL,
})

export const questApi = new QuestControllerApi(config, undefined, axiosInstance)
export const authApi = new AuthControllerApi(config, undefined, axiosInstance)
