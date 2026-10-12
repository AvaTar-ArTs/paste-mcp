# Learned context — paste-mcp

Last updated: 2026-10-12. Cache, not source of truth. Authority: live Paste MCP + this repo’s source.

## Terminology

- **Official Paste MCP** — Paste.app local HTTP (default `http://127.0.0.1:39725/mcp`), Cursor namespace `user-Paste`.
- **This repo (`paste-mcp`)** — local MCP **app** (widget picker) wrapping that server. Not `pasteapp/paste-mcp`.
- **Paste types** — `text`, `link`, `color` (`#RRGGBB`), `image`, `file`. MCP `create_item` authors only the first three.
- **Engram (getengram.app)** — cloud memory MCP `https://mcp.getengram.app/mcp`. Distinct from Gentleman-Programming/engram and npm `gentle-engram`.
- **Previous selves** — compaction summaries, Engram older chunks, this session’s jsonl. Compare before trusting the last summary.

## Decisions

- Custom “items” = titled fills on **private** pinboards, not new Paste types.
- Never echo secrets from clipboard history into chat, widgets, or Engram memory.
- Cursor Engram is remote MCP (`~/.cursor/mcp.json`); local auto-capture daemon is dead (ABI 147).
- Do not install gentle-engram unless the user explicitly wants that other product.
- Git remote is `https://github.com/AvaTar-ArTs/paste-mcp.git`; first commit `5c046fe` is README-only.

- Cursor **project** hooks in `.cursor/hooks.json` (paste-safety) plus **user** `~/.cursor/hooks/innate-workflow.py` encode the innate sequential loop. Orca hooks stay in place. Not Codex plugin format.
- Compaction `preCompact` toast: treat the summary as a previous self; re-read `docs/SESSION_AUDIT_2026-10-12.md`.

## Patterns

- Picker widget for long clipboard lists; redact `sk-` / Bearer-shaped strings in previews.
- eza for trees, rg for content; do not glob all of home.
- Named Cursor subagent models fail on Free (“use Auto”); parent must finish bounded work.
- A host’s AGENTS.md / Superpowers copy is not its runtime. Only a settings/hooks.json entry that names a script that executes counts. Do not open another sibling tree (`~/.qwen`, `~/.gemini`, `~/iterm2`, …) while a user-named skill is still unwritten — park the skill explicitly or write it first.

- Sibling runtimes are **not the same system**. `~/.Codex` ≡ `~/.codex` (same inode). Skills canonical: `~/.agent-skills`. Hooks that actually fire: Cursor (Orca + innate), Codex (capability-continuity + NotchBar), Claude (cc-status + discover-first/claude-context), Gemini (Orca Before/After Agent/Tool). Qwen/Grok/Hermes/OpenCode: docs or copies, weak/no event wiring. mcPHooker unwired; Gemini `logs/tool-use.jsonl` is the large tool log.
- `~/iterm2` is the **terminal/WorkVault git repo**, not a live host. Nested `superpowers/` is Obra v4.3.0 (own git). `using-superpowers` has **four inodes** (iterm2/superpowers, iterm2/skills, agent-skills, cursor/skills) — copies, not one symlink. `agent_ops` is Gemini-shaped telemetry like mcPHooker. Repo-local `.codex/hooks.json` is for Codex *inside this repo*, distinct from `~/.Codex/hooks.json`.

## Open

- Picker sources are on `cursor/paste-mcp-picker-hooks-audit` (pushed; no PR unless asked).
- `using-paste-mcp` skill written 2026-10-12 at `skills/using-paste-mcp/` (repo) and `~/.agent-skills/skills/using-paste-mcp/`.
- Point a Cursor server at `http://127.0.0.1:3847/mcp` when running `npm start`.
- Pinboard hygiene (Untitled merge, empty boards, HandOff) lives in Paste, not this repo.
