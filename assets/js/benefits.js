import { BENEFITS_ITEMS } from '../data/benefits-data.js'
import { hydrate } from './hydrate.js'

function renderBenefit ({ srcImg, width, height, title, description }) {
  return `
    <li class="benefits__item">
      <img class="benefits__icon" src="${srcImg}" alt="" width="${width}" height="${height}" style="--w: ${width}" />
      <h3 class="benefits__title">${title}</h3>
      <p class="benefits__text">${description}</p>
    </li>`
}

export function getBenefitsSections () {
  return [['.benefits__list', BENEFITS_ITEMS.map(renderBenefit).join('')]]
}

export function initBenefits () {
  hydrate(getBenefitsSections())
}
