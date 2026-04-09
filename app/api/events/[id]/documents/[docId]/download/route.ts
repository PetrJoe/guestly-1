import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";
type Params = { id: string; docId: string };

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id, docId } = await params;
  const res = await proxy(req, `/events/${id}/documents/${docId}/`);
  const data = await res.json().catch(() => ({}));
  // Return file_url for download
  return Response.json({ url: data.file_url ?? data.url ?? "", ...data });
}
