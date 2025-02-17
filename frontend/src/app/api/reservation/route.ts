import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const response = await fetch("http://web:5001/api/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json(responseData, { status: 201 });
    } else {
      const errorText = await response.text(); // レスポンスのテキストを取得
      console.error("Error response text:", errorText); // エラーレスポンスをログに出力
      return NextResponse.json(
        { error: errorText || "Failed to create reservation" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Error creating reservation:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const response = await fetch("http://web:5001/api/reservations", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json(responseData, { status: 200 });
    } else {
      const errorText = await response.text(); // レスポンスのテキストを取得
      console.error("Error response text:", errorText); // エラーレスポンスをログに出力
      return NextResponse.json(
        { error: errorText || "Failed to fetch reservations" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
