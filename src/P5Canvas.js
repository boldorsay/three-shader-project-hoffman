export class P5Canvas {
    constructor() {
        this.container = null
        this.canvas = null
        this.ctx = null
        this.images = []
        this.loadedImages = []
        this.currentIndex = 0
        this.steps = 0
        this.mouseX = 0
        this.mouseY = 0
        this.imageSize = 80 // Beaucoup plus petites
        this.visibleImages = []
        this.animationId = null
        this.lastMouseMove = Date.now()
        this.mouseIdleTime = 2000 // 2 secondes d'inactivité

        this.init()
    }

    init() {
        this.container = document.getElementById('p5-container')
        this.container.style.display = 'block'
        this.container.innerHTML = ''

        // Créer le canvas
        this.createCanvas()

        // Créer le style CSS
        this.createStyles()

        // Ajouter le titre "Pulse Art"
        this.createTitle()

        // Charger toutes les images
        this.loadImages()

        // Ajouter les événements
        this.container.addEventListener('mousemove', (e) => this.manageMouseMove(e))
        window.addEventListener('resize', () => this.handleResize())

        // Démarrer l'animation
        this.animate()
    }

    createCanvas() {
        this.canvas = document.createElement('canvas')
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.canvas.style.cursor = 'none'
        this.container.appendChild(this.canvas)
        this.ctx = this.canvas.getContext('2d')
    }

    createStyles() {
        const style = document.createElement('style')
        style.textContent = `
            #p5-container {
                position: relative;
                width: 100vw;
                height: 100vh;
                background: #fff;
                overflow: hidden;
                cursor: none;
            }
            
            #p5-container canvas {
                display: block;
            }
            
            .pulse-art-title {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-family: 'Inter', 'Arial Black', Arial, sans-serif;
                font-size: 8rem;
                font-weight: 900;
                color: #000;
                z-index: 0;
                pointer-events: none;
                opacity: 0.05;
                letter-spacing: 0.2em;
                text-transform: uppercase;
                text-align: center;
                line-height: 1;
                white-space: nowrap;
            }
        `
        document.head.appendChild(style)
    }

    createTitle() {
        const title = document.createElement('div')
        title.className = 'pulse-art-title'
        title.textContent = 'Pulse Art'
        this.container.appendChild(title)
    }

    loadImages() {
        // Charger les 40 images
        let loadedCount = 0
        const totalImages = 40

        for (let i = 1; i <= totalImages; i++) {
            const img = new Image()
            img.crossOrigin = 'anonymous'
            img.onload = () => {
                loadedCount++
                this.loadedImages.push({
                    image: img,
                    width: this.calculateImageWidth(img),
                    height: this.calculateImageHeight(img)
                })

                if (loadedCount === totalImages) {
                    console.log('Toutes les images sont chargées !')
                }
            }
            img.onerror = () => {
                console.warn(`Erreur de chargement de l'image ${i}`)
                loadedCount++
            }
            img.src = `/imgP5/IMG_${i.toString().padStart(3, '0')}.jpg`
        }
    }

    calculateImageWidth(img) {
        const aspectRatio = img.naturalWidth / img.naturalHeight
        return aspectRatio > 1 ? this.imageSize : this.imageSize * aspectRatio
    }

    calculateImageHeight(img) {
        const aspectRatio = img.naturalWidth / img.naturalHeight
        return aspectRatio > 1 ? this.imageSize / aspectRatio : this.imageSize
    }

    manageMouseMove(e) {
        const { clientX, clientY, movementX, movementY } = e

        this.mouseX = clientX
        this.mouseY = clientY
        this.lastMouseMove = Date.now()

        this.steps += Math.abs(movementX) + Math.abs(movementY)

        if (this.steps >= this.currentIndex * 30 && this.loadedImages.length > 0) {
            this.addImage(clientX, clientY)
        }

        if (this.currentIndex >= this.loadedImages.length) {
            this.currentIndex = 0
            this.steps = -30
        }
    }

    addImage(x, y) {
        if (this.loadedImages.length === 0) return

        const imageData = this.loadedImages[this.currentIndex]
        const now = Date.now()

        // Créer un objet image avec son propre cycle de vie
        const imageObject = {
            image: imageData.image,
            x: x,
            y: y,
            width: imageData.width,
            height: imageData.height,
            startTime: now,
            fadeStartTime: now + 100, // Commencer le fade après 3 secondes
            fadeDuration: 1500, // Fade sur 3 secondes
            isVisible: true
        }

        // Ajouter l'image aux images visibles
        this.visibleImages.push(imageObject)
        this.currentIndex++
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate())

        // Effacer le canvas avec fond blanc
        this.ctx.fillStyle = '#ffffff'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

        const now = Date.now()

        // Dessiner toutes les images visibles
        for (let i = this.visibleImages.length - 1; i >= 0; i--) {
            const imgData = this.visibleImages[i]

            // Calculer l'opacité pour cette image spécifique
            let opacity = 1
            if (now >= imgData.fadeStartTime) {
                const fadeProgress = (now - imgData.fadeStartTime) / imgData.fadeDuration
                opacity = Math.max(0, 1 - fadeProgress)
            }

            // Dessiner l'image avec l'opacité seulement si elle est visible
            if (opacity > 0 && imgData.isVisible) {
                this.ctx.save()
                this.ctx.globalAlpha = opacity
                this.ctx.drawImage(
                    imgData.image,
                    imgData.x - imgData.width / 2,
                    imgData.y - imgData.height / 2,
                    imgData.width,
                    imgData.height
                )
                this.ctx.restore()
            }

            // Marquer l'image comme invisible et la supprimer si elle est complètement transparente
            if (opacity <= 0) {
                imgData.isVisible = false
                this.visibleImages.splice(i, 1)
            }
        }
    }

    handleResize() {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId)
        }

        if (this.container) {
            this.container.style.display = 'none'
            this.container.innerHTML = ''
        }

        // Nettoyer les styles
        const styles = document.querySelectorAll('style')
        styles.forEach(style => {
            if (style.textContent.includes('#p5-container')) {
                style.remove()
            }
        })
    }

    resize() {
        this.handleResize()
    }
}