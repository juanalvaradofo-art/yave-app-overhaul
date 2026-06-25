'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { OnboardingFlow } from '@/components/onboarding/onboarding-flow'
import { useYave } from '@/lib/yave-store'

export function ApplicationOverlay({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const { setCreditStatus } = useYave()

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-background"
        >
          <OnboardingFlow
            mode="application"
            onExit={onClose}
            onComplete={() => {
              setCreditStatus('pending')
              onClose()
            }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
