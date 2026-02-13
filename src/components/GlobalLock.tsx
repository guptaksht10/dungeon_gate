"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Typography, Button } from "@mui/material";

export default function GlobalLock({
  onRetry,
  reason,
}: {
  onRetry: () => void;
  reason?: string | null;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [pranked, setPranked] = useState(false);
  const [message, setMessage] = useState(
    "Attempt to regain access."
  );

  /* ---------------- PLAY LOCK MUSIC ---------------- */

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    audio.volume = 1;
    audio.loop = true;

    const tryPlay = async () => {
      try {
        await audio.play();
      } catch {
        const unlock = () => {
          audio.play().catch(() => {});
          document.removeEventListener("click", unlock);
          document.removeEventListener("keydown", unlock);
        };

        document.addEventListener("click", unlock);
        document.addEventListener("keydown", unlock);
      }
    };

    tryPlay();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  /* ---------------- PRANK HANDLER ---------------- */

  const handleRetry = () => {
    // First click = prank
    if (!pranked) {
      setPranked(true);

      setMessage("😏 Lol... You thought it was that easy?");

      return;
    }

    // Second click = real
    onRetry();
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        background: "#000",
        color: "#ff3b3b",
        fontFamily: "monospace",
        textAlign: "center",
      }}
    >
      {/* Global Lock Music */}
      <audio
        ref={audioRef}
        src="/sounds/global-lock.mp3"
        preload="auto"
      />

      <Typography fontSize={28} mb={2}>
        🔒 WORLD SEALED
      </Typography>

      <Typography fontSize={14} mb={2} maxWidth={420}>
        Access has been revoked by the Watcher.
        <br />
        No progress. No mercy.
      </Typography>

      {/* Dynamic Message */}
      <Typography
        fontSize={12}
        mb={3}
        sx={{ color: "#ff9999" }}
      >
        {message}
      </Typography>

      {reason && (
        <Typography
          fontSize={11}
          mb={2}
          sx={{ color: "#ff7777", opacity: 0.7 }}
        >
          Reason: {reason}
        </Typography>
      )}

      {/* Prank Button */}
      <Button
        variant="outlined"
        color="error"
        onClick={handleRetry}
        sx={{
          mt: 1,

          "&:hover": {
            boxShadow: "0 0 15px red",
            transform: "scale(1.05)",
          },

          transition: "all 0.2s ease",
        }}
      >
        {pranked ? "Retry Check Status" : "Unlock ME 🔓"}
      </Button>
    </Box>
  );
}
