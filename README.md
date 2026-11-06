# paste-mcp

Local **MCP app** (tools + picker widget) in front of [Paste](https://pasteapp.io)’s built-in MCP. One widget, two tools: pick a clipboard item, or pick a pinboard. Previews redact API-key-shaped strings. This is not the official Paste server (`pasteapp/paste-mcp`).

## Why a widget

Clipboard history is a long list the model should not dump or rank blindly. A picker is the right surface. Hosts without the apps UI still get the same JSON.

## Run

```bash
cp .env.example .env   # optional
npm install
npm start
```

Default: `http://127.0.0.1:3847/mcp` → talks to Paste at `PASTE_MCP_URL` (`http://127.0.0.1:39725/mcp`). Paste must be running with MCP enabled.

Cursor `mcp.json` (stdio wrapper for widget capability negotiation):

```json
{
  "mcpServers": {
    "paste-mcp-app": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "http://127.0.0.1:3847/mcp",
        "--allow-http",
        "--transport",
        "http-only"
      ]
    }
  }
}
```

Or point `url` at `http://127.0.0.1:3847/mcp` the same way as the official Paste connector.

## Tools

| Tool | Widget | Upstream |
|---|---|---|
| `pick_paste_item` | picker | Paste `search` |
| `pick_pinboard` | same picker | Paste `list_pinboards` |

Does not create images/files (Paste MCP cannot author those). Does not echo secrets in the picker subtitle.

## Env

See `.env.example`. Do not commit tokens.
