import {
  FOOTER_AWARDS,
  FOOTER_BADGES,
  FOOTER_COLUMNS,
  FOOTER_DETAILS,
  FOOTER_PAYMENTS,
  FOOTER_SHOPS,
  FOOTER_SOCIALS
} from '../data/footer-data.js'

function renderSocial ({ label, href, src, width, height }) {
  return `
    <li>
      <a class="footer__social" href="${href}" aria-label="${label}">
        <img src="${src}" alt="" width="${width}" height="${height}" />
      </a>
    </li>`
}

function renderColumn ({ title, links }) {
  return `
    <nav class="footer__col" aria-label="${title}">
      <h3 class="footer__title">${title}</h3>
      <ul class="footer__links">
        ${links
          .map(({ label, href }) => `<li><a href="${href}">${label}</a></li>`)
          .join('')}
      </ul>
    </nav>`
}

function renderImg ({ src, alt, width, height }) {
  return `<li><img src="${src}" alt="${alt}" width="${width}" height="${height}" loading="lazy" /></li>`
}

function renderShop ({ src, label, lang }) {
  return `
    <li>
      <a class="footer__flag" href="#" hreflang="${lang}" title="${label}">
        <img src="${src}" alt="${label}" width="24" height="24" loading="lazy" />
      </a>
    </li>`
}

function fill (selector, items, render) {
  const el = document.querySelector(selector)
  if (el) el.innerHTML = items.map(render).join('')
}

export function initFooter () {
  fill('.footer__socials', FOOTER_SOCIALS, renderSocial)
  fill('.footer__nav', FOOTER_COLUMNS, renderColumn)
  fill('.footer__payments', FOOTER_PAYMENTS, renderImg)
  fill('.footer__awards', FOOTER_AWARDS, renderImg)
  fill('.footer__flags', FOOTER_SHOPS, renderShop)
  fill('.footer__details', FOOTER_DETAILS, d => `<li>${d}</li>`)
  fill('.footer__badges', FOOTER_BADGES, renderImg)
}
