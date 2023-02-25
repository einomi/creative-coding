precision highp float;

varying vec2 vTexCoord;

uniform sampler2D uTexture;
uniform sampler2D uTextureBrush;

void main() {
  vec2 uv = vTexCoord;
  uv.y = 1.0 - uv.y;

  // distort
  uv.x += sin(uv.y * 10.0) * 0.01;
  uv.y = uv.y + 0.1 * cos(uv.x * 10.0);

  // add the scaled down overlay brush texture
  vec4 brush = texture2D(uTextureBrush, uv);
  uv.x += brush.r * 0.005;
  uv.y += brush.g * 0.005;

  vec4 color = texture2D(uTexture, uv);
  // multiply by brush texture
  if (brush.r < 0.5) {
    color = vec4(vec3(0.1), 1.0);
  }

  gl_FragColor = color;
}
