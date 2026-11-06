# Session audit — 2026-10-12

Transcript: [paste-mcp Cursor chat](72cecc98-4bfa-4f60-9af8-68cfa3164e9d)
Compaction: `~/.cursor/projects/Users-steven-github-paste-mcp/agent-transcripts/72cecc98-4bfa-4f60-9af8-68cfa3164e9d/compaction/segment_000.md`
Engram checkpoint: `conv_vZH4KwKIMM4osK3fY48EY` (no secrets)

This file is a **save point**. Compaction Self-0 claimed the picker app was unfinished; disk after the fork shows it is present and uncommitted.

## Intents in order (user, not harness)

| # | Ask | Outcome vs later selves |
|---|---|---|
| 1 | `/mcp paste` | Live Paste MCP after auth. 31 pinboards. Do not reprint history secrets. |
| 2 | Custom items via innate-workflow + find-skills | Five types; MCP authors text/link/color only. Habit = skill, not a new Paste kind. |
| 3 | GitHub first-commit paste-mcp | Must not init in nocturneMelodies. `mkdir -p ~/github/paste-mcp`; commit `5c046fe` pushed. |
| 4 | Repeatable skill: search → never echo secrets → titled text/link/color → private pin | **Not written.** TDD/writing-skills interrupted. |
| 5 | `/writing-skills` then explore `~/.agent-skills/skills` with eza-nav | Partial map (330 dirs / 308 SKILL.md). Named-model agents failed; one explorer used `ls` then aborted. |
| 6 | Same for `~/.agent-skills/agents` | 243 names, 12 packs, 110 md+toml; no paste agent. |
| 7 | `/deep-research` agents/skills/hooks/plugins then MCP | DeepTutor outline-only; RAG off. |
| 8 | Why RAG disabled; bounded investigator; MEMORY.md + sqlite | Host MEMORY.md inventory; `shared.sqlite` decision `paste-mcp-custom-items`. |
| 9 | Engram vs Engram MCP; `/add-plugin engram` | No Cursor marketplace plugin. Wired `~/.cursor/mcp.json` (backup `*.bak-20261012-003104`). Remote MCP works. |
| 10 | `/build-mcp-app` + multitask | Fork built picker; smoke: redact ok; long-running listen killed as “failed”. |
| 11 | Intel install table | **getengram ≠ Gentleman / gentle-engram.** Do not install the latter as the former. |
| 12 | Find Engram on this Mac | User-local CLI 0.5.1 reporting 0.3.4; brew formula **not** installed; tap untrusted 0.6.0; daemon ABI 147 dead. |
| 13 | This audit vs previous selves | This document + Engram + canvas. |

## Checkpoints (reference)

- **C0 compaction** — picker “without src/server.ts”; latest user ask = find Engram. **Superseded** by fork + later turns.
- **C1 disk now** — `src/server.ts`, `src/redact.ts`, `src/paste-client.ts`, `widgets/picker.html` exist; `npm start` → `:3847/mcp`; git dirty vs `5c046fe`.
- **C2 Engram older memory** (`conv_OgxnpZVF…`) — claimed Homebrew 0.3.4 + crash-loop. **Superseded:** cellar 0.5.0 gone; PATH is `~/.local/share/engram/0.5.1`; brew not installed.
- **C3 nocturne learned-context 2026-10-12** — Paste types + pinboard-fill opens still valid; picker app not mentioned there until this audit’s sibling edit.

## Missed (still open)

1. `using-paste-mcp` local skill (the actual requested habit).
2. Pinboard fills: identity/spec, refresh HandOff (2025-era), empty `deepseek`/`UserScript`, merge two Untitled. Never store secrets.
3. Commit/push picker (user did not ask).
4. DeepTutor KB + embedding so RAG can turn on.
5. Engram daemon rebuild for Node ABI 147 **or** `brew trust get-engram/engram` for 0.6.0 — user pick.
6. Project `.cursor/mcp.json` is `{}`; README documents mcp-remote. Host Cursor already has **user-Paste** + **user-engram**, not this app.
7. Duplicate `engram-mcp` skill copies (agent-skills vs `~/.cursor/skills`, different inodes).
8. Subagent `acc16fc1` aborted; used `ls` against eza-nav rule.

- Cursor hooks (2026-10-12): user `innate-workflow.py` + project `paste-safety.py`. See `docs/hooks.md`.

## Do not

- Echo clipboard `sk-` / Bearer strings (history already contains them).
- Treat Gentleman-Programming/engram or npm `gentle-engram` as getengram.app.
- Scan all of `~/`.
- `git init` inside nocturneMelodies.
