export const SHADER = {
  title: 'Twoje wnętrze zasługuje na wyjątkowe światło',
  cta: { label: 'Kup teraz', href: '#' },
  note: 'Od 119 zł na oficjalnej stronie producenta SOLLUX',
  loopSeconds: 24,
  resolutionScale: 0.5,
  reducedMotionQuery: '(prefers-reduced-motion: reduce)',
  context: { antialias: false, alpha: false },
  quad: [-1, -1, 1, -1, -1, 1, 1, 1]
}

export const VERTEX = `
attribute vec2 position;
void main () {
  gl_Position = vec4(position, 0.0, 1.0);
}`

export const FRAGMENT = `
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
