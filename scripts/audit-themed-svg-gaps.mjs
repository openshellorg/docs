/**
 * Static dark-mode text/label audit on committed adaptive SVGs (no mermaid-cli / Puppeteer).
 * Clones shell-architecture only to read checked-in `images/*.svg` + theme manifests.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, readdirSync, statSync, rmSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'
import { tmpdir } from 'node:os'
import { findDarkModeTextGaps } from '../lib/verify-themed-svg-dark-mode.js'

const repo = 'https://github.com/openshellorg/shell-architecture.git'
const branch = process.env.SHELL_ARCHITECTURE_REF || 'main'
const imageDirRel = 'docs/modules/ROOT/images'

function cloneWorktree () {
  const dir = mkdtempSync(join(tmpdir(), 'shell-architecture-audit-'))
  execFileSync('git', ['clone', '--depth', '1', '--branch', branch, repo, dir], { stdio: 'inherit' })
  return dir
}

function manifestForSvg (svgPath) {
  const base = basename(svgPath, '.svg')
  const candidates = [
    svgPath.replace(/\.svg$/i, '.theme.json'),
    join(dirname(svgPath), '..', 'partials', 'diagrams', `${base}.theme.json`),
  ]
  for (const themePath of candidates) {
    try {
      if (existsSync(themePath)) return JSON.parse(readFileSync(themePath, 'utf8'))
    } catch {
      /* ignore */
    }
  }
  return null
}

function listAdaptiveSvgs (dir) {
  const out = []
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (!statSync(full).isFile()) continue
    if (!name.endsWith('.svg')) continue
    if (/\.(host|fixed)\.svg$/.test(name)) continue
    out.push(full)
  }
  return out
}

const root = cloneWorktree()
try {
  const imageDir = join(root, imageDirRel)
  const failures = []
  for (const svgPath of listAdaptiveSvgs(imageDir)) {
    const svg = readFileSync(svgPath, 'utf8')
    if (!svg.includes('prefers-color-scheme')) continue
    const manifest = manifestForSvg(svgPath)
    if (!manifest) continue
    const gaps = findDarkModeTextGaps(svg, svgPath, manifest)
    for (const gap of gaps) failures.push(gap)
  }
  if (failures.length) {
    console.error('Themed SVG dark-mode audit failed:\n')
    for (const line of failures) console.error(`- ${line}`)
    process.exitCode = 1
  } else {
    console.log('Themed SVG dark-mode audit: no gaps in shell-architecture adaptive figures.')
  }
} finally {
  rmSync(root, { recursive: true, force: true })
}
