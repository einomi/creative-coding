precision highp float;

varying vec2 vTexCoord;

uniform sampler2D uTexture;
uniform sampler2D uTextureBrush;
uniform float uDiffusionFactor;
uniform float uPeriodFactor;

void main() {
  vec2 uv = vTexCoord;
  uv.y = 1.0 - uv.y;

  // distort
  uv.x +=
    uDiffusionFactor *
    sin(uPeriodFactor) *
    0.05 *
    cos(uPeriodFactor + uv.y * 30.0);
  uv.y += uDiffusionFactor * sin(uPeriodFactor) * 0.05 * cos(uPeriodFactor);

  // add the scaled down overlay brush texture
  vec4 brush = texture2D(uTextureBrush, uv);
  uv.x += brush.r * 0.003;
  uv.y += brush.g * 0.003;
  vec4 color = texture2D(uTexture, uv);
  // multiply by brush texture
  if (brush.r < 0.1) {
    color = vec4(vec3(1.0), 1.0);
  }

  gl_FragColor = color;
}
