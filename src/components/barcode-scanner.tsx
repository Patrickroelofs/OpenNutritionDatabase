"use client";

import { BarcodeIcon } from "@phosphor-icons/react/dist/ssr";
import type { IScannerControls } from "@zxing/browser";
import {
  BarcodeFormat,
  BrowserMultiFormatReader,
  DecodeHintType,
  type Result,
} from "@zxing/library";
import { useCallback, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";

interface BarcodeScannerProps {
  id: string;
  onScan: (code: string) => void;
  onError?: (error: unknown) => void;
  setShowScanner: (show: boolean) => void;
  showScanner: boolean;
}

function BarcodeScanner({
  id,
  onScan,
  onError,
  setShowScanner,
  showScanner,
}: BarcodeScannerProps) {
  const isMobile = useIsMobile();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // biome-ignore lint/suspicious/noConfusingVoidType: required to match IScannerControls | null
  const controlsRef = useRef<IScannerControls | void | null>(null);
  const codeReader = useRef<BrowserMultiFormatReader>(
    new BrowserMultiFormatReader()
  );

  // Prepare hints once when reader is created
  const setHints = useCallback(() => {
    const hints = new Map<DecodeHintType, unknown>();
    hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.EAN_13]);
    codeReader.current.hints = hints;
  }, []);

  const stopScanning = useCallback(() => {
    if (controlsRef.current) {
      controlsRef.current.stop();
      controlsRef.current = null;
    } else {
      codeReader.current.reset();
    }
  }, []);

  const startScanning = useCallback(async () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    setHints();

    try {
      const devices = await codeReader.current.listVideoInputDevices();
      const rearCamera = devices.find((d) =>
        d.label.toLowerCase().includes("back")
      );
      const deviceId = rearCamera ? rearCamera.deviceId : undefined;

      const constraints: MediaStreamConstraints = {
        video: {
          deviceId: deviceId ? { ideal: deviceId } : undefined,
          facingMode: deviceId ? undefined : { ideal: "environment" },
          frameRate: { ideal: 10, max: 15 },
        },
      };

      controlsRef.current = await codeReader.current.decodeFromConstraints(
        constraints,
        video,
        (result: Result | null, err: unknown) => {
          if (result) {
            onScan(result.getText());
          }

          const name =
            typeof err === "object" && err && "name" in err
              ? (err.name as string | undefined)
              : undefined;

          if (err && name !== "NotFoundException" && onError) {
            onError(err);
          }
        }
      );
    } catch (err) {
      if (onError) {
        onError(err);
      }
    }
  }, [onScan, onError, setHints]);

  useEffect(() => {
    if (showScanner) {
      if (videoRef.current) {
        startScanning();
      }
    } else {
      stopScanning();
    }

    return () => {
      stopScanning();
    };
  }, [showScanner, startScanning, stopScanning]);

  const handleVideoRef = useCallback(
    (node: HTMLVideoElement | null) => {
      videoRef.current = node;
      if (node && showScanner) {
        startScanning();
      }
    },
    [showScanner, startScanning]
  );

  if (isMobile) {
    return (
      <Drawer onOpenChange={setShowScanner} open={showScanner}>
        <DrawerTrigger asChild>
          <Button type="button" variant="outline">
            <BarcodeIcon />
            Open Barcode Scanner
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <Card className="max-w-lg">
            <CardContent className="flex items-center justify-center">
              <video
                className="aspect-square h-64 w-64 rounded-2xl border-2 object-cover"
                id={id}
                muted
                playsInline
                ref={handleVideoRef}
              />
            </CardContent>
          </Card>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog onOpenChange={setShowScanner} open={showScanner}>
      <DialogTrigger
        render={
          <Button type="button" variant="outline">
            <BarcodeIcon />
            Open Barcode Scanner
          </Button>
        }
      />
      <DialogContent className="flex items-center justify-center">
        <video
          className="aspect-square h-64 w-64 rounded-2xl border-2 object-cover"
          id={id}
          muted
          playsInline
          ref={handleVideoRef}
        />
      </DialogContent>
    </Dialog>
  );
}

export { BarcodeScanner };
