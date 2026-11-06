import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import {
  RESOURCE_MIME_TYPE,
  registerAppResource,
  registerAppTool,
} from "@modelcontextprotocol/ext-apps/server";
import { z } from "zod";
import { listPastePinboards, searchPasteItems } from "./paste-client.js";
import { redactPreview } from "./redact.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const bundle = readFileSync(
  require.resolve("@modelcontextprotocol/ext-apps/app-with-deps"),
  "utf8",
).replace(/export\{([^}]+)\};?\s*$/, (_, body: string) =>
  "globalThis.ExtApps={" +
    body
      .split(",")
      .map((pair) => {
        const [local, exported] = pair.split(" as ").map((s) => s.trim());
        return `${exported ?? local}:${local}`;
      })
      .join(",") +
    "};",
);

const pickerHtml = readFileSync(join(__dirname, "../widgets/picker.html"), "utf8").replace(
  "/*__EXT_APPS_BUNDLE__*/",
  () => bundle,
);

type PickerItem = {
  id: string;
  kind: string;
  label: string;
  sub: string;
  redacted: boolean;
  note?: string;
};

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function pickerPayload(items: PickerItem[], note: string, error?: string) {
  return JSON.stringify({ items, note, error });
}

function fromSearch(raw: unknown): PickerItem[] {
  const rec = asRecord(raw);
  const list = Array.isArray(raw) ? raw : Array.isArray(rec?.items) ? rec.items : [];
  return list.slice(0, 40).map((row, i) => {
    const item = asRecord(row) ?? {};
    const id = String(item.id ?? `item-${i}`);
    const type = String(item.type ?? "text");
    const preview = String(item.preview ?? item.title ?? "");
    const { preview: safe, redacted } = redactPreview(preview);
    const app = item.app ? String(item.app) : "";
    return {
      id,
      kind: "item",
      label: `${type}${app ? ` · ${app}` : ""}`,
      sub: safe || id,
      redacted,
    };
  });
}

function fromPinboards(raw: unknown): PickerItem[] {
  const rec = asRecord(raw);
  const list = Array.isArray(raw)
    ? raw
    : Array.isArray(rec?.pinboards)
      ? rec.pinboards
      : [];
  return list.map((row, i) => {
    const board = asRecord(row) ?? {};
    const id = String(board.id ?? `board-${i}`);
    const name = String(board.name ?? "Untitled");
    const count = board.itemCount ?? board.item_count ?? "";
    return {
      id,
      kind: "pinboard",
      label: name,
      sub: count === "" ? id : `${count} items · ${id}`,
      redacted: false,
    };
  });
}

function createServer(): McpServer {
  const server = new McpServer({ name: "paste-mcp", version: "0.1.0" });

  registerAppResource(server, "Paste picker", "ui://widgets/picker.html", {}, async () => ({
    contents: [
      {
        uri: "ui://widgets/picker.html",
        mimeType: RESOURCE_MIME_TYPE,
        text: pickerHtml,
      },
    ],
  }));

  registerAppTool(
    server,
    "pick_paste_item",
    {
      description:
        "Opens an interactive picker of Paste clipboard/history items. Use when the user should choose one saved item. Previews redact API-key-shaped strings. Returns JSON items for hosts without widgets.",
      inputSchema: {
        query: z.string().optional().describe("Free-text search; omit for newest items"),
        limit: z.number().int().min(1).max(40).optional(),
      },
      _meta: { ui: { resourceUri: "ui://widgets/picker.html" } },
    },
    async ({ query, limit }) => {
      try {
        const raw = await searchPasteItems(query, limit ?? 20);
        const items = fromSearch(raw);
        const note = `${items.length} Paste item(s). Click one. Secrets in previews are redacted.`;
        return { content: [{ type: "text", text: pickerPayload(items, note) }] };
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return {
          content: [
            {
              type: "text",
              text: pickerPayload([], "Paste MCP unreachable.", message),
            },
          ],
          isError: true,
        };
      }
    },
  );

  registerAppTool(
    server,
    "pick_pinboard",
    {
      description:
        "Opens an interactive picker of Paste pinboards. Use when the user should choose a named private board to pin to or inspect.",
      inputSchema: {},
      _meta: { ui: { resourceUri: "ui://widgets/picker.html" } },
    },
    async () => {
      try {
        const raw = await listPastePinboards();
        const items = fromPinboards(raw);
        const note = `${items.length} pinboard(s). Click one.`;
        return { content: [{ type: "text", text: pickerPayload(items, note) }] };
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return {
          content: [
            {
              type: "text",
              text: pickerPayload([], "Paste MCP unreachable.", message),
            },
          ],
          isError: true,
        };
      }
    },
  );

  return server;
}

const app = express();
app.use(express.json({ limit: "2mb" }));

app.post("/mcp", async (req, res) => {
  const server = createServer();
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
  res.on("close", () => {
    void transport.close();
  });
  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
});

const port = Number(process.env.PORT ?? 3847);
app.listen(port, () => {
  console.log(`paste-mcp app listening on http://127.0.0.1:${port}/mcp`);
});
