import * as THREE from 'three'


const uniforms = {
    u_time: { value: 0 },
    u_res: { value: new THREE.Vector4() },
    u_palette: { value: [] },
}

export default uniforms 