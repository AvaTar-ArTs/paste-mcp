---
name: using-paste-mcp
description: >-
  Use when saving or retrieving clipboard/pinboard items via Paste MCP: search
  Paste, never echo secrets, create titled text/link/color only, pin to a named
  private board. Not for inventing new Paste types or writing images/files.
---

# using-paste-mcp

search Paste → never echo secrets → create titled text/link/color only → pin to a named private board.

This is not an official Paste feature. Official MCP authors only `text`, `link`, and `color` (`#RRGGBB`). Images and files must be copied in-app. Shared pinboards are not writable.

## When

- User wants a reusable clipboard fill, identity snippet, or pinboard pin.
- `user-Paste` tools are available (or `mcp_auth` first if discovery failed).
- Host is Cursor, Claude, or any agent with Paste MCP.

Do not use this skill to dump history, reprint `sk-` / Bearer / `ghp_` strings, or create a new item *kind*.

## Sequence (required)

1. **Authenticate** if tools are unavailable: `mcp_auth` on `user-Paste`.
2. **search** — `search` with a query, or no args for newest. Summarize by `id`, `type`, `title`, pinboard name. Previews that look like API keys become `[redacted]`. Never paste `read_item` bodies that match `sk-`, `sk-proj-`, `ghp_`, `github_pat_`, `xox`, or `Bearer ` into chat, Engram memory, or widgets.
3. **list_pinboards** — pick a **private** board by name. If it does not exist, `create_pinboard` with that name. Do not write to shared boards (`list_id` / pin tools reject them).
4. **create titled text/link/color only** — `create_item` with `content` (URL → link, `#RRGGBB` → color, else text) and `list_id` set to that private pinboard id so it pins in one step. Then `update_item` with a human title (create_item has no title field). Do not `create_item` image or file content; MCP cannot author those.
5. **If the item already exists in history** — `search`, then `add_item_to_pinboard` with `item_id` and `pinboard_id`. Still never echo secrets.

Optional picker in this repo: `npm start` → `http://127.0.0.1:3847/mcp` tools `pick_paste_item` / `pick_pinboard` (redacted previews). That is not a substitute for this sequence.

## Hard no

- Echo clipboard secrets into the transcript, Paste titles, Engram `append_messages`, or git.
- `delete_item` / `delete_pinboard` without an explicit user confirm, then the tool’s own `confirm: true`.
- Scan all of `~/` to “find” Paste data. Paste MCP is local HTTP (~39725).
- Treat Gentleman/`gentle-engram` or this repo as the official Paste server (`pasteapp/paste-mcp`).
