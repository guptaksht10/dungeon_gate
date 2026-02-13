import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { nick } = await req.json();

    if (!nick || !nick.trim()) {
      return NextResponse.json({ success: false });
    }

    const cleanNick = nick.toLowerCase().trim();

    /* ---------- FIND PLAYER ---------- */

    const player = await prisma.player.findUnique({
      where: { nickname: cleanNick },
    });

    if (!player) {
      return NextResponse.json({ success: false });
    }

    /* ---------- ALREADY LOCKED ---------- */

    if (player.locked) {
      return NextResponse.json({
        success: true,
        hearts: player.hearts,
        locked: true,
      });
    }

    /* ---------- HEART LOGIC ---------- */

    const newHearts = Math.max(player.hearts - 1, 0);
    const shouldLock = newHearts <= 0;

    await prisma.player.update({
      where: { nickname: cleanNick },
      data: {
        hearts: newHearts,
        locked: shouldLock,
      },
    });

    return NextResponse.json({
      success: true,
      hearts: newHearts,
      locked: shouldLock,
    });

  } catch (err) {
    console.error("WRONG ANSWER ERROR:", err);

    return NextResponse.json({ success: false });
  }
}
