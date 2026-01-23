import { createFileRoute } from '@tanstack/react-router'
import { BarcodeScanner } from '~/components/elements/barcode-scanner'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="w-dvw h-dvh flex items-center justify-center">
      <div>
        <BarcodeScanner />
      </div>
    </div>
  )
}
