import { ABOUT } from '../data/about-data.js'
import { hydrate } from './hydrate.js'

export function getAboutSections () {
  return [
    ['.about__title', ABOUT.title],
    ['.about__body', ABOUT.paragraphs.map(text => `<p class="about__text">${text}</p>`).join('')]
  ]
}

export function initAbout () {
  hydrate(getAboutSections())
}
