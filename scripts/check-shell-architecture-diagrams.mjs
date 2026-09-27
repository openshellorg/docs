/**
 * Run openshellorg/shell-architecture diagram staleness checks (mermaid-svg-css-vars pipeline).
 */
import { execFileSync } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const repo = 'https://github.com/openshellorg/shell-architecture.git'
const branch = process.env.SHELL_ARCHITECTURE_REF || 'main'

/** mermaid-cli → Puppeteer: required on GitHub Actions Linux (no setuid sandbox). */
function envForUpstreamDiagramCheck () {
  const env = { ...process.env }
  if (env.CI === 'true' || env.GITHUB_ACTIONS === 'true' || env.CI === '1') {
    env.PUPPETEER_ARGS =
      env.PUPPETEER_ARGS || '--no-sandbox --disable-setuid-sandbox'
  }
  return env
}

const worktree = mkdtempSync(join(tmpdir(), 'shell-architecture-diagram-check-'))
try {
  execFileSync('git', ['clone', '--depth', '1', '--branch', branch, repo, worktree], {
    stdio: 'inherit',
    env: envForUpstreamDiagramCheck(),
  })
  execFileSync('pnpm', ['install', '--frozen-lockfile'], {
    cwd: worktree,
    stdio: 'inherit',
    env: envForUpstreamDiagramCheck(),
  })
  execFileSync('pnpm', ['run', 'diagrams:check'], {
    cwd: worktree,
    stdio: 'inherit',
    env: envForUpstreamDiagramCheck(),
  })
} catch (err) {
  console.error(
    '\nUpstream shell-architecture diagram check failed. Regenerate with `pnpm diagrams` in openshellorg/shell-architecture',
  )
  console.error(
    'and ensure theme manifests include #my-svg .label color binding for dark-mode labels.\n',
  )
  throw err
} finally {
  rmSync(worktree, { recursive: true, force: true })
}
