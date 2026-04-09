import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";

export async function GET(req: NextRequest) { return proxy(req, "/merch/products/"); }
export async function POST(req: NextRequest) { return proxy(req, "/merch/products/"); }
