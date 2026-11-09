import { BENEFITS_ITEMS } from '../data/benefits-data.js'

function renderBenefit ({ srcImg, width, height, title, description }) {
  return `
    <li class="benefits__item">
      <img class="benefits__icon" src="${srcImg}" alt="" width="${width}" height="${height}" style="--w: ${width}" />
      <p class="benefits__title">${title}</p>
      <p class="benefits__text">${description}</p>
    </li>`
}

export function initBenefits () {
  const list = document.querySelector('.benefits__list')
  if (!list) return

  list.innerHTML = BENEFITS_ITEMS.map(renderBenefit).join('')
}
