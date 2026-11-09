import { BURGER } from '../data/burger-menu-data.js'

export function initBurgerMenu () {
  const header = document.querySelector('.header')
  const burger = header?.querySelector('.header__burger')
  if (!header || !burger) return

  const mobileQuery = window.matchMedia(BURGER.mobileQuery)
  const dropdowns = [...header.querySelectorAll('.nav__item--dropdown')]

  function setDropdown (item, open) {
    item.classList.toggle('is-open', open)
    item.querySelector('.nav__link').setAttribute('aria-expanded', String(open))
  }

  function setMenu (open) {
    if (open) window.scrollTo(0, 0)
    header.classList.toggle('is-open', open)
    document.body.classList.toggle('is-menu-open', open)
    burger.setAttribute('aria-expanded', String(open))
    burger.setAttribute('aria-label', open ? BURGER.labels.close : BURGER.labels.open)
    if (!open) dropdowns.forEach(item => setDropdown(item, false))
  }

  burger.addEventListener('click', () => {
    setMenu(!header.classList.contains('is-open'))
  })

  dropdowns.forEach(item => {
    const link = item.querySelector('.nav__link')

    link.addEventListener('click', event => {
      if (!mobileQuery.matches) return
      event.preventDefault()
      setDropdown(item, !item.classList.contains('is-open'))
    })

    const syncWithPointerAndFocus = () => {
      if (mobileQuery.matches) return
      requestAnimationFrame(() => {
        link.setAttribute('aria-expanded', String(item.matches(':hover, :focus-within')))
      })
    }
    ;['pointerenter', 'pointerleave', 'focusin', 'focusout'].forEach(type =>
      item.addEventListener(type, syncWithPointerAndFocus)
    )
  })

  header.querySelectorAll('.header__menu a').forEach(link => {
    link.addEventListener('click', () => {
      if (
        mobileQuery.matches &&
        !link.closest('.nav__item--dropdown > .nav__link')
      ) {
        setMenu(false)
      }
    })
  })

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && header.classList.contains('is-open')) {
      setMenu(false)
      burger.focus()
    }
  })

  mobileQuery.addEventListener('change', event => {
    if (!event.matches) setMenu(false)
  })
}
