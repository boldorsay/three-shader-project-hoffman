import * as THREE from 'three'


const uniforms = {
    u_time: { value: 0 },
    u_res: { value: new THREE.Vector2(innerWidth, innerHeight) },
    u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
    u_height: { value: 0.9 },
    u_params: { value: new THREE.Vector4(2.0, 2.0, 0.0, 1.0) },
    u_params2: { value: new THREE.Vector4(0.5, 1.0, 1.0, 0.0) },
    u_altparams: { value: new THREE.Vector4(1.0, 0.0, 0.0, 0.0) },
    u_color2: { value: new THREE.Color(0x0000ff) },
    u_color1: { value: new THREE.Color(0xff0000) },
    u_mode: { value: 0 },
    u_swap: { value: 0 },
}

export default uniforms