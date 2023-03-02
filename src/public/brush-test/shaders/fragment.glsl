precision highp float;

varying vec2 vTexCoord;

uniform sampler2D uTexture;
uniform sampler2D uTextureBrush;
uniform float uDiffusionFactor;
uniform float uPeriodFactor;

// random number generator
// https://www.shadertoy.com/view/4djSRW
float rand(vec2 co) {
  return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = vTexCoord;
  uv.y = 1.0 - uv.y;

  // distort
  uv.x +=
    uDiffusionFactor *
    sin(uPeriodFactor + uv.y * 30.0) *
    0.05 *
    cos(uPeriodFactor + uv.y * 30.0);
  uv.y +=
    uDiffusionFactor *
    sin(uPeriodFactor + uv.x * 30.0) *
    0.05 *
    cos(uPeriodFactor + uv.x * 30.0);

  // add the scaled down overlay brush texture
  vec4 brush = texture2D(uTextureBrush, uv);
  uv.x += brush.r * 0.005;
  uv.y += brush.g * 0.005;

  vec4 color = texture2D(uTexture, uv);
  // multiply by brush texture
  if (brush.r < 0.3) {
    color = vec4(vec3(0.0), 1.0);
  }

  gl_FragColor = color;
}
