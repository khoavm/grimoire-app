import { useGoogleLogin } from '@react-oauth/google'
import { Button } from '@/components/ui/Button'

// Import the file directly
import googleIcon from '@/assets/icon/google.svg'
import { authApi, questApi } from '@/lib/api/api.ts'
import {
  type OauthLoginRequest,
  OauthLoginRequestAuthProviderEnum,
} from '@/lib/api/grimoire_svc'
import { useAuth } from '@/context/AuthContext.tsx'

const CustomGoogleLogin = () => {
  const { save } = useAuth()
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const requestBody: OauthLoginRequest = {
        authProvider: OauthLoginRequestAuthProviderEnum.Google,
        token: tokenResponse.access_token,
      }
      const {
        data: {
          data: { token, user, refreshToken },
        },
      } = await authApi.login(requestBody)
      save(token, refreshToken, user)
    },
  })

  return (
    <Button
      variant="outline"
      onClick={() => login()}
      className="w-full gap-2 cursor-pointer"
    >
      {/* Use it as a regular image */}
      <img src={googleIcon} alt="Google" className="w-5 h-5" />
      Sign in with Google
    </Button>
  )
}

export default CustomGoogleLogin
