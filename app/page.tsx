import { AppShell } from '@/components/command-center/app-shell'
import { ProgressProvider } from '@/lib/progress-store'

export default function Page() {
  return (
    <ProgressProvider>
      <AppShell />
    </ProgressProvider>
  )
}
