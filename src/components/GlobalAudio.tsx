"use client";

import { useEffect, useRef, useState } from "react";

export default function GlobalAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Wait until client is mounted
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 1;
    audio.loop = true;

    const startAudio = () => {
      audio.play().catch(() => {});
      window.removeEventListener("click", startAudio);
      window.removeEventListener("keydown", startAudio);
    };

    window.addEventListener("click", startAudio);
    window.addEventListener("keydown", startAudio);

    return () => {
      window.removeEventListener("click", startAudio);
      window.removeEventListener("keydown", startAudio);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <audio
      ref={audioRef}
      src="/sounds/ambience.mp4"
      preload="auto"
      hidden
    />
  );
}
