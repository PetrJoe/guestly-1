import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";

export async function GET(req: NextRequest) { return proxy(req, "/vendor/profile/"); }
export async function POST(req: NextRequest) { return proxy(req, "/vendor/profile/"); }
export async function PATCH(req: NextRequest) { return proxy(req, "/vendor/profile/"); }
