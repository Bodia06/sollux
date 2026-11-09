import { SHADER } from './shader-data.js'

const VERTEX = `
attribute vec2 position;
void main () {
  gl_Position = vec4(position, 0.0, 1.0);
}`

const FRAGMENT = `
precision highp float;

uniform vec2 uResolution;
uniform float uPhase;

const float TAU = 6.28318530718;
const vec3 DARK = vec3(0.063, 0.063, 0.067);
const vec3 GOLD = vec3(0.863, 0.769, 0.243);
const vec3 DEEP = vec3(0.553, 0.471, 0.145);

float hash (vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main () {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec2 p = vec2(uv.x * uResolution.x / uResolution.y, uv.y);
  float a = uPhase * TAU;

  p += 0.09 * vec2(
    sin(p.y * 3.0 + a) + 0.5 * sin(p.y * 5.0 - 2.0 * a),
    cos(p.x * 3.0 + a) + 0.5 * cos(p.x * 4.0 + 2.0 * a)
  );

  float d = p.x * 0.82 - p.y * 0.57;
  float waves = sin(d * 5.5 + 1.6 * sin(a))
    + 0.6 * sin(d * 9.5 - 1.1 * sin(a + 1.3) + 1.7)
    + 0.35 * sin(d * 15.0 + 0.8 * sin(2.0 * a));
  float beams = smoothstep(-0.2, 1.2, waves);

  float floorGlow = smoothstep(0.95, 0.0, uv.y);
  float intensity = floorGlow * (0.18 + 0.82 * beams);
  intensity += 0.12 * smoothstep(0.6, 0.0, uv.y) * (0.5 + 0.5 * sin(a));

  vec3 color = mix(DARK, mix(DEEP, GOLD, beams), clamp(intensity * 1.25, 0.0, 1.0));
  color += (hash(gl_FragCoord.xy) - 0.5) / 255.0;

  gl_FragColor = vec4(color, 1.0);
}`

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
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false })
  if (!gl) return false

  const program = createProgram(gl)
  if (!program) return false

  gl.useProgram(program)

  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW
  )

  const position = gl.getAttribLocation(program, 'position')
  gl.enableVertexAttribArray(position)
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

  const resolution = gl.getUniformLocation(program, 'uResolution')
  const phase = gl.getUniformLocation(program, 'uPhase')
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const loopMs = SHADER.loopSeconds * 1000
  const scale = 0.5

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
