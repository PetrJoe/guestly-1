import { NextRequest, NextResponse } from "next/server";
import { seedOrganizerWallet } from "@/lib/seedOrganizerWallet";

/**
 * Seed organizer wallet with test data
 * This is for development/testing purposes only
 */
export async function POST(req: NextRequest) {
  const userId = req.cookies.get("user_id")?.value;
  const role = req.cookies.get("role")?.value;

  if (!userId || role !== "organiser") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const wallet = seedOrganizerWallet(userId);
    
    return NextResponse.json({
      success: true,
      data: wallet,
      message: "Organizer wallet seeded with test data",
    });
  } catch (error) {
    console.error("Error seeding organizer wallet:", error);
    return NextResponse.json(
      { success: false, error: "Failed to seed wallet" },
      { status: 500 }
    );
  }
}
