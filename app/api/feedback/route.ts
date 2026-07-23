import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const feedback = await prisma.feedback.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(feedback);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { customer, message, sentiment, rating } = await req.json();

    if (!customer || !message || !sentiment || !rating) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const feedback = await prisma.feedback.create({
      data: {
        customer,
        message,
        sentiment,
        rating: Number(rating),
      },
    });

    return NextResponse.json(
      {
        message: "Feedback submitted successfully!",
        feedback,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    console.log("Deleting ID:", id);

    await prisma.feedback.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Feedback deleted successfully!",
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);

    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 }
    );
  }
}
export async function PUT(req: Request) {
  try {
    const {
      id,
      customer,
      message,
      sentiment,
      rating,
    } = await req.json();

    const updatedFeedback = await prisma.feedback.update({
      where: {
        id,
      },
      data: {
        customer,
        message,
        sentiment,
        rating: Number(rating),
      },
    });

    return NextResponse.json(updatedFeedback);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to update feedback" },
      { status: 500 }
    );
  }
}