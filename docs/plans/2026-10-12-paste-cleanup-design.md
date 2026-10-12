# Paste Cleanup Design

**Status:** Approved working design from the user's request to organize Paste items during Paste work. This is an operator workflow; it does not install a persistent daemon.

## Goal

When Paste search or organization work surfaces likely credentials, quietly keep values out of chat and route the existing item to a private `API Keys` pinboard. Support explicit audit, move, title edit, delete, and compensating undo requests, and report each action with what changed, how, why, verification, and reversibility.

## Evidence and boundaries

- The repo app currently exposes only picker tools over `search` and `list_pinboards`.
- The connected Paste MCP supports search (at most 100 newest matches, no cursor), full item reads, add/remove pinboard membership, title/content update, pinboard create/rename/delete, and item deletion.
- A move is add-to-destination, verify, then remove-from-source. There is no transaction or native undo. Removing a pin leaves the item in clipboard history. Item deletion is irreversible and requires the API's `confirm: true` second call.
- `~/pythons/improve_paste_export.py` writes extracted clipboard text to plaintext Markdown without redaction; a prior review also found its content extraction unreliable. Do not run it for cleanup research.
- The live pinboard list has no `API Keys` board. Creating one is a setup action for the operator workflow; this design does not create or move Paste items now.

## Organization model

Treat clipboard history as the intake stream. Pin only durable, reusable material.

```text
API Keys                 existing credential items, private board
Identity & Profiles      bios, signatures, stable profile snippets
Work / <project>         active project material
Reference / <domain>     reusable links, notes, technical references
Prompts / <purpose>      prompts grouped by outcome
Archive / <year>         retained historical material
00 Inbox / Review        optional short-lived triage queue
```

Create a new category only for at least three durable items or a recurring workflow. Shared boards remain read-only. Review `Untitled`, empty boards, stale `HandOff`, and `Prompts`/`prompt` as proposals; never merge or delete them automatically.

## Routing and authority

1. During an active Paste search, inspect only returned summaries/previews for high-confidence secret patterns. Do not call `read_item` for routing.
2. Redact candidate previews before any widget, summary, changelog, or memory output. Route a high-confidence existing item by stable ID to the private `API Keys` board under the user's standing instruction.
3. Verify destination membership before any source unpin. Search does not report all memberships; when the source board is not known, pin to `API Keys` and report that the history item remains. Never imply secure erasure.
4. Rename only with a neutral title that contains no credential value. Edit content only for an exact user-requested replacement; the current API provides no durable undo snapshot.
5. Delete only an exact item under explicit item-level instruction. Show/inspect the API preview result, then use `confirm: true`; explain that the deletion is irreversible.
6. Undo a move only when its original board is known: add back, verify, then remove the API Keys membership. Report conflicts and partial states. There is no universal undo for content edits or deletion.

## Change record

For every attempted mutation, provide a redacted record with `What`, `How`, `Why`, safe item ID/type, source/destination, verification, result (`success`, `partial`, `conflict`, `failed`), reversibility, and undo steps. Do not put clipboard bodies, previews containing secrets, or credentials in git or shared memory. Persistent runtime journaling is a later implementation task; until then, report the action record in the current session only.

## Performance and verification

Measure before optimizing: cold server startup, picker/search latency (median and p95), and memory on a representative result set. Respect the upstream 100-result ceiling and do not claim full-history coverage without pagination. The V3 performance skill's Flash Attention and AgentDB targets do not apply to this Node MCP app.

Acceptance requires: secret-shaped previews never appear in user-visible output; routing uses item IDs without reading bodies; mutations verify state and report partial failures; deletion is never silent; undo claims match supported inverse operations; every action reports what/how/why; and performance claims have fresh measurements.
