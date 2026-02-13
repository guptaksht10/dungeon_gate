import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    /* ---------------- GET GLOBAL LOCK ---------------- */

    const global = await prisma.globalLock.findFirst();

    if (global?.locked) {
      return NextResponse.json({
        ok: false,
        locked: true,
        reason: global.reason,
      });
    }

    /* ---------------- GET PLAYER ---------------- */

    // For now: latest player
    // (Later you can use nickname/session)
    const player = await prisma.player.findFirst({
      orderBy: {
        updatedAt: "desc",
      },
    });

    if (!player) {
      return NextResponse.json({
        ok: false,
        level: 0,
        hearts: 0,
        locked: false,
      });
    }

    /* ---------------- SUCCESS ---------------- */

    return NextResponse.json({
      ok: true,
      level: player.level,
      hearts: player.hearts,
      locked: player.locked,
      nickname: player.nickname,
    });
  } catch (err) {
    console.error("Progress API Error:", err);

    return NextResponse.json({
      ok: false,
      level: 0,
      hearts: 0,
      locked: false,
    });
  }
}
