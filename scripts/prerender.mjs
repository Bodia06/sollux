import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

import { getAboutSections } from '../assets/js/about.js'
import { getBenefitsSections } from '../assets/js/benefits.js'
import { getFooterSections } from '../assets/js/footer.js'
import { getHeroSections } from '../assets/js/hero.js'
import { getShaderSections } from '../assets/js/shader.js'
import { getTilesSections } from '../assets/js/tiles.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const target = join(root, 'index.html')

const sections = [
  ...getHeroSections(),
  ...getBenefitsSections(),
  ...getTilesSections(),
  ...getShaderSections(),
  ...getAboutSections(),
  ...getFooterSections()
]

function findElement (html, className) {
  const open = new RegExp(`<(\\w+)\\b[^>]*\\bclass="(?:[^"]*\\s)?${className}(?:\\s[^"]*)?"[^>]*>`)
  const match = open.exec(html)
  if (!match) throw new Error(`Element .${className} not found`)

  const tag = match[1]
  const start = match.index + match[0].length
  const tokens = new RegExp(`<(/?)${tag}\\b[^>]*>`, 'g')
  tokens.lastIndex = start

  let depth = 1
  let token
  while ((token = tokens.exec(html))) {
    depth += token[1] ? -1 : 1
    if (!depth) return { start, end: token.index }
  }
  throw new Error(`Element .${className} is not closed`)
}

let html = await readFile(target, 'utf8')

sections.forEach(([selector, content]) => {
  const { start, end } = findElement(html, selector.slice(1))
  html = html.slice(0, start) + content + html.slice(end)
})

await writeFile(target, html)
console.log(`Prerendered ${sections.length} sections into index.html`)
