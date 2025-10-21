import * as THREE from 'three'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import uniforms from './uniforms.js'

export function createShaderPlane() {
    // Calculer les dimensions du plane
    // const viewportWidth = innerWidth
    // const viewportHeight = innerHeight
    // const planeWidth = Math.round(viewportWidth + 2)
    // const planeHeight = Math.round(viewportHeight * 2)
    // const planeSize = Math.max(planeWidth, planeHeight)
    // // Limiter le nombre de segments pour éviter l'erreur de mémoire
    // const planeSegments = Math.min(Math.round(planeSize * 0.1), 64)

    // Créer le matériau shader
    const mat = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        wireframe: false,
    })

    // Créer le mesh avec la géométrie calculée
    const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(
            3,
            3,
            300,
            300
        ),
        mat
    )

    // Positionner et orienter le plane pour qu'il soit visible
    mesh.position.set(0, 0, 0)
    mesh.rotation.set(0, 0, 0)

    return mesh
}

export function createNormalPlane() {
    // Créer un plane normal pour reprendre l'espace
    const geometry = new THREE.PlaneGeometry(1,
        1,
        300,
        300)
    const material = new THREE.MeshNormalMaterial({
        wireframe: false,
        side: THREE.DoubleSide
    })

    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(0, 0, 0)
    mesh.rotation.set(0, 0, 0)

    return mesh
}
