# Conversation link map — paste-mcp 2026-10-12

When to surface: any Paste MCP, Engram-on-Mac, picker-app, or “what did we miss” question.

## Nodes

| Id | Idea |
|---|---|
| paste-live | Official Paste MCP, 31 pinboards, port ~39725 |
| types | Five item types; MCP authors 3 |
| repo | `~/github/paste-mcp` GitHub AvaTar-ArTs/paste-mcp |
| picker | Tools `pick_paste_item` / `pick_pinboard`, `:3847` |
| skill-gap | Requested local skill never written |
| skills-tree | `~/.agent-skills/skills` 330/308; no paste skill |
| rag | DeepTutor RAG off: no KB, no embeddings |
| memory-hosts | MEMORY.md (Claude large; Codex=codex inode); shared.sqlite |
| engram-remote | Cursor user-engram works |
| engram-local | `~/.local/share/engram/0.5.1` reports 0.3.4; daemon dead |
| engram-not-gentle | Gentleman / gentle-engram ≠ getengram |
| secrets | Clipboard history contains keys; redact always |
| audit | `docs/SESSION_AUDIT_2026-10-12.md` + Engram `conv_vZH4KwKIMM4osK3fY48EY` |

## Edges

- paste-live → types → skill-gap (habit, not new kinds)
- paste-live → picker → repo (wrapper, uncommitted)
- engram-remote ≠ engram-local ≠ engram-not-gentle
- secrets → picker redact + Engram “no secrets”
- compaction C0 ↛ picker (C0 said missing server.ts; C1 disk has it)
- older Engram Homebrew-0.3.4 ↛ engram-local (brew not installed now)
