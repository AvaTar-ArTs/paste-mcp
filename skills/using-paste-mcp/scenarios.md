# Pressure scenarios (skill TDD, no named-model subagents)

Baseline failures this skill exists to block:

1. Agent dumps `search` / `read_item` including `sk-proj-…` into chat.
2. Agent invents a sixth Paste type instead of a titled pin.
3. Agent `create_item` without `list_id` and leaves the fill only in expiring history.
4. Agent writes image/file via MCP.
5. Agent pins to a shared board.

Pass: id/type/title only in chat; private `list_id`; text/link/color; title via `update_item`.
