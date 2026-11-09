export const FOOTER_SOCIALS = [
  { label: 'Facebook', href: '#', src: './assets/images/footer/socials/facebook.png', width: 24, height: 24 },
  { label: 'Instagram', href: '#', src: './assets/images/footer/socials/instagram.png', width: 24, height: 24 },
  { label: 'TikTok', href: '#', src: './assets/images/footer/socials/tikTok.png', width: 14, height: 16 },
  { label: 'YouTube', href: '#', src: './assets/images/footer/socials/Youtube.png', width: 23, height: 16 }
]

export const FOOTER_COLUMNS = [
  {
    title: 'Moje zamówienia',
    links: [
      { label: 'Status zamówienia', href: '#' },
      { label: 'Śledzenie przesyłki', href: '#' },
      { label: 'Chcę zareklamować produkt', href: '#' },
      { label: 'Informacje o wymianie', href: '#' },
      { label: 'Kontakt', href: '#' }
    ]
  },
  {
    title: 'Moje konto',
    links: [
      { label: 'Zarejestruj się', href: '#' },
      { label: 'Koszyk', href: '#' },
      { label: 'Listy zakupowe', href: '#' },
      { label: 'Lista zakupionych produktów', href: '#' },
      { label: 'Historia transakcji', href: '#' },
      { label: 'Moje rabaty', href: '#' }
    ]
  },
  {
    title: 'Regulaminy',
    links: [
      { label: 'Sposoby wysyłki', href: '#' },
      { label: 'Sposoby płatności', href: '#' },
      { label: 'Regulamin sklepu', href: '#' },
      { label: 'Polityka prywatności', href: '#' },
      { label: 'Polityka bezpieczeństwa', href: '#' },
      { label: 'Zmień ustawienia ciasteczek', href: '#' }
    ]
  },
  {
    title: 'Informacje',
    links: [
      { label: 'O nas', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Kurs światła', href: '#' },
      { label: 'Inspiracje', href: '#' },
      { label: 'Marka premium', href: '#' },
      { label: 'Gwarancja', href: '#' },
      { label: 'Konfigurator 3D', href: '#' }
    ]
  },
  {
    title: 'Współpraca',
    links: [
      { label: 'Dla Architekta', href: '#' },
      { label: 'Modele 3D', href: '#' },
      { label: 'Dystrybucja', href: '#' }
    ]
  }
]

const IMG = './assets/images/footer/'

export const FOOTER_PAYMENTS = [
  ['payments/visa', 'Visa', 43, 24],
  ['payments/mastercard', 'Mastercard', 43, 24],
  ['payments/payU', 'PayU', 43, 24],
  ['payments/payPal', 'PayPal', 43, 24],
  ['payments/inPost', 'InPost', 43, 24],
  ['payments/dpd', 'DPD', 43, 24],
  ['payments/paczka', 'Paczka w Ruchu', 43, 24],
  ['payments/dhl', 'DHL', 43, 24],
  ['payments/gls', 'GLS', 43, 24],
  ['payments/pocztaPolska', 'Poczta Polska', 43, 24]
].map(([f, alt, width, height]) => ({ src: `${IMG}${f}.png`, alt, width, height }))

export const FOOTER_AWARDS = [
  ['awards/rzetelna', 'Rzetelna Firma', 96, 44],
  ['awards/orly', 'Orły Oświetlenia', 96, 43],
  ['awards/gazele', 'Gazele Biznesu', 94, 43],
  ['awards/solidna', 'Solidna Firma 2021', 96, 43],
  ['awards/polskiprodukt', 'Polski Produkt – Gwarancja Jakości', 96, 43],
  ['awards/firmagodna', 'Firma Godna Zaufania', 51, 42]
].map(([f, alt, width, height]) => ({ src: `${IMG}${f}.png`, alt, width, height }))

export const FOOTER_SHOPS = [
  ['flags/poland', 'Polska', 'pl'],
  ['flags/niemcy', 'Deutschland', 'de'],
  ['flags/hiszpania', 'España', 'es'],
  ['flags/rumunia', 'România', 'ro'],
  ['flags/francja', 'France', 'fr'],
  ['flags/anglia', 'United Kingdom', 'en'],
  ['flags/holandia', 'Nederland', 'nl'],
  ['flags/szwecja', 'Sverige', 'sv']
].map(([f, label, lang]) => ({ src: `${IMG}${f}.png`, label, lang }))

export const FOOTER_DETAILS = [
  'NIP: 6070082443',
  '+48 668 806 323',
  '(Pn - Pt 7:00 - 15:00)',
  'sklep@sollux.pl',
  'Sollux Lighting Sp. z o.o.',
  'Władysława Łokietka 35, 64-840 Budzyń (POLSKA)'
]

export const FOOTER_BADGES = [
  { src: `${IMG}badges/designCode.png`, alt: 'Design&Code IdoMods', width: 98, height: 36 },
  { src: `${IMG}badges/poweredBy.png`, alt: 'Powered by IdoSell', width: 66, height: 36 }
]
