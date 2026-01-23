import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from 'html5-qrcode'
import { useEffect, useState } from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Button } from '../ui/button'

function BarcodeScanner() {
  const [currentScan, setCurrentScan] = useState<string | null>(null)

  useEffect(() => {
    if (currentScan !== null) return

    const scanner = new Html5QrcodeScanner(
      'reader',
      {
        fps: 10,
        qrbox: 250,
        formatsToSupport: [Html5QrcodeSupportedFormats.EAN_13],
      },
      true,
    )

    scanner.render(
      (decodedText) => {
        setCurrentScan(decodedText)
        scanner.clear()
      },
      (error) => {
        console.log('Scan error:', error)
      },
    )

    return () => {
      scanner.clear().catch(() => {})
    }
  }, [currentScan])

  return (
    <div className="w-dvw h-dvh flex items-center justify-center">
      <div>
        <Card className="w-lg">
          <CardHeader>
            <CardTitle>
              <p>{currentScan}</p>
            </CardTitle>
            <CardAction>
              <Button onClick={() => setCurrentScan(null)}>
                Scan new Barcode
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>{!currentScan && <div id="reader" />}</CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              Access to your camera is requested to scan barcodes.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export { BarcodeScanner }
