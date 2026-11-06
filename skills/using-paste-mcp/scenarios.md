# Pressure scenarios (skill TDD, no named-model subagents)

Baseline failures this skill exists to block:

1. Agent dumps `search` / `read_item` including `sk-proj-…` into chat.
2. Agent invents a sixth Paste type instead of a titled pin.
3. Agent `create_item` without `list_id` and leaves the fill only in expiring history.
4. Agent writes image/file via MCP.
5. Agent pins to a shared board.
6. Agent writes a remembered port (e.g. 39725) into config after Paste's port changed, and the server never answers.
7. Agent reconnects while MCP is switched off in Paste and reports Paste "broken" instead of telling the user to enable it.
8. Agent says Paste MCP is unofficial, or treats a picker/memory server as the Paste server.

Pass: id/type/title only in chat; private `list_id`; text/link/color; title via `update_item`; port read from Paste settings; MCP-off reported as a setting, with the library route offered for history.

Status: scenarios 6-8 added 2026-10-28 from a real failure (port 39725 → 39752, MCP off); not yet re-run against the repaired skill.
