"use client";

import { useEffect, useState } from "react";
import GlobalLock from "./GlobalLock";

export default function LockWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locked, setLocked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reason, setReason] = useState<string | null>(null);

  const check = async () => {
  try {
    const res = await fetch("/api/status");

    if (!res.ok) {
      throw new Error("Bad response");
    }

    const data = await res.json();

    setLocked(!!data.locked);
    setReason(data.reason || null);
  } catch (err) {
    console.error("LOCK CHECK FAILED:", err);

    // Fail safe: unlock if error
    setLocked(false);
    setReason(null);
  } finally {
    setLoading(false);
  }
};



  useEffect(() => {
    check();
  }, []);

  if (loading) return null;

  if (locked) {
  return <GlobalLock reason={reason} onRetry={check} />;
}


  return <>{children}</>;
}
