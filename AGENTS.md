# Agent notes

## Editorial titles

When writing or editing **news** or **blog** titles, follow **STYLE.adoc**.

Short form:

- **News:** subject + present-tense verb (headline present).
- **Essay with an action:** implied **[On]** test (gerund / parallel), not bare imperatives.
- **Essay claim without a verb:** OK for theses.
- **Antora topic titles:** concept names; no forced verb.
- Sentence case; accurate; not a whitepaper section label dressed as news.

Project facts live in this file; machine-wide notes in `Z:\code\MEMORIES.md`.

## Org layout

- Brand assets: `docs/assets/brand/` (SVG + PNG incl. `logo-mark-256.png` for GitHub avatar).
- Org Pages landing: `openshellorg/opensh.org` → https://openshellorg.github.io (news: AsciiDoc in `news/posts/`; keep feed newsworthy, not process directives).
- Profile README = minimal vacancy-filler; philosophy/process → docs or `.github` README — not news.
- Docs hub repo: `openshellorg/docs` (was `open-shell-org`); Antora component id remains `open-shell-org`; site https://docs.opensh.org/; local playbook `antora-playbook-local.yml`.

## `{OSO}` certification mark

- Label: `{OSO} Certified - opensh.org`
- Truecolor: gray `#9CA3AF` braces/dash; O `#D1D5DB`; S `#B85C5C`; O `#5A9BB0`; Certified mint `#7DCEA0`; URL cobalt `#3B6EA5`.
- Public domain: `opensh.org` (owned); cert URL must not use `devcentr.org`.

## Cross-repo pointers

- `project-map` + `lsgrouped` live in `openshellorg/project-map`; DevCentr consumes via Dub.
- Entrypoint Dispatch (shell refuse/re-exec) in `shell-architecture`; Toolchain Management Pattern canonical in DevCentr/general-knowledge — cross-link, do not duplicate.
- Related-projects footer cluster: OpenShellOrg + DevCentr + dlang-supplemental on org sites, docs footers, and GitHub org profiles.
- Architecture Mermaid sources: authoritative `.mmd` under `shell-architecture/docs/modules/ROOT/partials/diagrams/`; opensh.org prerenders via `mmdc` + `@openshellorg/mermaid-svg-css-vars`.
- DUB registration uses `dlang-supplemental/dub-publish` (not `dub publish`); reusable workflow `register-package.yml`.
