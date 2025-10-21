import * as THREE from 'three'

export function createLights() {
    const light = new THREE.DirectionalLight(0xffffff, 0.5)
    light.position.set(10, 10, 10)
    return light
}

export function createAmbientLight() {
    const light = new THREE.AmbientLight(0xffffff, 0.5)
    return light
}

