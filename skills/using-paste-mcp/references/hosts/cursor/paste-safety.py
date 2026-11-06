#!/usr/bin/python3
"""Project hooks: keep Paste/MCP secrets and .env out of the model. Fail closed on .env reads."""
from __future__ import annotations

import json
import sys
from pathlib import Path


def emit(obj: dict) -> None:
	sys.stdout.write(json.dumps(obj, ensure_ascii=True) + "\n")


def read_input() -> dict:
	raw = sys.stdin.read()
	try:
		data = json.loads(raw) if raw.strip() else {}
		return data if isinstance(data, dict) else {}
	except json.JSONDecodeError:
		return {}


def before_read(data: dict) -> dict:
	path = str(data.get("file_path") or "")
	name = Path(path).name
	if name == ".env" or name.endswith(".env") and name != ".env.example":
		return {
			"permission": "deny",
			"user_message": "Blocked reading env/secret file. Use .env.example only.",
		}
	return {"permission": "allow"}


def before_mcp(data: dict) -> dict:
	tool = str(data.get("tool_name") or "")
	raw_input = data.get("tool_input")
	text = raw_input if isinstance(raw_input, str) else json.dumps(raw_input or {})
	if tool in {"create_item", "update_item"} and (
		"sk-" in text or "Bearer " in text or "ghp_" in text
	):
		return {
			"permission": "deny",
			"user_message": "Blocked Paste create/update that looks like it contains a secret.",
			"agent_message": "Do not store API keys in Paste. Use titled identity text/link/color only.",
		}
	return {"permission": "allow"}


def after_mcp(_data: dict) -> dict:
	return {
		"additional_context": (
			"paste-mcp/Paste: summarize by id, type, title, pinboard. Never quote secret-shaped text."
		)
	}


HANDLERS = {
	"beforeReadFile": before_read,
	"beforeMCPExecution": before_mcp,
	"afterMCPExecution": after_mcp,
}


def main() -> int:
	data = read_input()
	event = str(data.get("hook_event_name") or "")
	fn = HANDLERS.get(event)
	if fn is None:
		emit({})
		return 0
	try:
		emit(fn(data))
	except Exception:
		# .env read must fail closed — deny if we crashed while handling beforeReadFile.
		if event == "beforeReadFile":
			emit({"permission": "deny", "user_message": "paste-safety hook error; blocked file read."})
		else:
			emit({})
	return 0


if __name__ == "__main__":
	raise SystemExit(main())
