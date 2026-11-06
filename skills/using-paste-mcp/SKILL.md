---
name: using-paste-mcp
description: >-
  Use when saving, finding, retrieving or pinning clipboard/pinboard items through
  Paste.app's MCP — or when Paste MCP tools are missing, failing, or need reconnecting.
  Not for bulk history export, inventing new Paste item types, or writing images/files.
---

# using-paste-mcp

connect → search Paste → never echo secrets → create titled text/link/color only → pin to a named private board.

Paste MCP is built into Paste for Mac (6.6+): a local server inside the app at `http://127.0.0.1:<port>/mcp`, nothing online. It is the **live route**: it needs Paste open and MCP enabled, and it can create/pin/title items. For bulk history or export use the **library route** (read Paste's local database read-only; see `paste-history-audit`) — it works when MCP is off.

MCP authors only `text`, `link` and `color` (`#RRGGBB`). Images and files must be copied in-app. Shared pinboards cannot receive new items.

Merged 2026-11-05: this is the single all-around Paste skill; it subsumes the former `paste-mcp` name (its connect/reconnect + library-route guidance and its `references/`). Lineage: `~/github/paste-mcp/skills/using-paste-mcp/`. Host steps: `references/hosts/`.

## When

- User wants a reusable clipboard fill, identity snippet, or pinboard pin.
- Paste MCP tools are available, or the host can add an MCP server (`user-Paste` tools, or `mcp_auth` first if discovery failed).
- Host is Cursor, Claude, or any agent with Paste MCP.

Do not use this skill to dump history, reprint `sk-` / Bearer / `ghp_` strings, or create a new item *kind*.

## Connect (only if Paste tools are missing or failing)

1. Paste → Settings → MCP & AI tools: turn MCP on. Note the **port** shown there — it is a user setting and can change (recently `:39752`); never assume a number.
2. Add the server the way Paste's "Connect AI tool" screen shows for this host (direct HTTP to `127.0.0.1:<port>/mcp`). Host specifics: `references/hosts/<host>.md`.
3. Authenticate through the host's OAuth flow (browser sign-in; `mcp_auth` on `user-Paste` when exposed). Changing the port removes every connected tool — re-add and re-authenticate.
4. Smoke test: `search` with `limit: 1`. Report only id/type — never the content.

## Sequence (required)

1. **search** — no args returns newest (default 20, cap 100, no cursor; narrow with `date_from`/`date_to`, `app`, `type`, `title`, `pinboard_id`). Summarize by `id`, `type`, `title`, pinboard name. Previews that look like API keys become `[redacted]`. Never paste `read_item` bodies matching `sk-`, `sk-proj-`, `ghp_`, `github_pat_`, `xox`, or `Bearer ` into chat, memory stores, or widgets.
2. **list_pinboards** — pick a **private** board by name; create it if absent. Do not write to shared boards (`create_item` with a shared `list_id` is rejected).
3. **create titled text/link/color only** — `create_item` with `content` (URL → link, `#RRGGBB` → color, else text) and `list_id` set to that private pinboard id so it pins in one step. Then `update_item` with a human title (create_item has no title field). `create_item` does not touch the system clipboard. Do not author image/file content.
4. **If the item already exists in history** — `search`, then `add_item_to_pinboard` with `item_id` and `pinboard_id` (idempotent). Still never echo secrets.

Other tools: `read_item` (text may come back truncated — check `truncated`/`totalLength`), `update_item` (title for any item; content only for text/link/color), `rename_pinboard`, `remove_item_from_pinboard` (unpins only), `delete_item`, `delete_pinboard` (keeps its items in history).

Optional picker in the paste-mcp repo: `npm start` → `http://127.0.0.1:3847/mcp` tools `pick_paste_item` / `pick_pinboard` (redacted previews). That is not a substitute for this sequence.

## Hard no

- Echo clipboard secrets into the transcript, Paste titles, memory stores, or git.
- `delete_item` / `delete_pinboard` without an explicit user confirm, then the tool's own `confirm: true`. A call without `confirm` only previews; `delete_item` is permanent.
- Scan all of `~/` to "find" Paste data. Live route = the local MCP; library route = Paste's own database (`paste-history-audit`).
- Hardcode a port in config or notes; read it from Paste's settings.
- Treat `~/github/paste-mcp` (a picker app) or any memory server as the official Paste server. Official parts: the server inside Paste.app, and the bridge `@pasteapp/mcp` (github `pasteapp/paste-mcp`).
