import GoogleAuthButton from '@/components/pages/login/GoogleAuthButton.tsx'

export default function LoginPage() {
  return (
    <div className="flex flex-1 w-full items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md">
        <h1 className="text-xl font-bold mb-4">Login</h1>
        <p>Please sign in to continue.</p>
        <GoogleAuthButton />
      </div>
    </div>
  )
}
