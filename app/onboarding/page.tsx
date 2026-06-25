'use client'

import { useRouter } from 'next/navigation'
import { OnboardingFlow } from '@/components/onboarding/onboarding-flow'

export default function OnboardingPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-background">
      <OnboardingFlow
        mode="signup"
        onExit={() => router.push('/')}
        // New account starts without an active cupo; the dashboard then prompts
        // the user to complete the credit application (steps 3-6).
        onComplete={() => router.push('/inicio?nuevo=1')}
      />
    </main>
  )
}
