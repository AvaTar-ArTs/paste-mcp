# Cursor hooks (paste-mcp + user innate-workflow)

Codex plugin `hooks.json` format was **not** copied here. This host is Cursor. Orca entries in `~/.cursor/hooks.json` were preserved.

## User (`~/.cursor/hooks/innate-workflow.py`)

Sequential innate loop injected at `sessionStart` and first `beforeSubmitPrompt` (Agents Window workaround).

| Event | Behavior | Fail |
|---|---|---|
| sessionStart | Inject loop + 2026-10-12 hard rules | open |
| beforeSubmitPrompt | Same inject once; **block** prompts that look like API keys | open except deny |
| beforeShellExecution | Deny `git init` in nocturneMelodies; **ask** on `ls` and unbounded `find ~` | open |
| afterMCPExecution | Paste servers: remind not to quote secrets | open |
| postToolUseFailure | Named-model Free-plan error → parent inherit/Auto | open |
| subagentStop | One follow-up if named-model abort (`loop_limit` 1) | open |
| preCompact | User toast: compaction is a previous self; re-read audit docs | open |
| stop | No auto-loop (`loop_limit` 0) | open |

## Project (`.cursor/hooks/paste-safety.py`)

| Event | Behavior | Fail |
|---|---|---|
| beforeReadFile | Deny `.env` (not `.env.example`) | **closed** |
| beforeMCPExecution | Deny create/update that looks like a secret | **closed** |
| afterMCPExecution | Id/type/title only | open |

Reload: Cursor watches `hooks.json`. If they do not appear, restart Cursor and check the Hooks settings tab.

Workflow skeleton: `docs/workflows/innate-paste-session.json` (sequential, not an orchestrator).
