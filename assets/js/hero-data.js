export const IMAGES_PATH = './assets/images/hero'

export const PHONE_QUERY = '(max-width: 768px)'
export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

export const PROGRESS_ANIMATION = 'hero-progress'
export const SWIPE_THRESHOLD = 50
export const SCROLL_SETTLE_DELAY = 90

export const LAMP_LABELS = {
  on: 'Wyłącz lampę',
  off: 'Włącz lampę'
}

export const PARALLAX = {
  maxX: 22,
  maxY: 14,
  easing: 0.08,
  restThreshold: 0.001
}

export const MAGNETIC = {
  strengthX: 0.25,
  strengthY: 0.35
}

export const LAMPS = {
  cream: { image: 'lamps/white_light', width: 372, height: 419, depth: 0.6 },
  terracotta: { image: 'lamps/red-light', width: 423, height: 393, depth: 1.2 },
  olive: { image: 'lamps/green_light', width: 470, height: 428, depth: 0.9 }
}

export const SLIDES = [
  {
    id: 'bestsellers',
    theme: 'warm',
    background: { image: 'banners/banner1.jpg', width: 2736, height: 1536, position: '62% 100%' },
    eyebrow: 'Bestsellery SOLLUX',
    title: 'Kolor i forma w nowym świetle',
    cta: { label: 'Sprawdź bestsellery', href: '#bestsellery' },
    lamps: [{ type: 'cream' }, { type: 'terracotta' }, { type: 'olive' }]
  },
  {
    id: 'new',
    theme: 'dark',
    background: { image: 'banners/banner2.jpg', width: 1920, height: 1080, position: '55% 50%' },
    eyebrow: 'Nowości SOLLUX',
    title: 'Światło, które buduje nastrój',
    cta: { label: 'Zobacz nowości', href: '#nowosci' },
    lamps: []
  }
]
