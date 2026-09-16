"use client";

import { useEffect, useRef, useState } from "react";
import { DotLottie } from "@lottiefiles/dotlottie-web";

type LottieStatusType = "queued" | "processing" | "extracted" | "failed";

interface LottieStatusProps {
  status: LottieStatusType;
  size?: number;
  className?: string;
}

const DOTLOTTIE_URL = "/lottie/ai-robot.lottie";
let cachedData: ArrayBuffer | null = null;
let cachePromise: Promise<ArrayBuffer | null> | null = null;

function fetchDotLottieData(): Promise<ArrayBuffer | null> {
  if (cachedData) return Promise.resolve(cachedData);
  if (cachePromise) return cachePromise;

  cachePromise = fetch(DOTLOTTIE_URL)
    .then((res) => (res.ok ? res.arrayBuffer() : null))
    .then((buf) => {
      if (buf) cachedData = buf;
      return buf;
    })
    .catch(() => null);

  return cachePromise;
}

export function LottieStatus({
  status,
  size = 120,
  className,
}: LottieStatusProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotLottieRef = useRef<DotLottie | null>(null);
  const statusRef = useRef(status);
  const failedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [ready, setReady] = useState(() => !!cachedData);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    if (ready) return;
    fetchDotLottieData().then(() => setReady(true));
  }, [ready]);

  useEffect(() => {
    if (!ready || !canvasRef.current || !cachedData) return;

    const dotLottie = new DotLottie({
      canvas: canvasRef.current,
      data: cachedData,
      autoplay: true,
      loop: true,
    });

    dotLottieRef.current = dotLottie;

    dotLottie.addEventListener("load", () => {
      dotLottie.stateMachineLoad("StateMachine1");
      dotLottie.stateMachineStart();
    });

    return () => {
      if (failedTimerRef.current) clearTimeout(failedTimerRef.current);
      dotLottie.destroy();
    };
  }, [ready]);

  useEffect(() => {
    const dotLottie = dotLottieRef.current;
    if (!dotLottie) return;

    const stateMap: Record<string, string> = {
      queued: "idle",
      processing: "thinking",
      extracted: "yes",
      failed: "alert",
    };

    const targetState = stateMap[status];
    if (targetState) {
      dotLottie.stateMachineOverrideState(targetState, true);
    }

    if (failedTimerRef.current) clearTimeout(failedTimerRef.current);

    if (status === "failed") {
      failedTimerRef.current = setTimeout(() => {
        dotLottie.stateMachineOverrideState("no", true);
      }, 1500);
    }
  }, [status]);

  useEffect(() => {
    const dotLottie = dotLottieRef.current;
    if (!dotLottie) return;

    const handleStateEntered = (e: { state: string }) => {
      if (
        e.state === "idle" &&
        (statusRef.current === "queued" || statusRef.current === "processing")
      ) {
        dotLottie.stateMachineOverrideState("thinking", true);
      }
    };

    dotLottie.addEventListener("stateMachineStateEntered", handleStateEntered);

    return () => {
      dotLottie.removeEventListener(
        "stateMachineStateEntered",
        handleStateEntered,
      );
    };
  }, []);

  if (!ready) {
    return <div style={{ width: size, height: size }} />;
  }

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size, pointerEvents: "none" }}
    />
  );
}
