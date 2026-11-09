import { FRAGMENT, SHADER, VERTEX } from '../data/shader-data.js'

function compile (gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null
}

function createProgram (gl) {
  const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX)
  const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT)
  if (!vertex || !fragment) return null

  const program = gl.createProgram()
  gl.attachShader(program, vertex)
  gl.attachShader(program, fragment)
  gl.linkProgram(program)
  return gl.getProgramParameter(program, gl.LINK_STATUS) ? program : null
}

function startShader (canvas) {
  const gl = canvas.getContext('webgl', SHADER.context)
  if (!gl) return false

  const program = createProgram(gl)
  if (!program) return false

  gl.useProgram(program)

  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(SHADER.quad),
    gl.STATIC_DRAW
  )

  const position = gl.getAttribLocation(program, 'position')
  gl.enableVertexAttribArray(position)
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

  const resolution = gl.getUniformLocation(program, 'uResolution')
  const phase = gl.getUniformLocation(program, 'uPhase')
  const reducedMotion = window.matchMedia(SHADER.reducedMotionQuery)
  const loopMs = SHADER.loopSeconds * 1000
  const scale = SHADER.resolutionScale

  let frame = 0
  let visible = true
  let offset = 0
  let last = performance.now()

  function resize () {
    const width = Math.max(1, Math.round(canvas.clientWidth * scale))
    const height = Math.max(1, Math.round(canvas.clientHeight * scale))
    if (canvas.width === width && canvas.height === height) return
    canvas.width = width
    canvas.height = height
    gl.viewport(0, 0, width, height)
  }

  function draw () {
    resize()
    gl.uniform2f(resolution, canvas.width, canvas.height)
    gl.uniform1f(phase, (offset % loopMs) / loopMs)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }

  function tick (now) {
    offset += now - last
    last = now
    draw()
    frame = requestAnimationFrame(tick)
  }

  function play () {
    if (frame || reducedMotion.matches || !visible || document.hidden) return
    last = performance.now()
    frame = requestAnimationFrame(tick)
  }

  function pause () {
    cancelAnimationFrame(frame)
    frame = 0
  }

  function sync () {
    pause()
    if (reducedMotion.matches) draw()
    else play()
  }

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    sync()
  }).observe(canvas)

  new ResizeObserver(() => {
    if (!frame) draw()
  }).observe(canvas)

  document.addEventListener('visibilitychange', sync)
  reducedMotion.addEventListener('change', sync)

  draw()
  return true
}

export function initShader () {
  const section = document.querySelector('.shader')
  if (!section) return

  const canvas = section.querySelector('.shader__canvas')
  const title = section.querySelector('.shader__title')
  const button = section.querySelector('.shader__button')
  const note = section.querySelector('.shader__note')

  title.textContent = SHADER.title
  button.textContent = SHADER.cta.label
  button.href = SHADER.cta.href
  note.textContent = SHADER.note

  if (!startShader(canvas)) canvas.hidden = true
}
