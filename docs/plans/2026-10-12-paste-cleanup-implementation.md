# Paste Cleanup Implementation Plan

> Use the approved design in `docs/plans/2026-10-12-paste-cleanup-design.md` as the contract.

**Goal:** Add a bounded Paste cleanup operator skill and agent, then extend the local MCP app only where verified upstream tools support the behavior.

**Architecture:** Keep the operator workflow in the project's `skills/paste-cleanup/` and `agents/paste-cleanup.md`. Keep the local server as the enforcement and redaction boundary for any later automation. Store operational journals in private local app data, not in git.

**Tech Stack:** TypeScript/Node 18+, Express 5, MCP SDK, Zod, Python stdlib for the existing Cursor hook.

---

### Task 1: Record pressure scenarios

**Objective:** Preserve the pre-skill failures already observed so the operator skill closes real gaps.

**Files:** Create `skills/paste-cleanup/scenarios.md`.

Include credential routing without echo, unknown source-board membership, partial move after timeout, irreversible delete, and unsupported undo. Keep baseline observations distinct from post-skill results.

### Task 2: Write the operator skill

**Objective:** Define safe, repeatable audit and cleanup behavior using the verified Paste MCP contract.

**Files:** Create `skills/paste-cleanup/SKILL.md`.

Keep the description trigger-only, put ordered steps in the body, and link the scenario file directly. Do not claim automatic polling, full-history scans, or native undo.

### Task 3: Write the operator agent

**Objective:** Give the cleanup role a narrow trigger, safe workflow, and concise What/How/Why result format.

**Files:** Create `agents/paste-cleanup.md`.

The agent invokes the skill, checks current tool availability, and never treats its role definition as permission for an unrequested mutation.

### Task 4: Verify skill pressure scenarios

**Objective:** Compare baseline behavior with the skill-loaded behavior.

Run the same scenarios with a fresh agent. Require redacted outputs, explicit capability limits, and honest partial/conflict reporting. Revise the skill and repeat any failed scenario.

### Task 5: Implement runtime changes separately

**Objective:** Add only the smallest confirmed mutation surface to the local server.

Before code, add behavior tests for redaction, approved routing, exact source membership, stale state, idempotency, and delete confirmation. Ensure the server explicitly binds loopback, validates MCP requests, writes a metadata-only local journal, and refuses unsupported undo. Do not implement a persistent worker unless actual user-facing trigger semantics require it.

### Task 6: Measure and review

Measure cold start, picker/search median and p95 latency, and memory before and after any performance change. Run the repository's available type check and targeted tests. Request independent security and code review before enabling mutations.
