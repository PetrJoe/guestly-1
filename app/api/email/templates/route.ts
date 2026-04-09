import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";

export async function GET(req: NextRequest) { return proxy(req, "/email/templates/"); }
export async function POST(req: NextRequest) { return proxy(req, "/email/templates/"); }
