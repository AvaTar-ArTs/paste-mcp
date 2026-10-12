---
name: paste-cleanup
description: Use when Paste search or pinboard work should identify likely credentials, organize existing items, review duplicates, rename items, move memberships, or perform an explicitly requested deletion.
---

# paste-cleanup

## Purpose

Handle Paste organization during an active Paste task. Keep secret-shaped values out of visible output while routing high-confidence existing items to the user's private `API Keys` pinboard. This skill does not run as a daemon or scan all history.

## Required workflow

1. **Check capabilities.** Use only tools currently exposed by Paste. Search returns at most 100 newest matches and has no cursor; narrow queries and report the scope actually inspected.
2. **Classify privately.** Inspect returned summaries for high-confidence credential patterns. Never quote a candidate preview, title, body, or path. Do not call `read_item` just to route an item.
3. **Route existing credentials.** Use the stable item ID with `add_item_to_pinboard` for the private `API Keys` board. If that board is missing, create it under the user's standing routing instruction and verify the returned board identity. Keep history intact; pinning is organization, not erasure.
4. **Move only with a known source.** Add to the destination, verify membership, then remove the known source membership. Search results do not prove every existing membership. If the source is unknown, leave it pinned to `API Keys`, disclose that no source membership was removed, and do not call it a complete move.
5. **Edit carefully.** Use a neutral title with no secret material. Change content only when the user specifies the exact item and replacement. The API has no native edit undo; never promise one.
6. **Delete narrowly.** Require an exact item and explicit deletion instruction. Call `delete_item` without `confirm` to inspect its preview, then call it with `confirm: true` only when the user authorized that exact deletion. State that deletion is irreversible.
7. **Undo honestly.** There is no native undo. A membership move can be compensated only when the original board is known: add back, verify, then remove the `API Keys` membership. Report stale state, conflict, or partial completion without retrying blindly.
8. **Report the changelog.** For every attempted mutation provide `What`, `How`, `Why`, safe item ID/type, source/destination, verification, outcome, reversibility, and undo reference/steps. Keep this record in the current session; until a private journal exists, do not write operational records to the repository or shared memory.

## Organization defaults

Prefer a small private-board set: `API Keys`, `Identity & Profiles`, `Work / <project>`, `Reference / <domain>`, `Prompts / <purpose>`, `Archive / <year>`, and optional `00 Inbox / Review`. Add a category only for at least three durable items or a recurring workflow. Shared boards are read-only. Treat empty boards, duplicate names, `Untitled`, and stale boards as proposals for review, never automatic merge/delete targets.

## Stop conditions

Stop before mutation when item identity or destination is unclear, privacy status is unknown, the tool surface lacks the requested operation, or the operation would require exposing a secret. Do not infer complete history coverage, secure erasure, atomic move, or guaranteed undo.

For pressure scenarios and pass criteria, read [scenarios.md](scenarios.md).
