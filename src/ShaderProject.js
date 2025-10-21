import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { createShaderPlane } from './plane.js'
import uniforms from './uniforms.js'
import { createLights, createAmbientLight } from './light.js'

export class ShaderProject {
    constructor() {
        this.scene = null
        this.camera = null
        this.renderer = null
        this.controls = null
        this.shaderMesh = null
        this.animateId = null
        this.timeSpeed = 0.0

        this.init()
    }

    init() {
        // Créer la scène
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.001, 20)
        this.camera.position.set(-0.158, -0.102, 0.930)


        // Créer le renderer
        this.renderer = new THREE.WebGLRenderer({
            alpha: false,
            antialias: false
        })
        this.renderer.setSize(innerWidth, innerHeight)
        document.body.appendChild(this.renderer.domElement)

        // Définir le fond
        this.scene.background = new THREE.Color('#fff')

        // Créer les lumières
        const lights = createLights()
        this.scene.add(lights)
        const ambientLight = createAmbientLight()
        this.scene.add(ambientLight)

        // Créer le plane avec shader
        this.shaderMesh = createShaderPlane()
        this.scene.add(this.shaderMesh)

        // Créer les contrôles de caméra
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.enableDamping = true
        this.controls.dampingFactor = 0.05
        this.controls.enablePan = true
        this.controls.enableRotate = true
        this.controls.autoRotate = false

        // Configurer la palette
        this.setupPalette()

        // Démarrer l'animation
        this.animate()

        // Ajouter les contrôles de debug
        this.addDebugControls()
    }

    setupPalette() {
        let palette = []
        let listColors = [
            '#BC3A2C',
            '#EB8822',
            '#446332',
            '#231F20'
        ]

        for (let i = 0; i < listColors.length; i++) {
            let colorGradient = listColors[i]
            palette.push(new THREE.Color(colorGradient))
        }

        uniforms.u_palette.value = palette
    }

    animate() {
        this.animateId = requestAnimationFrame(() => this.animate())

        this.timeSpeed += 0.0002
        uniforms.u_time.value = this.timeSpeed

        // Mettre à jour les contrôles de caméra
        this.controls.update()

        this.renderer.render(this.scene, this.camera)
    }

    addDebugControls() {
        // Ajouter des raccourcis clavier pour capturer la position de la caméra
        document.addEventListener('keydown', (e) => {
            if (e.key === 'c' || e.key === 'C') {
                this.logCameraPosition()
            }
            if (e.key === 'r' || e.key === 'R') {
                this.resetCamera()
            }
        })

        console.log('🎥 Contrôles de caméra:')
        console.log('• Appuyez sur C pour capturer la position de la caméra')
        console.log('• Appuyez sur R pour réinitialiser la caméra')
    }

    logCameraPosition() {
        const position = this.camera.position
        const target = this.controls.target

        console.log('📷 Position de la caméra capturée:')
        console.log('Position:', position)
        console.log('Target:', target)
        console.log('')
        console.log('💾 Code à copier-coller:')
        console.log(`camera.position.set(${position.x.toFixed(3)}, ${position.y.toFixed(3)}, ${position.z.toFixed(3)})`)
        console.log(`controls.target.set(${target.x.toFixed(3)}, ${target.y.toFixed(3)}, ${target.z.toFixed(3)})`)
        console.log('')
        console.log('🔧 Code complet pour restaurer:')
        console.log(`// Restaurer la position de la caméra`)
        console.log(`this.camera.position.set(${position.x.toFixed(3)}, ${position.y.toFixed(3)}, ${position.z.toFixed(3)})`)
        console.log(`this.controls.target.set(${target.x.toFixed(3)}, ${target.y.toFixed(3)}, ${target.z.toFixed(3)})`)
        console.log(`this.controls.update()`)
    }

    resetCamera() {
        this.camera.position.set(0, 0, 1)
        this.controls.target.set(0, 0, 0)
        this.controls.update()
        console.log('🔄 Caméra réinitialisée à la position par défaut')
    }

    destroy() {
        if (this.animateId) {
            cancelAnimationFrame(this.animateId)
        }

        if (this.renderer) {
            this.renderer.dispose()
            if (this.renderer.domElement.parentNode) {
                this.renderer.domElement.parentNode.removeChild(this.renderer.domElement)
            }
        }

        if (this.controls) {
            this.controls.dispose()
        }
    }

    resize() {
        if (this.camera && this.renderer) {
            this.camera.aspect = innerWidth / innerHeight
            this.camera.updateProjectionMatrix()
            this.renderer.setSize(innerWidth, innerHeight)
        }
    }
}
