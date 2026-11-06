# Reference: ~/github/paste-mcp (source repo)

Read 2026-10-28. Remote: `https://github.com/AvaTar-ArTs/paste-mcp.git`, head `e5dd2dd`.

## What it is

A small local **MCP app** in front of Paste.app's built-in MCP: one picker widget, two tools.
It is **not** the official Paste server (`pasteapp/paste-mcp`).

```
agent ──> paste-mcp app (127.0.0.1:3847/mcp) ──> Paste built-in MCP (127.0.0.1:39725/mcp) ──> Paste.app db.sqlite
```

| Tool | Upstream Paste call | Shows |
|---|---|---|
| `pick_paste_item` | `search` | picker widget, previews redacted |
| `pick_pinboard` | `list_pinboards` | same picker |

Run: `npm install && npm start` (dev: `npm run dev`). Check: `npx tsc --noEmit`. Paste must be running with MCP on.

## What lives where

| Path | Role |
|---|---|
| `src/server.ts` | Streamable HTTP MCP endpoint, registers the two tools |
| `src/paste-client.ts` | calls Paste's upstream MCP (`PASTE_MCP_URL`) |
| `src/redact.ts` | strips secret-shaped strings from previews |
| `widgets/picker.html` | the MCP Apps picker UI |
| `docs/plans/2026-10-12-paste-cleanup-*.md` | design + implementation plan for paste-cleanup |
| `docs/hooks.md` | Cursor hook notes (innate-workflow, secret prompt block) |
| `docs/SESSION_AUDIT_2026-10-12*.md` | audits of the session that built it |
| `.cursor/` | Cursor integration and safety hooks |

## Relationship to this folder

- The repo holds **source**. Canonical skills/agents live in `~/.agent-skills`: this skill at `skills/paste-mcp/`, its siblings at `skills/paste-cleanup/` and `skills/paste-history-audit/` (flattened to top level 2026-10-28 — Claude Code only discovers `skills/<name>/SKILL.md` one level deep, so nesting them under `paste-mcp/` made them invisible), and their agents at `agents/paste-cleanup.{md,toml}` / `agents/paste-history-audit.{md,toml}`.
- Repo `skills/` and `agents/` copies are still plain files/dirs (not symlinks to the canonical copies) as of 2026-10-28 — conversion proposed but not yet applied; confirm before converting, since it touches a separate git repo.
- The picker (`npm start`, port 3847) is optional; `paste-mcp` (formerly `using-paste-mcp`) works against Paste's own MCP directly.

## Known oddity

`AGENTS.md`, `CLAUDE.md` and `GEMINI.md` in the repo contain an injected
`<!-- PERPLEXITY-MCP-START -->` block describing Perplexity tools; in `CLAUDE.md` that block is the
whole file. It looks auto-added by a Perplexity MCP installer and is unrelated to Paste. Not changed.
