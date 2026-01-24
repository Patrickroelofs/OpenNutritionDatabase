"use client";

import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { useEffect, useMemo, useRef } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface BarcodeScannerProps {
  id: string;
  name: string | undefined;
  onBlur: (() => void) | undefined;
  onChange: ((value: string) => void) | undefined;
  value: string;
}

function BarcodeScanner(props: BarcodeScannerProps) {
  const { id, onBlur, onChange, value } = props;

  const readerId = useMemo(() => `${id}-reader`, [id]);

  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const lastDecodedRef = useRef<string | null>(null);

  const onChangeRef = useRef<BarcodeScannerProps["onChange"]>(onChange);
  const onBlurRef = useRef<BarcodeScannerProps["onBlur"]>(onBlur);

  const pendingCleanupRef = useRef<Promise<void> | null>(null);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    onBlurRef.current = onBlur;
  }, [onBlur]);

  useEffect(() => {
    let cancelled = false;

    const start = async (): Promise<void> => {
      // In dev StrictMode, the previous instance may still be cleaning up.
      await pendingCleanupRef.current;

      if (cancelled || scannerRef.current) {
        return;
      }

      document.getElementById(readerId)?.replaceChildren();

      const scanner = new Html5QrcodeScanner(
        readerId,
        {
          fps: 10,
          qrbox: 250,
          formatsToSupport: [Html5QrcodeSupportedFormats.EAN_13],
        },
        true
      );

      scannerRef.current = scanner;

      scanner.render(
        (decodedText) => {
          if (lastDecodedRef.current === decodedText) {
            return;
          }

          lastDecodedRef.current = decodedText;

          onChangeRef.current?.(decodedText);
          onBlurRef.current?.();
        },
        () => {
          // ignore decode errors
        }
      );
    };

    start();

    return () => {
      cancelled = true;

      const activeScanner = scannerRef.current;
      scannerRef.current = null;
      lastDecodedRef.current = null;

      document.getElementById(readerId)?.replaceChildren();

      pendingCleanupRef.current =
        activeScanner?.clear().catch(() => undefined) ?? Promise.resolve();
    };
  }, [readerId]);

  return (
    <Card id={id}>
      <CardHeader>
        <CardTitle>
          {value && <p>Barcode: {value}</p>}
          {!value && <p>No barcode scanned yet</p>}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="scanner" id={readerId} />
      </CardContent>

      <CardFooter>
        <p className="text-muted-foreground text-sm">
          Access to your camera is requested to scan barcodes.
        </p>
      </CardFooter>
    </Card>
  );
}

export { BarcodeScanner };
