export function initBurgerMenu () {
  const header = document.querySelector('header')
  const burger = header?.querySelector('.header__burger')
  if (!header || !burger) return

  const mobileQuery = window.matchMedia('(max-width: 1440px)')

  function setMenu (open) {
    header.classList.toggle('is-open', open)
    document.body.classList.toggle('menu-open', open)
    burger.setAttribute('aria-expanded', String(open))
    burger.setAttribute('aria-label', open ? 'Zamknij menu' : 'Otwórz menu')
    if (!open) {
      header
        .querySelectorAll('.nav__item--dropdown.is-open')
        .forEach(item => item.classList.remove('is-open'))
    }
  }

  burger.addEventListener('click', () => {
    setMenu(!header.classList.contains('is-open'))
  })

  header.querySelectorAll('.nav__item--dropdown > .nav__link').forEach(link => {
    link.addEventListener('click', event => {
      if (!mobileQuery.matches) return
      event.preventDefault()
      link.parentElement.classList.toggle('is-open')
    })
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
