import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const total = await prisma.feedback.count();

    const positive = await prisma.feedback.count({
      where: {
        sentiment: "Positive",
      },
    });

    const neutral = await prisma.feedback.count({
      where: {
        sentiment: "Neutral",
      },
    });

    const negative = await prisma.feedback.count({
      where: {
        sentiment: "Negative",
      },
    });

    return NextResponse.json({
      total,
      positive,
      neutral,
      negative,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}