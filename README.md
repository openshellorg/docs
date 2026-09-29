<a id="readme-top"></a>
<div align="center">
  <a href="https://github.com/openshellorg/docs/graphs/contributors"><img src="https://img.shields.io/github/contributors/openshellorg/docs.svg?style=for-the-badge" alt="Contributors"></a>
  <a href="https://github.com/openshellorg/docs/network/members"><img src="https://img.shields.io/github/forks/openshellorg/docs.svg?style=for-the-badge" alt="Forks"></a>
  <a href="https://github.com/openshellorg/docs/stargazers"><img src="https://img.shields.io/github/stars/openshellorg/docs.svg?style=for-the-badge" alt="Stars"></a>
  <a href="https://github.com/openshellorg/docs/issues"><img src="https://img.shields.io/github/issues/openshellorg/docs.svg?style=for-the-badge" alt="Issues"></a>
  <br />
  <h3 align="center">OpenShellOrg Docs</h3>
  <p align="center">
    OpenShellOrg documentation hub. Antora site aggregating openshellorg projects (SOS + companion tooling docs).<br />
    <a href="https://docs.opensh.org/"><strong>Explore the docs</strong></a>
    <br />
    <br />
    <a href="https://github.com/openshellorg/docs/issues">Report Bug</a>
    &middot;
    <a href="https://github.com/openshellorg/docs/issues">Request Feature</a>
  </p>
</div>

<p align="center">
  <img src="assets/brand/logo-mark.svg" width="160" height="160" alt="OpenShellOrg" />
</p>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="CONTRIBUTING.md">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The Project

Documentation hub for [OpenShellOrg](https://github.com/openshellorg) — Antora site aggregating org projects, plus SOS certification packages in this monorepo. The published site follows the [facto-stack](https://github.com/antora-supplemental/facto-stack) Antora compose pack (Valentus + Lunr + page-context + site-nav-tree + maint extensions), aligned with [DevCentr docs](https://docs.devcentr.org/).

### Mission

Two complementary tracks:

1. **Standardized Operations Syntax (SOS)** — unify human-friendly CLI flag syntax and certify compliant tools ("Save Our Syntax").
2. **Structured shell architecture** — advocate typed data pipelines (endorse [Nushell](https://www.nushell.sh/)) so stdout is not forced to be both a pipe *and* a display canvas. Do **not** reinvent Nushell; document the model and ship helpers.

SOS remains the certification/flag work in this monorepo. Structured-shell direction lives in sibling repos (below).

### Related projects

| Repo | Role |
|------|------|
| [shell-architecture](https://github.com/openshellorg/shell-architecture) | Thesis and layers: structured I/O, SOS, terminals, Dev-Centr relationship |
| [nu-require](https://github.com/openshellorg/nu-require) | `validate()` — require / relaunch under Nushell; optional install offer |
| [nu-emit](https://github.com/openshellorg/nu-emit) | C-first API to emit structured rows (JSONL) without hand-rolling JSON |

**Name collision:** We are not [NVIDIA OpenShell](https://github.com/NVIDIA/OpenShell) (agent sandbox runtime). Different problem, similar words.

Dev-Centr **recommends/configures** Nushell for developers; OpenShellOrg **standardizes and tools**. Keep the orgs aligned, not merged.

### Repository structure

```
docs/                      # this repo (openshellorg/docs)
├── apps/
│   └── main/              # Main website (SolidStart)
├── docs/                  # Antora hub component (SOS, philosophy, ecosystem)
├── docs-tools/            # Antora `tools` component ROOT (member modules in sibling repos)
├── packages/
│   ├── sos-grammar/       # @sos/grammar
│   └── sos-validator-core/
├── assets/brand/
├── antora-playbook.yml    # production (aggregates sibling repos)
├── antora-playbook-local.yml
└── package.json
```

| Path | Description |
|------|-------------|
| `apps/main` | Organization website (SolidStart) |
| `docs/` | Hub Antora component (SOS + org pages) |
| `docs-tools/` | Shared `tools` component landing (CLI/library manuals register as modules) |
| `@sos/grammar` | Grammar definitions for parsing SOS syntax |
| `@sos/validator-core` | Core validation logic for SOS compliance |

### Diagram rendering engines (Facto)

This hub uses the [antora-diagram-engines](https://github.com/antora-supplemental/antora-diagram-engines) packages Facto documents — not custom renderers:

| Diagram source | Renderer | Package / extension |
|----------------|----------|---------------------|
| AsciiDoc `[source,mermaid]` (and `.mermaid-client` roles) | Client Mermaid in the browser | `@antora-supplemental/mermaid-client` |
| PlantUML and other Kroki diagram types in AsciiDoc | Build-time bake via Kroki | `asciidoctor-kroki` (`kroki-server-url`, `kroki-fetch-diagram`) |
| Baked SVG + client Mermaid hosts | Lightbox / zoom UI | `@antora-supplemental/diagram-lightbox` |
| `image::…[.themed-svg]` committed figures (e.g. shell-architecture) | Pre-generated adaptive/host SVGs in the product repo (`mermaid-cli` + `@dev-centr/mermaid-svg-css-vars`); runtime recolor via `@dev-centr/themed-svg` | Bake freshness: [shell-architecture](https://github.com/openshellorg/shell-architecture) `pnpm diagrams:check` / `pnpm test` (not re-run from this hub) |

Playbook attrs: `mermaid-client: ''`, `mermaid-client-mode: client`. Supplemental UI loads `mermaid-client-*` and `diagram-lightbox-*` partials after SoftNav (Facto stack demo pattern).

**Hub diagram CI** (`pnpm diagrams:check:all`): sync/check vendored themed-svg runtime, static dark-mode text audit on committed adaptive SVGs (no mermaid-cli / Puppeteer), and verifier unit tests. Antora build runs `verify-themed-svg-dark-mode` as warnings on catalog SVGs.

**Mermaid → SVG bake is not validated here.** Hub Actions do not run mermaid-cli or Puppeteer. If you change `.mmd` or theme manifests in a product repo, run that repo’s `pnpm diagrams` / `pnpm diagrams:check` on a developer machine before merge ([shell-architecture diagrams guide](https://github.com/openshellorg/shell-architecture/blob/main/diagrams/README.adoc)). See [CONTRIBUTING.md](CONTRIBUTING.md).

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+)
- [pnpm](https://pnpm.io/) (v10+)

```bash
git clone https://github.com/openshellorg/docs.git
cd docs
pnpm install
```

## Usage

```bash
# Apps / packages
pnpm dev
pnpm build

# Docs (Antora)
pnpm docs
# or local sibling checkouts:
pnpm docs:local

# Themed SVG / diagram audits (hub static checks only; no upstream mermaid-cli)
pnpm diagrams:check:all
```

Published docs: https://docs.opensh.org/

Org site: https://openshellorg.github.io/

See [CHANGELOG.adoc](CHANGELOG.adoc).

## Contact

Open Shell Org — openshell@devcentr.org

Project Link: https://github.com/openshellorg/docs

Site: https://openshellorg.github.io

<p align="right">(<a href="#readme-top">back to top</a>)</p>

