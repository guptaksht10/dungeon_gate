import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { nick, panicFail } = await req.json();

    if (!nick || !nick.trim()) {
      return NextResponse.json({ ok: false });
    }

    const player = await prisma.player.findUnique({
      where: { nickname: nick },
    });

    if (!player) {
      return NextResponse.json({ ok: false });
    }

    await prisma.player.update({
      where: { nickname: nick },
      data: {
        attempts: {
          increment: 1,
        },

        panicFails: panicFail
          ? { increment: 1 }
          : undefined,
      },
    });

    return NextResponse.json({
      ok: true,
      attempts: player.attempts + 1,
    });
  } catch (err) {
    console.error("ATTEMPT ERROR:", err);

    return NextResponse.json({ ok: false });
  }
}
