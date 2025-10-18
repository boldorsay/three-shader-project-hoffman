import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { createShaderGUI, createDefaultSettings } from './gui.js'
import { createShaderPlane, createNormalPlane } from './plane.js'
import uniforms from './uniforms.js'


const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.001, 20)
camera.position.set(0, 0, 5)

const renderer = new THREE.WebGLRenderer({
    alpha: false,
    antialias: false
})
renderer.setSize(innerWidth, innerHeight)
document.body.appendChild(renderer.domElement)

// Définir le fond noir comme dans l'exemple
scene.background = new THREE.Color('#000')



// Créer le plane avec shader
const shaderMesh = createShaderPlane()
scene.add(shaderMesh)

// Créer un plane normal pour reprendre l'espace
// const normalMesh = createNormalPlane()
// normalMesh.position.set(0, 0, 0) // Décaler pour ne pas se chevaucher
// scene.add(normalMesh)

// Créer les contrôles de caméra OrbitControls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.05
controls.enablePan = true
controls.enableRotate = true
controls.autoRotate = false

// Créer l'interface GUI
const settings = createDefaultSettings()
const gui = createShaderGUI(shaderMesh, settings)

window.addEventListener('mousemove', (e) => {
    uniforms.u_mouse.value.x = e.clientX / innerWidth
    uniforms.u_mouse.value.y = 1.0 - e.clientY / innerHeight
})

function animate(t) {
    uniforms.u_time.value = t * 0.001 * settings.timeSpeed

    // Mettre à jour les contrôles de caméra
    controls.update()

    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}
animate()
