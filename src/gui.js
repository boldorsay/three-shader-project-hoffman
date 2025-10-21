import { GUI } from 'lil-gui'
import uniforms from './uniforms.js'


export function createShaderGUI(mesh, settings) {
    const gui = new GUI()
    gui.title('Shader Controls')

    // === Paramètres principaux ===
    const mainFolder = gui.addFolder('Main Parameters')
    mainFolder.add(settings, 'multx', 0, 10, 0.01).name('multx').onChange(v => {
        uniforms.u_params.value.x = v
    })
    mainFolder.add(settings, 'multy', 0, 10, 0.01).name('multy').onChange(v => {
        uniforms.u_params.value.y = v
    })
    mainFolder.add(settings, 'hue', -3.14, 3.14, 0.01).name('hue').onChange(v => {
        uniforms.u_params.value.z = v
    })
    mainFolder.add(settings, 'brightness', 0, 2, 0.01).name('brightness').onChange(v => {
        uniforms.u_params.value.w = v
    })

    // === Paramètres secondaires ===
    const secondFolder = gui.addFolder('Secondary Parameters')
    secondFolder.add(settings, 'mouse', 0, 2, 0.01).name('mouse').onChange(v => {
        uniforms.u_params2.value.x = v
    })
    secondFolder.add(settings, 'scale', 0.1, 50, 0.01).name('scale').onChange(v => {
        uniforms.u_params2.value.y = v
    })
    secondFolder.add(settings, 'noise', 0, 2, 0.01).name('noise').onChange(v => {
        uniforms.u_params2.value.z = v
    })
    secondFolder.add(settings, 'bw', 0, 1, 0.01).name('bw').onChange(v => {
        uniforms.u_params2.value.w = v
    })

    // === Contrôle du temps ===
    const timeFolder = gui.addFolder('Time Control')
    timeFolder.add(settings, 'timeSpeed', 0, 3, 0.01).name('time speed')

    // === Couleurs ===
    const colorFolder = gui.addFolder('Colors')
    colorFolder.addColor(settings, 'color1').name('color1').onChange(v => {
        uniforms.u_color1.value.set(v)
    })
    colorFolder.addColor(settings, 'color2').name('color2').onChange(v => {
        uniforms.u_color2.value.set(v)
    })

    // === Autres paramètres ===
    const otherFolder = gui.addFolder('Other')
    otherFolder.add(settings, 'height', 0, 2, 0.01).name('height').onChange(v => {
        uniforms.u_height.value = v
    })

    // === Position et Rotation du Plane ===
    const transformFolder = gui.addFolder('Plane Transform')
    transformFolder.add(settings, 'positionX', -10, 10, 0.1).name('Position X').onChange(v => {
        mesh.position.x = v
    })
    transformFolder.add(settings, 'positionY', -10, 10, 0.1).name('Position Y').onChange(v => {
        mesh.position.y = v
    })
    transformFolder.add(settings, 'positionZ', -10, 10, 0.1).name('Position Z').onChange(v => {
        mesh.position.z = v
    })
    transformFolder.add(settings, 'rotationX', -Math.PI, Math.PI, 0.01).name('Rotation X').onChange(v => {
        mesh.rotation.x = v
    })
    transformFolder.add(settings, 'rotationY', -Math.PI, Math.PI, 0.01).name('Rotation Y').onChange(v => {
        mesh.rotation.y = v
    })
    transformFolder.add(settings, 'rotationZ', -Math.PI, Math.PI, 0.01).name('Rotation Z').onChange(v => {
        mesh.rotation.z = v
    })

    // Ouvrir les dossiers importants
    mainFolder.open()
    colorFolder.open()
    transformFolder.open()

    return gui
}

export function createDefaultSettings() {
    return {
        // Paramètres principaux
        multx: 2.0,
        multy: 2.0,
        hue: 0.0,
        brightness: 1.0,

        // Paramètres secondaires
        mouse: 0.5,
        scale: 1.0,
        noise: 1.0,
        bw: 0.0,

        // Temps

        // Couleurs
        color1: '#ff0000',
        color2: '#0000ff',

        // Autres
        height: 0.9,

        // Position et rotation du plane
        positionX: 0,
        positionY: 0,
        positionZ: -8.8,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0
    }
}
