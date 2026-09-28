# Contributing to OpenShellOrg Docs

## Hub CI scope

This repository builds https://docs.opensh.org with Antora and the [facto-stack](https://github.com/antora-supplemental/facto-stack) compose. GitHub Actions runs:

- **Themed SVG runtime sync** — `pnpm diagrams:check` (vendored `@dev-centr/themed-svg` browser bundle)
- **Static dark-mode text audit** — reads committed adaptive SVGs from upstream repos (no browser)
- **Verifier unit tests** — `pnpm test:dark-text`
- **Antora site generation** — includes `verify-themed-svg-dark-mode` warnings on catalog SVGs

## Mermaid → SVG bake (not run in this hub)

The docs hub **does not** run `pnpm diagrams:check`, mermaid-cli, or Puppeteer/Chromium in CI. We intentionally do **not** clone product repos to re-render `.mmd` sources against committed `*.svg` / `*.host.svg` pairs.

If you change Mermaid sources or theme manifests in a **product repo** (especially [shell-architecture](https://github.com/openshellorg/shell-architecture)), validate on a developer machine **before merge**:

```bash
cd shell-architecture   # or your product checkout
pnpm install
pnpm diagrams           # regenerate baked SVG pairs
pnpm diagrams:check     # staleness gate
pnpm test               # shell-architecture: diagrams + PlayTime artifact checks
```

Authoritative contributor notes for shell-architecture diagrams: [diagrams/README.adoc](https://github.com/openshellorg/shell-architecture/blob/main/diagrams/README.adoc).

This hub still publishes those committed SVGs via Antora content sources; freshness is owned by the product repo and human review, not hub Actions.

## Local hub checks

```bash
pnpm install
pnpm diagrams:check:all   # hub static audits only
pnpm docs                 # or pnpm docs:local with sibling checkouts
```

See also [scripts/DIAGRAM-AUDITS.md](scripts/DIAGRAM-AUDITS.md).
