# Diagram audits in openshellorg/docs

## What hub CI runs

| Step | Script | Chromium? |
|------|--------|-----------|
| Runtime sync | `sync-themed-svg-runtime.mjs` (`diagrams:sync` / `diagrams:check`) | No |
| Dark-text audit | `audit-themed-svg-gaps.mjs` | No — git clone + read committed SVGs |
| Unit tests | `test/verify-themed-svg-dark-mode.test.js` | No |
| Antora build | `verify-themed-svg-dark-mode.js` extension | No |

Orchestration: `pnpm diagrams:check:all` (see `.github/workflows/docs.yml` **diagram-audit** job).

## What hub CI does **not** run

- Upstream `pnpm diagrams:check` (mermaid-cli / Puppeteer)
- Any diff of `.mmd` source against baked `images/*.svg`

Contributors who edit `.mmd` or `*.theme.json` in [shell-architecture](https://github.com/openshellorg/shell-architecture) must run `pnpm diagrams` and `pnpm diagrams:check` (or `pnpm test`) locally. See [diagrams/README.adoc](https://github.com/openshellorg/shell-architecture/blob/main/diagrams/README.adoc) and [CONTRIBUTING.md](../CONTRIBUTING.md).
