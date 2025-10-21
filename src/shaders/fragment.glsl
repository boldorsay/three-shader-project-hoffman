// Fragment Shader
precision mediump float;

uniform float u_time;
// uniform float progress;
// uniform sampler2D u_texture;
uniform vec4 u_res;
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vColor;

const float PI = 3.14159265358;

void main(){
    // Test simple avec une couleur basée sur les UV
    gl_FragColor = vec4(vUv, 0.0, 1.);
    gl_FragColor = vec4(vColor, 1.);
}