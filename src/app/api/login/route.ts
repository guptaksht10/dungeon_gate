import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { nick } = await req.json();

  const cleanNick = nick?.toLowerCase().trim();
  const secret = process.env.SECRET_NICKNAME?.toLowerCase().trim();

  if (!cleanNick || !secret) {
    return NextResponse.json({ success: false });
  }

  if (cleanNick !== secret) {
    return NextResponse.json({ success: false });
  }

  // Create / Get player
  const player = await prisma.player.upsert({
    where: { nickname: cleanNick },
    update: {},
    create: { nickname: cleanNick },
  });

  if (player.locked) {
    return NextResponse.json({
      success: false,
      locked: true,
    });
  }

  return NextResponse.json({
    success: true,
    level: player.level,
    hearts: player.hearts,
  });
}
