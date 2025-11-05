import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { createShaderPlane } from './src/plane.js'
import uniforms from './src/uniforms.js'
import { createLights, createAmbientLight } from './src/light.js'

// Données du carrousel
const carouselData = [
    {
        title: 'Mai 2024',
        text: `<p>Contenu à venir...</p>`,
        images: ['/imgP5/IMG_001.jpg', '/imgP5/IMG_002.jpg', '/imgP5/IMG_003.jpg'],
        date: 'Mai 2024'
    },
    {
        title: 'Sénégal - Novembre 2024',
        text: `<p>En novembre 2024, dans le cadre de la 15e édition de la Biennale de Dakar et en partenariat avec la Direction du Patrimoine Culturel du Ministère de la Culture du Sénégal, nous avons organisé :</p>
        <p>Un séminaire sur les approches théoriques et pratiques de la conservation et de la préservation des œuvres d'art, tenu au sein de la Direction du Patrimoine Culture. Ce programme de formation s'est déroulé sur une semaine, combinant théorie et pratique, et a réuni des responsables, conservateurs et techniciens de diverses institutions de Dakar et d'autres régions du Sénégal.</p>
        <p>Un atelier sur les techniques artistiques, auquel ont participé une quarantaine d'artistes venus de Dakar, du Sénégal ou d'autres pays africains.</p>
        <p>Un Talk consacré aux enjeux de la conservation et de la préservation de l'art contemporain et du patrimoine culturel africain, réunissant sept intervenants de la scène artistique sénégalaise et internationale.</p>`,
        images: ['/imgP5/IMG_004.jpg', '/imgP5/IMG_005.jpg', '/imgP5/IMG_006.jpg', '/imgP5/IMG_007.jpg'],
        date: 'Novembre 2024'
    },
    {
        title: 'Sénégal - Mai 2025',
        text: `<p>En mai 2025, nous avons été invités pour donner :</p>
        <p>Un cours de sensibilisation sur les techniques artistiques à l'Ecole Nationale des Arts et Métiers de la Culture à Dakar.</p>`,
        images: ['/imgP5/IMG_008.jpg', '/imgP5/IMG_009.jpg', '/imgP5/IMG_010.jpg'],
        date: 'Mai 2025'
    },
    {
        title: 'Bénin - Novembre 2025',
        text: `<p>En novembre 2025, nous avons été invités dans le cadre du festival artistique des Rencontres Contemporaines de Cotonou et de son programme scientifique pour diriger :</p>
        <p>Une Master Class traitant différentes thématiques autour des métiers d'art et des techniques artistiques à laquelle ont participé une vingtaine d'artistes en résidence ou venus du Bénin et des pays avoisinants.</p>`,
        images: ['/imgP5/IMG_011.jpg', '/imgP5/IMG_012.jpg', '/imgP5/IMG_013.jpg'],
        date: 'Novembre 2025'
    },
    {
        title: 'Mai 2026',
        text: `<p>Contenu à venir...</p>`,
        images: ['/imgP5/IMG_014.jpg', '/imgP5/IMG_015.jpg'],
        date: 'Mai 2026'
    }
]

// Données de l'équipe
const teamData = [
    {
        subtitle: 'Andrea Hoffmann Dobrynski – Présidente',
        bio: `<p>Titulaire d'un Master en Histoire de l'art de l'Université de Genève, Andrea Hoffmann Dobrynski débute sa carrière chez Sotheby's à Genève avant de se spécialiser dans la conservation-restauration de tableaux. Forte de plus de 30 ans d'expérience, elle est la fondatrice et directrice de l'atelier Hoffmann Art Management, où elle met sa passion et son expertise au service de ses clients. Elle participe également à des projets de protection et de sauvegarde du patrimoine, notamment dans le cadre de la rénovation du Palais des Nations de l'ONU à Genève.</p>
        <p>Membre active de la MAG (Association des Métiers d'Art Genève), elle préside la SAMAH (Société des Amis du Musée d'Art et d'Histoire de Genève) de 2018 à 2022. Depuis 2021, elle enseigne l'art de la restauration à la Haute Ecole de Gestion de Genève.</p>
        <p>Sa passion pour l'art africain l'a conduite à restaurer de nombreuses œuvres d'artistes africains établis et émergents, et elle est la restauratrice attitrée d'une des plus grandes collections privées d'art africain contemporain. En 2024, elle fonde ArtPulse Africa.</p>`,
        image: '/Equpie/Screenshot 2025-10-01 at 17.03.37.png'
    },
    {
        subtitle: 'Elisabeth Assal-Bouchardy – Vice-présidente',
        bio: `<p>Diplômée d'un Master en Relations internationales de l'IUHEI de Genève, Elisabeth Assal-Bouchardy commence sa carrière au Comité International de la Croix-Rouge, où elle travaille pendant sept ans, à Genève et à l'étranger. Elle poursuit ensuite sa carrière dans le secteur des institutions d'aide sociale avant de fonder sa propre société de conseils, Human Capital Partners, spécialisée dans la protection de la personnalité au travail.</p>
        <p>En 2015, elle crée la Green Flower Foundation, une organisation dédiée au développement durable. Elle initie deux projets en Ethiopie : la création d'un programme de formation en maraîchage biologique et un soutien technique aux jeunes maraîchers se lançant dans cette activité.</p>
        <p>Fille de parents artistes peintres, Elisabeth Assal-Bouchardy nourrit depuis toujours un intérêt profond pour l'art, en particulier pour les métiers d'art, et participe activement au processus créatif.</p>`,
        image: '/Equpie/Screenshot 2025-10-01 at 17.03.41.png'
    },
    {
        subtitle: 'Dominique de Saint Pierre – Trésorière',
        bio: `<p>Après deux années d'études à Londres dans une école des beaux-arts, Dominique de Saint Pierre poursuit sa formation à l'Université de Genève, où elle obtient une licence en sciences commerciales et industrielles.</p>
        <p>Elle s'installe ensuite pendant dix ans au Texas, où elle entame sa carrière dans la finance. Elle y collabore notamment avec de grandes banques sud-américaines.</p>
        <p>De retour à Genève, elle évolue dans le secteur bancaire, occupant divers postes dans les domaines de la syndication, des clients institutionnels, des gérants indépendants, puis de la clientèle privée au sein de la banque Lombard Odier Darier Hentsch.</p>
        <p>Aujourd'hui, elle siège depuis plusieurs années au conseil d'administration du groupe Procimmo, un acteur majeur de la gestion de fonds immobiliers en Suisse.</p>
        <p>Elle occupe également le poste de trésorière de la Société des Amis du Musée d'art et d'histoire (MAH), a présidé le comité de la Fondation Otium (soutien aux personnes atteintes de cancer) et s'implique activement dans plusieurs autres organisations caritatives.</p>
        <p>Animée depuis toujours par une passion pour l'art, elle est aussi une collectionneuse invétérée.</p>`,
        image: '/Equpie/Screenshot 2025-10-01 at 17.03.48.png'
    }
]

// Classe adaptée de ShaderProject pour fonctionner dans le header
class HeaderShader {
    constructor(containerElement) {
        this.container = containerElement
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
        const headerRect = this.container.getBoundingClientRect()
        const width = headerRect.width || window.innerWidth
        const height = headerRect.height || window.innerHeight

        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(60, width / height, 0.001, 20)
        this.camera.position.set(-0.158, -0.102, 0.930)

        this.renderer = new THREE.WebGLRenderer({
            alpha: false,
            antialias: false
        })
        this.renderer.setSize(width, height)
        this.container.appendChild(this.renderer.domElement)

        this.scene.background = new THREE.Color('#fff')

        const lights = createLights()
        this.scene.add(lights)
        const ambientLight = createAmbientLight()
        this.scene.add(ambientLight)

        this.shaderMesh = createShaderPlane()
        this.scene.add(this.shaderMesh)

        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.enableDamping = false
        this.controls.dampingFactor = 0.05
        this.controls.enablePan = false
        this.controls.enableRotate = false
        this.controls.enableZoom = false
        this.controls.autoRotate = false
        // Fixer la caméra
        this.controls.target.set(0, 0, 0)
        this.controls.update()

        this.setupPalette()
        this.animate()
        window.addEventListener('resize', () => this.resize())
    }

    setupPalette() {
        let palette = []
        let listColors = [
            '#BC3A2C',
            '#EB8822',
            '#446332',
            '#40E0D0'
        ]

        for (let i = 0; i < listColors.length; i++) {
            palette.push(new THREE.Color(listColors[i]))
        }

        uniforms.u_palette.value = palette
    }

    animate() {
        this.animateId = requestAnimationFrame(() => this.animate())

        if (this.renderer && this.scene && this.camera) {
            this.timeSpeed += 0.0002
            uniforms.u_time.value = this.timeSpeed

            // Caméra fixe, pas besoin de mettre à jour les contrôles

            this.renderer.render(this.scene, this.camera)
        }
    }

    resize() {
        if (this.camera && this.renderer && this.container) {
            const headerRect = this.container.getBoundingClientRect()
            const width = headerRect.width || window.innerWidth
            const height = headerRect.height || window.innerHeight

            this.camera.aspect = width / height
            this.camera.updateProjectionMatrix()
            this.renderer.setSize(width, height)
        }
    }

    destroy() {
        if (this.animateId) {
            cancelAnimationFrame(this.animateId)
        }
        if (this.renderer) {
            this.renderer.dispose()
            if (this.renderer.domElement && this.renderer.domElement.parentNode) {
                this.renderer.domElement.parentNode.removeChild(this.renderer.domElement)
            }
        }
        if (this.controls) {
            this.controls.dispose()
        }
    }
}

// Classe adaptée de P5Canvas pour fonctionner dans la section P5
class P5CanvasSection {
    constructor(containerElement) {
        this.container = containerElement
        this.canvas = null
        this.ctx = null
        this.loadedImages = []
        this.currentIndex = 0
        this.steps = 0
        this.mouseX = 0
        this.mouseY = 0
        this.imageSize = 260
        this.visibleImages = []
        this.animationId = null
        this.lastMouseMove = Date.now()

        this.init()
    }

    init() {
        this.container.style.display = 'block'
        this.container.innerHTML = ''

        this.createCanvas()
        this.createStyles()
        this.loadImages()

        this.container.addEventListener('mousemove', (e) => this.manageMouseMove(e))
        window.addEventListener('resize', () => this.handleResize())
        this.animate()
    }

    createCanvas() {
        this.canvas = document.createElement('canvas')
        const sectionRect = this.container.closest('.p5-section').getBoundingClientRect()
        const width = sectionRect.width || window.innerWidth
        const height = (sectionRect.height || window.innerHeight) * 0.8 // 80% de la hauteur
        this.canvas.width = width
        this.canvas.height = height
        this.canvas.style.cursor = 'none'
        this.container.appendChild(this.canvas)
        this.ctx = this.canvas.getContext('2d')
    }

    createStyles() {
        if (document.getElementById('p5-section-styles')) return

        const style = document.createElement('style')
        style.id = 'p5-section-styles'
        style.textContent = `
            #p5-container .pulse-art-title {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-family: 'Inter', sans-serif;
                font-size: 10rem;
                font-weight: 900;
                color: #000;
                z-index: 1;
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


    loadImages() {
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
                    console.log('Toutes les images P5 sont chargées !')
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

        if (this.steps >= this.currentIndex * 220 && this.loadedImages.length > 0) {
            this.addImage(clientX, clientY)
        }

        if (this.currentIndex >= this.loadedImages.length) {
            this.currentIndex = 0
            this.steps = -120
        }
    }

    addImage(x, y) {
        if (this.loadedImages.length === 0) return

        const imageData = this.loadedImages[this.currentIndex]
        const now = Date.now()

        const imageObject = {
            image: imageData.image,
            x: x,
            y: y,
            width: imageData.width,
            height: imageData.height,
            startTime: now,
            fadeStartTime: now + 100,
            fadeDuration: 3500,
            isVisible: true
        }

        this.visibleImages.push(imageObject)
        this.currentIndex++
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate())

        if (!this.canvas || !this.ctx) return

        this.ctx.fillStyle = '#ffffff'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

        // Dessiner le texte dans le canvas
        this.drawText()

        const now = Date.now()

        for (let i = this.visibleImages.length - 1; i >= 0; i--) {
            const imgData = this.visibleImages[i]
            let opacity = 1
            if (now >= imgData.fadeStartTime) {
                const fadeProgress = (now - imgData.fadeStartTime) / imgData.fadeDuration
                opacity = Math.max(0, 1 - fadeProgress)
            }

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

            if (opacity <= 0) {
                imgData.isVisible = false
                this.visibleImages.splice(i, 1)
            }
        }
    }

    drawText() {
        const canvasWidth = this.canvas.width
        const canvasHeight = this.canvas.height
        const gridMargin = 58 // Marge de la grille
        const gridGutter = 20 // Gutter entre colonnes
        const totalColumns = 8
        const columnWidth = (canvasWidth - 2 * gridMargin - (totalColumns - 1) * gridGutter) / totalColumns

        // Calculer les positions pour le texte (4 colonnes centrées, colonnes 3 à 7)
        const textStartCol = 3 // Colonne 3 (0-indexed serait 2, mais on compte de 1 à 8)
        const textWidth = 4 * columnWidth + 3 * gridGutter // 4 colonnes + 3 gutters
        const textX = gridMargin + (textStartCol - 1) * (columnWidth + gridGutter)

        // Position verticale du texte (centré verticalement dans la section visible)
        const paddingTop = 120
        const logoY = paddingTop + 60
        const textY = logoY + 120 // Espacement après le logo

        // Dessiner le logo "ArtPulse" centré avec "Art" en bold et "Pulse" en regular
        this.ctx.save()
        this.ctx.textBaseline = 'top'
        this.ctx.textAlign = 'left'

        // Taille de police plus grosse
        const logoFontSize = '7rem'

        // Mesurer "Art" en bold
        this.ctx.font = `700 ${logoFontSize} "Expletus Sans", sans-serif`
        const artText = 'Art'
        const artMetrics = this.ctx.measureText(artText)
        const artWidth = artMetrics.width

        // Mesurer "Pulse" en regular
        this.ctx.font = `400 ${logoFontSize} "Expletus Sans", sans-serif`
        const pulseText = 'Pulse'
        const pulseMetrics = this.ctx.measureText(pulseText)
        const pulseWidth = pulseMetrics.width

        // Calculer la position pour centrer le texte complet
        const totalWidth = artWidth + pulseWidth
        const startX = canvasWidth / 2 - totalWidth / 2

        // Créer un gradient linéaire horizontal du turquoise au rouge
        const gradient = this.ctx.createLinearGradient(startX, logoY, startX + totalWidth, logoY)
        gradient.addColorStop(0, '#02CDA8') // Turquoise à gauche
        gradient.addColorStop(1, '#AE3407') // Rouge à droite

        // Appliquer le gradient
        this.ctx.fillStyle = gradient

        // Dessiner "Art" en bold
        this.ctx.font = `700 ${logoFontSize} "Expletus Sans", sans-serif`
        this.ctx.fillText(artText, startX, logoY)

        // Dessiner "Pulse" en regular juste après "Art" (avec le même gradient)
        this.ctx.font = `400 ${logoFontSize} "Expletus Sans", sans-serif`
        this.ctx.fillText(pulseText, startX + artWidth, logoY)

        this.ctx.restore()

        // Dessiner les deux colonnes de texte avec gradient
        this.ctx.save()
        this.ctx.font = '500 25px "Inter", sans-serif'
        this.ctx.textAlign = 'left'
        this.ctx.textBaseline = 'top'

        // Largeur d'une colonne de texte (2 colonnes sur 4)
        const textColumnWidth = 2 * columnWidth + gridGutter
        const lineHeight = 25 * 1.6 // font-size * line-height

        // Estimer la hauteur totale du texte pour créer le gradient vertical
        // On va calculer la hauteur approximative en fonction du nombre de mots
        const text1 = "Alors que l'art contemporain africain gagne en visibilité sur la scène internationale et que de nouveaux musées émergent sur le continent, la question de la préservation des œuvres devient cruciale. Le manque de formation spécialisée et la diversité des matériaux utilisés par les artistes rendent la conservation complexe mais essentielle."
        const text2 = "ArtPulse Africa œuvre à sensibiliser les artistes, artisans et acteurs culturels aux enjeux de la conservation et de la transmission du patrimoine."

        // Calculer la hauteur approximative du texte
        const text1Lines = Math.ceil(this.estimateTextLines(text1, textColumnWidth))
        const text2Lines = Math.ceil(this.estimateTextLines(text2, textColumnWidth))
        const maxLines = Math.max(text1Lines, text2Lines)
        const estimatedHeight = maxLines * lineHeight

        // Créer un gradient vertical pour chaque colonne (du turquoise en haut au rouge en bas)
        const gradient1 = this.ctx.createLinearGradient(textX, textY, textX, textY + estimatedHeight)
        gradient1.addColorStop(0, '#02CDA8') // Turquoise en haut
        gradient1.addColorStop(1, '#AE3407') // Rouge en bas

        const text2X = textX + textColumnWidth + gridGutter
        const gradient2 = this.ctx.createLinearGradient(text2X, textY, text2X, textY + estimatedHeight)
        gradient2.addColorStop(0, '#02CDA8') // Turquoise en haut
        gradient2.addColorStop(1, '#AE3407') // Rouge en bas

        // Dessiner la première colonne avec gradient
        this.ctx.fillStyle = gradient1
        this.wrapText(this.ctx, text1, textX, textY, textColumnWidth, lineHeight)

        // Dessiner la deuxième colonne avec gradient
        this.ctx.fillStyle = gradient2
        this.wrapText(this.ctx, text2, text2X, textY, textColumnWidth, lineHeight)

        this.ctx.restore()
    }

    estimateTextLines(text, maxWidth) {
        // Estimer le nombre de lignes en mesurant le texte
        const words = text.split(' ')
        let line = ''
        let lines = 1

        this.ctx.font = '500 25px "Inter", sans-serif'

        for (let i = 0; i < words.length; i++) {
            const testLine = line + words[i] + ' '
            const metrics = this.ctx.measureText(testLine)
            const testWidth = metrics.width

            if (testWidth > maxWidth && i > 0) {
                lines++
                line = words[i] + ' '
            } else {
                line = testLine
            }
        }
        return lines
    }

    wrapText(ctx, text, x, y, maxWidth, lineHeight) {
        const words = text.split(' ')
        let line = ''
        let currentY = y

        for (let i = 0; i < words.length; i++) {
            const testLine = line + words[i] + ' '
            const metrics = ctx.measureText(testLine)
            const testWidth = metrics.width

            if (testWidth > maxWidth && i > 0) {
                ctx.fillText(line, x, currentY)
                line = words[i] + ' '
                currentY += lineHeight
            } else {
                line = testLine
            }
        }
        ctx.fillText(line, x, currentY)
    }

    handleResize() {
        if (this.canvas && this.container) {
            const sectionRect = this.container.closest('.p5-section').getBoundingClientRect()
            const width = sectionRect.width || window.innerWidth
            const height = (sectionRect.height || window.innerHeight) * 0.8 // 80% de la hauteur
            this.canvas.width = width
            this.canvas.height = height
        }
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId)
        }
        if (this.container) {
            this.container.style.display = 'none'
            this.container.innerHTML = ''
        }
    }
}

// Gestionnaire du slider d'images
class ImageSlider {
    constructor(trackElement, containerElement) {
        this.track = trackElement
        this.container = containerElement
        this.currentSlideIndex = 0
        this.currentProjectImages = []
        this.init()
    }

    init() {
        if (!this.container) return

        // Gérer le mouvement de la souris pour changer le curseur
        this.container.addEventListener('mousemove', (e) => {
            const rect = this.container.getBoundingClientRect()
            const mouseX = e.clientX - rect.left
            const percentage = (mouseX / rect.width) * 100

            // Retirer les classes précédentes
            this.container.classList.remove('cursor-left', 'cursor-right')

            // Si la souris est à gauche de 50%, curseur gauche
            if (percentage < 50) {
                this.container.classList.add('cursor-left')
            } else {
                // Si la souris est à droite de 50%, curseur droite
                this.container.classList.add('cursor-right')
            }
        })

        // Gérer le clic pour naviguer
        this.container.addEventListener('click', (e) => {
            const rect = this.container.getBoundingClientRect()
            const mouseX = e.clientX - rect.left
            const percentage = (mouseX / rect.width) * 100

            if (percentage < 50) {
                this.previous()
            } else {
                this.next()
            }
        })

        // Retirer le curseur personnalisé quand la souris quitte
        this.container.addEventListener('mouseleave', () => {
            this.container.classList.remove('cursor-left', 'cursor-right')
        })
    }

    setImages(images) {
        this.currentProjectImages = images
        this.currentSlideIndex = 0
        this.render()
    }

    render() {
        if (!this.track) return

        this.track.innerHTML = ''
        this.currentProjectImages.forEach((imageSrc, index) => {
            const slide = document.createElement('div')
            slide.className = 'image-slider-slide'
            const img = document.createElement('img')
            img.src = imageSrc
            img.alt = `Project image ${index + 1}`
            slide.appendChild(img)
            this.track.appendChild(slide)
        })

        this.updatePosition()
    }

    previous() {
        if (this.currentProjectImages.length === 0) return
        this.currentSlideIndex = (this.currentSlideIndex - 1 + this.currentProjectImages.length) % this.currentProjectImages.length
        this.updatePosition()
    }

    next() {
        if (this.currentProjectImages.length === 0) return
        this.currentSlideIndex = (this.currentSlideIndex + 1) % this.currentProjectImages.length
        this.updatePosition()
    }

    updatePosition() {
        if (this.track) {
            const translateX = -this.currentSlideIndex * 100
            this.track.style.transform = `translateX(${translateX}%)`
        }
    }
}

// Gestionnaire du carrousel
class CarouselManager {
    constructor(imageSlider1, imageSlider2) {
        this.currentIndex = 0
        this.imageSlider1 = imageSlider1
        this.imageSlider2 = imageSlider2
        this.init()
    }

    init() {
        const prevBtn = document.getElementById('carousel-prev')
        const nextBtn = document.getElementById('carousel-next')
        const timelineDates = document.querySelectorAll('.timeline-date')

        if (prevBtn) prevBtn.addEventListener('click', () => {
            this.previous()
        })
        if (nextBtn) nextBtn.addEventListener('click', () => {
            this.next()
        })

        timelineDates.forEach((dateBtn, index) => {
            dateBtn.addEventListener('click', () => {
                this.goTo(index)
            })
        })

        this.updateCarousel()
    }

    previous() {
        this.currentIndex = (this.currentIndex - 1 + carouselData.length) % carouselData.length
        this.updateCarousel()
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % carouselData.length
        this.updateCarousel()
    }

    goTo(index) {
        this.currentIndex = index
        this.updateCarousel()
    }

    updateCarousel() {
        const data = carouselData[this.currentIndex]
        const titleEl = document.getElementById('carousel-title')
        const textEl = document.getElementById('carousel-text')
        const timelineBar = document.getElementById('timeline-bar')
        const timelineDates = document.querySelectorAll('.timeline-date')

        if (titleEl) titleEl.textContent = data.title
        if (textEl) textEl.innerHTML = data.text

        // Mettre à jour les sliders d'images (diviser en deux groupes)
        if (data.images && data.images.length > 0) {
            // Diviser les images en deux groupes
            const midPoint = Math.ceil(data.images.length / 2)
            const images1 = data.images.slice(0, midPoint)
            const images2 = data.images.slice(midPoint)

            if (this.imageSlider1 && images1.length > 0) {
                this.imageSlider1.setImages(images1)
            }
            if (this.imageSlider2 && images2.length > 0) {
                this.imageSlider2.setImages(images2)
            }
        }

        // Calculer la position de la zone rouge active (5 projets = 20% chacun)
        const totalProjects = carouselData.length
        const projectWidth = 100 / totalProjects // 20% pour 5 projets

        // Position de la zone rouge active
        let activeStart = this.currentIndex * projectWidth
        let activeEnd = (this.currentIndex + 1) * projectWidth

        // Pour le dernier projet, s'assurer qu'on va jusqu'à 100%
        if (this.currentIndex === totalProjects - 1) {
            activeEnd = 100
        }

        // Largeur du dégradé (8% de chaque côté)
        const gradientWidth = 8

        // Créer le gradient directement sur la barre
        // Le gradient va de turquoise → rouge (avec dégradé) → turquoise
        const gradient = `linear-gradient(to right,
            #40E0D0 0%,
            #40E0D0 ${Math.max(0, activeStart - gradientWidth)}%,
            #40E0D0 ${activeStart}%,
            #BC3A2C ${activeStart + gradientWidth}%,
            #BC3A2C ${Math.max(activeStart + gradientWidth, activeEnd - gradientWidth)}%,
            #40E0D0 ${activeEnd}%,
            #40E0D0 100%)`

        if (timelineBar) {
            timelineBar.style.background = gradient
        }

        timelineDates.forEach((btn, index) => {
            const isActive = index === this.currentIndex
            btn.classList.toggle('active', isActive)
        })
    }
}

// Gestionnaire de l'équipe
class TeamManager {
    constructor() {
        this.currentIndex = 0
        this.init()
    }

    init() {
        const thumbnails = document.querySelectorAll('.team-thumbnail')
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => this.switchTo(index))
        })
    }

    switchTo(index) {
        this.currentIndex = index
        const data = teamData[index]
        const subtitleEl = document.getElementById('team-subtitle')
        const bioEl = document.getElementById('team-bio')
        const imageEl = document.getElementById('team-main-image')
        const thumbnails = document.querySelectorAll('.team-thumbnail')

        if (subtitleEl) subtitleEl.textContent = data.subtitle
        if (bioEl) bioEl.innerHTML = data.bio
        if (imageEl) imageEl.src = data.image

        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index)
        })
    }
}

// Initialisation des composants
document.addEventListener('DOMContentLoaded', () => {
    // Initialiser le shader dans le header
    const headerElement = document.getElementById('header-shader')
    if (headerElement) {
        const headerShader = new HeaderShader(headerElement)
    }

    // Initialiser P5 dans la section P5
    const p5Container = document.getElementById('p5-container')
    if (p5Container) {
        const p5Canvas = new P5CanvasSection(p5Container)
    }

    // Initialiser les deux sliders d'images
    const sliderTrack1 = document.getElementById('image-slider-track-1')
    const sliderContainer1 = document.getElementById('slider-container-1')
    const sliderTrack2 = document.getElementById('image-slider-track-2')
    const sliderContainer2 = document.getElementById('slider-container-2')

    const imageSlider1 = (sliderTrack1 && sliderContainer1) ? new ImageSlider(sliderTrack1, sliderContainer1) : null
    const imageSlider2 = (sliderTrack2 && sliderContainer2) ? new ImageSlider(sliderTrack2, sliderContainer2) : null

    // Initialiser le carrousel
    const carouselManager = new CarouselManager(imageSlider1, imageSlider2)

    // Initialiser l'équipe
    const teamManager = new TeamManager()
})
