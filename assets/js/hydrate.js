export function hydrate (sections) {
  sections.forEach(([selector, html]) => {
    const element = document.querySelector(selector)
    if (element && !element.childElementCount) element.innerHTML = html
  })
}
