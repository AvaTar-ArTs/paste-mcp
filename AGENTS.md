# Repository Guidelines

## Project Structure & Module Organization

Runtime code lives in `src/`: `server.ts` exposes the Streamable HTTP MCP endpoint, `paste-client.ts` calls Paste's upstream MCP, and `redact.ts` removes secret-shaped values from previews. The embedded MCP Apps interface is `widgets/picker.html`. Contributor documentation is under `docs/`, while `skills/using-paste-mcp/` describes agent-facing usage. Cursor integration and safety hooks live in `.cursor/`. Treat `dist/`, `node_modules/`, `.tmp/`, and local `.env` files as generated or private; do not commit them.

## Build, Test, and Development Commands

- `npm install` installs the Node 18+ dependencies from `package-lock.json`.
- `npm run dev` starts `src/server.ts` with `tsx watch` for local iteration.
- `npm start` runs the server once at `http://127.0.0.1:3847/mcp` by default.
- `npx tsc --noEmit` performs the repository's strict TypeScript check without generating `dist/`.

Paste must be running with MCP enabled for end-to-end checks. Copy `.env.example` to `.env` only when local overrides are needed.

## Coding Style & Naming Conventions

Follow the existing TypeScript style: two-space indentation, semicolons, double quotes, trailing commas in multiline constructs, and explicit types at external-data boundaries. Use `camelCase` for functions and variables, `PascalCase` for types, and descriptive MCP tool names in `snake_case`. Keep input parsing defensive because upstream JSON is typed as `unknown`. There is no configured formatter or linter; match neighboring code and rely on `tsc` for static checks.

## Testing Guidelines

No automated test framework or coverage threshold is currently configured. Before submitting changes, run `npx tsc --noEmit` and exercise the affected tool against a running Paste instance. Verify both widget and JSON fallback behavior. Redaction changes should cover representative secret patterns and harmless text; if adding tests, use `*.test.ts` names and add the runner command to `package.json`.

## Commit & Pull Request Guidelines

Recent commits use concise, imperative summaries such as `Add a secret-safe Paste picker MCP app`; Conventional Commit prefixes are not established. Keep each commit focused and explain security-sensitive behavior clearly. Pull requests should include a short purpose statement, verification commands/results, linked issues when applicable, and screenshots for visible picker changes. Never include clipboard contents, tokens, or `.env` values in commits, logs, screenshots, or review notes.

<!-- PERPLEXITY-MCP-START -->
# Perplexity MCP Server

## Available Tools

- **perplexity_search** — Fast web search with source citations. Use for quick factual lookups. Works with or without authentication.
- **perplexity_reason** — Step-by-step reasoning with web context. Requires Pro account.
- **perplexity_research** — Deep multi-section research reports (30-120s). Requires Pro account.
- **perplexity_ask** — Flexible queries with explicit model/mode/follow-up control.
- **perplexity_compute** — ASI/Computer mode for complex multi-step tasks. Requires Max account.
- **perplexity_models** — List available models, account tier, and rate limits.
- **perplexity_retrieve** — Poll results from pending research/compute tasks.
- **perplexity_export** — Export a saved history entry as PDF, markdown, or DOCX. Uses Perplexity's native export when available.
- **perplexity_sync_cloud** — Sync Perplexity cloud history into the local history store.
- **perplexity_hydrate_cloud_entry** — Hydrate a single cloud-backed history entry by id.
- **perplexity_list_researches** — List saved research history with status.
- **perplexity_get_research** — Fetch full content of a saved research.
- **perplexity_login** — Open browser for Perplexity authentication.
- **perplexity_doctor** — Run diagnostic checks against your Perplexity MCP install. Returns a Markdown report; pass probe:true for a live search probe.

## Usage Guidelines

1. **Start with perplexity_search** for quick questions. Only escalate to research or reason when depth is needed.
2. **Check rate limits** with perplexity_models before batch operations.
3. **Always cite sources** from search results in your responses.
4. **For multi-turn conversations**, pass the follow_up_context JSON from perplexity_ask responses back in subsequent calls.
5. **Long-running research**: perplexity_compute may time out. Use perplexity_retrieve with the returned research_id to poll for results.
6. **Language parameter**: Defaults to en-US. Set explicitly for non-English queries.

## Model Selection

| Tool | Default Model | Best For |
|------|--------------|----------|
| perplexity_search | pplx_pro | General web search |
| perplexity_reason | claude46sonnetthinking | Step-by-step analysis |
| perplexity_research | pplx_alpha | Deep research reports |
| perplexity_compute | pplx_asi | Complex multi-step tasks |
<!-- PERPLEXITY-MCP-END -->
