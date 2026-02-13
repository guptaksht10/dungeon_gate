import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { reason } = await req.json();

    await prisma.globalLock.upsert({
      where: { id: "global" },
      update: {
        locked: true,
        reason,
      },
      create: {
        id: "global",
        locked: true,
        reason,
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
