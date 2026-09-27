Apply in openshellorg/shell-architecture so docs hub `pnpm diagrams:check:all` passes:

1. In each `docs/modules/ROOT/partials/diagrams/*.theme.json`, add:

```json
{
  "kind": "stylesheet",
  "selector": "#my-svg .label",
  "property": "color",
  "token": "color.text.primary"
}
```

2. Run `pnpm install && pnpm diagrams && pnpm diagrams:check` and commit the regenerated
   `docs/modules/ROOT/images/*.svg` and `*.host.svg` pairs.

Without this, Antora `verify-themed-svg-dark-mode` warns on edge labels in dark mode, and hub CI
diagram audits fail against `main`.
