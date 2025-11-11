import { SignupForm } from "@/components/auth/signup-form"

export const metadata = {
  title: "Sign Up - Hantly",
  description: "Create your Hantly analytics account",
}

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-4">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Hantly</h1>
          <p className="text-slate-400">Create your account to get started</p>
        </div>
        <SignupForm />
      </div>
    </div>
  )
}
