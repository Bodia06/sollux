import {
  FOOTER_AWARDS,
  FOOTER_BADGES,
  FOOTER_COLUMNS,
  FOOTER_DETAILS,
  FOOTER_PAYMENTS,
  FOOTER_SHOPS,
  FOOTER_SOCIALS
} from '../data/footer-data.js'
import { hydrate } from './hydrate.js'

function renderSocial ({ label, href, src, width, height }) {
  return `
    <li>
      <a class="footer__social" href="${href}" aria-label="${label}">
        <img class="footer__img" src="${src}" alt="" width="${width}" height="${height}" />
      </a>
    </li>`
}

function renderColumn ({ title, links }) {
  return `
    <nav class="footer__col" aria-label="${title}">
      <h2 class="footer__title">${title}</h2>
      <ul class="footer__links">
        ${links
          .map(({ label, href }) => `<li><a class="footer__link" href="${href}">${label}</a></li>`)
          .join('')}
      </ul>
    </nav>`
}

function renderImg (className) {
  return ({ src, alt, width, height }) =>
    `<li${className ? ` class="${className}"` : ''}><img class="footer__img" src="${src}" alt="${alt}" width="${width}" height="${height}" loading="lazy" /></li>`
}

function renderShop ({ src, label, lang }) {
  return `
    <li>
      <a class="footer__flag" href="#" hreflang="${lang}" title="${label}">
        <img class="footer__img" src="${src}" alt="${label}" width="24" height="24" loading="lazy" />
      </a>
    </li>`
}

export function getFooterSections () {
  return [
    ['.footer__socials', FOOTER_SOCIALS.map(renderSocial).join('')],
    ['.footer__nav', FOOTER_COLUMNS.map(renderColumn).join('')],
    ['.footer__payments', FOOTER_PAYMENTS.map(renderImg('footer__payment')).join('')],
    ['.footer__awards', FOOTER_AWARDS.map(renderImg('footer__award')).join('')],
    ['.footer__flags', FOOTER_SHOPS.map(renderShop).join('')],
    ['.footer__details', FOOTER_DETAILS.map(detail => `<li>${detail}</li>`).join('')],
    ['.footer__badges', FOOTER_BADGES.map(renderImg()).join('')]
  ]
}

export function initFooter () {
  hydrate(getFooterSections())
}
