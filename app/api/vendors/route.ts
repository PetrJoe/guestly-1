import { NextRequest, NextResponse } from "next/server";
import { listVendors, type VendorProfile } from "@/lib/store";

/**
 * GET /api/vendors
 * List all vendors with optional filtering by category, location, rating, and search query
 * Supports sorting by rating, popularity, or name
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") as VendorProfile["category"] | null;
    const city = searchParams.get("city") as VendorProfile["city"] | null;
    const minRating = searchParams.get("minRating");
    const sortBy = searchParams.get("sortBy") as "rating" | "popularity" | "name" | null;
    const q = searchParams.get("q") || undefined;

    const vendors = listVendors({
      category: category || undefined,
      city: city || undefined,
      minRating: minRating ? parseFloat(minRating) : undefined,
      sortBy: sortBy || undefined,
      q,
    });

    // Only return approved vendors for public listing
    const approvedVendors = vendors.filter((v) => v.status === "approved");

    return NextResponse.json({
      success: true,
      data: approvedVendors,
    });
  } catch (error) {
    console.error("Error listing vendors:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "VENDOR_LIST_ERROR",
          message: "Failed to list vendors",
        },
      },
      { status: 500 }
    );
  }
}
