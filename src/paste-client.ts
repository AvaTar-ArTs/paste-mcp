type JsonRpcResult = {
  result?: unknown;
  error?: { code: number; message: string };
};

async function pasteCall(method: string, args: Record<string, unknown> = {}): Promise<unknown> {
  const url = process.env.PASTE_MCP_URL ?? "http://127.0.0.1:39725/mcp";
  const token = process.env.PASTE_MCP_TOKEN ?? "";
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers.Authorization = token.startsWith("Bearer ") ? token : `Bearer ${token}`;

  const body = {
    jsonrpc: "2.0",
    id: 1,
    method: "tools/call",
    params: { name: method, arguments: args },
  };

  const res = await fetch(url, { method: "POST", headers, body: JSON.stringify(body) });
  if (!res.ok) {
    throw new Error(`Paste MCP HTTP ${res.status} ${res.statusText}`);
  }
  const json = (await res.json()) as JsonRpcResult;
  if (json.error) {
    throw new Error(json.error.message);
  }
  const result = json.result as { content?: Array<{ type: string; text?: string }> } | undefined;
  const text = result?.content?.find((c) => c.type === "text")?.text;
  if (!text) return json.result;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export async function searchPasteItems(query?: string, limit = 20): Promise<unknown> {
  const args: Record<string, unknown> = { limit };
  if (query) args.query = query;
  return pasteCall("search", args);
}

export async function listPastePinboards(): Promise<unknown> {
  return pasteCall("list_pinboards", {});
}
