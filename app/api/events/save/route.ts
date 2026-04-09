import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";
export async function GET(req: NextRequest) { return proxy(req, "/events/save/"); }
export async function POST(req: NextRequest) { return proxy(req, "/events/save/"); }
export async function DELETE(req: NextRequest) { return proxy(req, "/events/save/"); }
