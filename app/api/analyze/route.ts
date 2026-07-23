import { NextResponse } from "next/server";

const positiveWords = [
  "good",
  "great",
  "excellent",
  "amazing",
  "awesome",
  "love",
  "happy",
  "perfect",
  "fantastic",
  "wonderful",
  "best",
  "nice",
  "fast",
];

const negativeWords = [
  "bad",
  "worst",
  "terrible",
  "awful",
  "hate",
  "poor",
  "slow",
  "disappointed",
  "broken",
  "horrible",
  "useless",
  "angry",
];

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const text = message.toLowerCase();

    let positiveScore = 0;
    let negativeScore = 0;

    positiveWords.forEach((word) => {
      if (text.includes(word)) {
        positiveScore++;
      }
    });

    negativeWords.forEach((word) => {
      if (text.includes(word)) {
        negativeScore++;
      }
    });

    let sentiment = "Neutral";

    if (positiveScore > negativeScore) {
      sentiment = "Positive";
    } else if (negativeScore > positiveScore) {
      sentiment = "Negative";
    }

    return NextResponse.json({ sentiment });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Analysis failed" },
      { status: 500 }
    );
  }
}