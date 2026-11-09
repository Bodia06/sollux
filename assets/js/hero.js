import {
  IMAGES_PATH,
  LAMP_LABELS,
  LAMPS,
  MAGNETIC,
  PARALLAX,
  PHONE_QUERY,
  PROGRESS_ANIMATION,
  REDUCED_MOTION_QUERY,
  SCROLL_SETTLE_DELAY,
  SLIDE_LABELS,
  SLIDES,
  SWIPE_THRESHOLD
} from '../data/hero-data.js'
import { hydrate } from './hydrate.js'

function renderBackground ({ image, alt, width, height, position }, priority) {
  return `<img class="hero__bg" src="${IMAGES_PATH}/${image}" alt="${alt}" width="${width}" height="${height}" style="object-position: ${position}" decoding="async" fetchpriority="${priority}" />`
}

function renderLamp ({ type, depth }) {
  const { image, width, height, depth: defaultDepth } = LAMPS[type]
  const src = `${IMAGES_PATH}/${image}`

  return `
    <div class="hero__lamp hero__lamp--${type}" data-depth="${depth ?? defaultDepth}">
      <div class="hero__lamp-float">
        <button class="lamp" type="button" aria-pressed="false" aria-label="${LAMP_LABELS.off}">
          <span class="lamp__halo"></span>
          <img class="lamp__img" src="${src}.png" alt="" width="${width}" height="${height}" />
          <img class="lamp__glow" src="${src}-glow.png" alt="" width="${width}" height="${height}" />
        </button>
      </div>
    </div>`
}

function renderSlide (slide, index, total) {
  const { theme, background, eyebrow, title, cta, lamps } = slide
  const isFirst = index === 0

  return `
    <section class="hero__slide hero__slide--${theme}${isFirst ? ' is-active' : ''}" role="group" aria-roledescription="slide" aria-label="${SLIDE_LABELS.slide(total)(index)}"${isFirst ? '' : ' inert'}>
      <div class="hero__media">
        ${renderBackground(background, isFirst ? 'high' : 'auto')}
        ${lamps.map(renderLamp).join('')}
      </div>
      <div class="hero__content">
        <p class="hero__eyebrow">${eyebrow}</p>
        <h2 class="hero__title">${title}</h2>
        <a class="hero__cta" href="${cta.href}">${cta.label}</a>
      </div>
    </section>`
}

function renderBullet (_, index) {
  const isFirst = index === 0

  return `<button class="hero__bullet${isFirst ? ' is-active' : ''}" type="button" aria-label="${SLIDE_LABELS.bullet(index)}" aria-current="${isFirst}"></button>`
}

export function getHeroSections () {
  return [
    ['.hero__slides', SLIDES.map((slide, index) => renderSlide(slide, index, SLIDES.length)).join('')],
    ['.hero__pagination', SLIDES.map(renderBullet).join('')]
  ]
}

function setLamp (lamp, on) {
  lamp.classList.toggle('is-on', on)
  lamp.setAttribute('aria-pressed', String(on))
  lamp.setAttribute('aria-label', on ? LAMP_LABELS.on : LAMP_LABELS.off)
}

function bindToggle (hero) {
  hero.addEventListener('click', event => {
    const lamp = event.target.closest('.lamp')
    if (lamp) setLamp(lamp, !lamp.classList.contains('is-on'))
  })
}

function bindParallax (hero) {
  const layers = [...hero.querySelectorAll('.hero__lamp')]
  const target = { x: 0, y: 0 }
  const current = { x: 0, y: 0 }
  let frame = null

  function render () {
    current.x += (target.x - current.x) * PARALLAX.easing
    current.y += (target.y - current.y) * PARALLAX.easing

    layers.forEach(layer => {
      const depth = Number(layer.dataset.depth || 1)
      const x = (current.x * PARALLAX.maxX * depth).toFixed(2)
      const y = (current.y * PARALLAX.maxY * depth).toFixed(2)
      layer.style.transform = `translate3d(${x}px, ${y}px, 0)`
    })

    const moving =
      Math.abs(target.x - current.x) > PARALLAX.restThreshold ||
      Math.abs(target.y - current.y) > PARALLAX.restThreshold
    frame = moving ? requestAnimationFrame(render) : null
  }

  function moveTo (x, y) {
    target.x = x
    target.y = y
    if (frame === null) frame = requestAnimationFrame(render)
  }

  hero.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch') return
    const rect = hero.getBoundingClientRect()
    moveTo(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      ((event.clientY - rect.top) / rect.height) * 2 - 1
    )
  })

  hero.addEventListener('pointerleave', () => moveTo(0, 0))
}

function initLamps (hero, reducedMotion) {
  bindToggle(hero)
  if (!reducedMotion.matches) bindParallax(hero)
}

function initMagneticButtons (hero, reducedMotion) {
  if (reducedMotion.matches) return

  hero.addEventListener('pointermove', event => {
    const button = event.target.closest('.hero__cta')
    if (!button || event.pointerType === 'touch') return

    const rect = button.getBoundingClientRect()
    const x = (event.clientX - rect.left - rect.width / 2) * MAGNETIC.strengthX
    const y = (event.clientY - rect.top - rect.height / 2) * MAGNETIC.strengthY
    button.style.setProperty('--mx', `${x.toFixed(1)}px`)
    button.style.setProperty('--my', `${y.toFixed(1)}px`)
  })

  hero.addEventListener(
    'pointerout',
    event => {
      const button = event.target.closest('.hero__cta')
      if (!button || button.contains(event.relatedTarget)) return
      button.style.removeProperty('--mx')
      button.style.removeProperty('--my')
    }
  )
}

function initSlider (hero) {
  const track = hero.querySelector('.hero__slides')
  const slides = [...hero.querySelectorAll('.hero__slide')]
  const bullets = [...hero.querySelectorAll('.hero__bullet')]
  const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY)
  const phone = window.matchMedia(PHONE_QUERY)
  let index = 0

  function show (target, { scroll = true, instant = false } = {}) {
    index = (target + slides.length) % slides.length

    slides.forEach((slide, i) => {
      const active = i === index
      slide.classList.toggle('is-active', active)
      slide.inert = phone.matches ? false : !active
      if (!active) {
        slide.querySelectorAll('.lamp').forEach(lamp => setLamp(lamp, false))
      }
    })

    bullets.forEach((bullet, i) => {
      const active = i === index
      bullet.classList.toggle('is-active', active)
      bullet.setAttribute('aria-current', String(active))
    })

    if (scroll && phone.matches) {
      track.scrollTo({
        left: index * track.clientWidth,
        behavior: instant || reducedMotion.matches ? 'auto' : 'smooth'
      })
    }
  }

  const next = () => show(index + 1)
  const prev = () => show(index - 1)

  function bindControls () {
    hero.querySelector('.hero__arrow--next')?.addEventListener('click', next)
    hero.querySelector('.hero__arrow--prev')?.addEventListener('click', prev)

    bullets.forEach((bullet, i) => {
      bullet.addEventListener('click', () => {
        if (i !== index) show(i)
      })
      bullet.addEventListener('animationend', event => {
        if (event.animationName === PROGRESS_ANIMATION && !reducedMotion.matches) next()
      })
    })

    hero.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight') next()
      if (event.key === 'ArrowLeft') prev()
    })
  }

  const pause = () => hero.classList.add('is-paused')
  const resume = () => {
    const keyboardFocus = document.activeElement?.matches(':focus-visible') && hero.contains(document.activeElement)
    hero.classList.toggle('is-paused', document.hidden || keyboardFocus)
  }

  function bindPause () {
    hero.addEventListener('focusin', event => {
      if (event.target.matches(':focus-visible')) pause()
    })
    hero.addEventListener('focusout', resume)
    document.addEventListener('visibilitychange', resume)
  }

  function bindPhoneTrack () {
    let settleTimer = null

    function settle () {
      const settled = Math.round(track.scrollLeft / track.clientWidth)
      if (settled !== index) show(settled, { scroll: false })
      resume()
    }

    function scheduleSettle () {
      clearTimeout(settleTimer)
      settleTimer = setTimeout(settle, SCROLL_SETTLE_DELAY)
    }

    track.addEventListener(
      'scroll',
      () => phone.matches && scheduleSettle(),
      { passive: true }
    )

    track.addEventListener(
      'touchstart',
      () => {
        if (!phone.matches) return
        clearTimeout(settleTimer)
        pause()
      },
      { passive: true }
    )
    track.addEventListener('touchend', () => phone.matches && scheduleSettle())
    track.addEventListener('touchcancel', () => phone.matches && scheduleSettle())

    phone.addEventListener('change', () => {
      track.scrollLeft = 0
      show(index, { instant: true })
    })
  }

  function bindSwipe () {
    let startX = 0

    hero.addEventListener(
      'touchstart',
      event => {
        startX = event.changedTouches[0].clientX
      },
      { passive: true }
    )

    hero.addEventListener('touchend', event => {
      if (phone.matches) return
      const distance = event.changedTouches[0].clientX - startX
      if (Math.abs(distance) > SWIPE_THRESHOLD) distance < 0 ? next() : prev()
    })
  }

  bindControls()
  bindPause()
  bindPhoneTrack()
  bindSwipe()
  show(0, { scroll: false })
  initLamps(hero, reducedMotion)
  initMagneticButtons(hero, reducedMotion)
}

const LOAD_TIMEOUT = 4000

function revealWhenLoaded (hero) {
  const images = [...hero.querySelectorAll('.hero__slide.is-active img')]
  const loaded = Promise.all(images.map(img => img.decode().catch(() => {})))
  const timeout = new Promise(resolve => setTimeout(resolve, LOAD_TIMEOUT))

  Promise.race([loaded, timeout]).then(() => {
    requestAnimationFrame(() => hero.classList.add('is-loaded'))
  })
}

export function initHero () {
  const hero = document.querySelector('.hero')
  if (!hero) return

  hydrate(getHeroSections())
  initSlider(hero)
  revealWhenLoaded(hero)
}
