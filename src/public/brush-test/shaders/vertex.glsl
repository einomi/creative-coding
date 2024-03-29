attribute vec3 aPosition;
attribute vec2 aTexCoord;

varying vec2 vTexCoord;

void main() {
  // copy the texcoords
  vTexCoord = aTexCoord;

  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

  // send the vertex information on to the fragment shader
  gl_Position = positionVec4;
}
