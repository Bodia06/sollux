import { TILES } from '../data/tiles-data.js'
import { hydrate } from './hydrate.js'

function renderImage ({ src, alt, width, height, cover, position, box }) {
  if (cover) {
    return `<img class="tile__img tile__img--cover" src="${src}" alt="${alt}" width="${width}" height="${height}" loading="lazy" decoding="async" style="object-position: ${position}" />`
  }

  const placement = Object.entries(box)
    .map(([side, value]) => `${side}: ${value}`)
    .join('; ')

  return `<img class="tile__img" src="${src}" alt="${alt}" width="${width}" height="${height}" loading="lazy" decoding="async" style="${placement}" />`
}

function renderTile ({ id, columns, tone, eyebrow, title, cta, images }) {
  return `
    <article class="tile tile--${id} tile--${tone}" style="--columns: ${columns}">
      <div class="tile__media">${images.map(renderImage).join('')}</div>
      <div class="tile__content">
        <p class="tile__eyebrow">${eyebrow}</p>
        <h2 class="tile__title">${title}</h2>
        <a class="tile__button" href="${cta.href}">${cta.label}</a>
      </div>
    </article>`
}

export function getTilesSections () {
  return [['.tiles__grid', TILES.map(renderTile).join('')]]
}

export function initTiles () {
  hydrate(getTilesSections())
}
