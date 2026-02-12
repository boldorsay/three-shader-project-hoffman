import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { createShaderPlane } from './src/plane.js'
import uniforms from './src/uniforms.js'
import { createLights, createAmbientLight } from './src/light.js'

// Données du carrousel
const carouselData = [
    {
        title: 'Mai 2024',
        text: `<p>Tout a commencé en mai 2024 la <span class="color-turquoise"> Direction du Patrimoine Culturel (DPC) </span> du Ministère de la Culture du Sénégal ainsi qu’avec avec un rendez-vous avec la direction de <span class="color-turquoise">l’Ecole Nationale des Arts et Métiers de la Culture (ENAMC)</span> à Dakar afin de proposer un atelier d’une journée sur les techniques artistiques.Ces entretiens ont abouti à la proposition d’un programme d’initiation et de sensibilisation – prévu pour novembre – sur la gestion des collections, les métiers d’art et les techniques artistiques, qui a rencontré un accueil très favorable.</p>`,
        images: [
            '/img-project/Mai 2024.jpg',
            { src: '/img-project/Direction Patrimoine National_Mai 2024.jpg', position: 'top' },
            '/img-project/Ecole Nationale Arts_Mai 2024.jpg'
        ],
        date: 'Mai 2024'
    },
    {
        title: 'Novembre 2024',
        text: `<p>Dans le cadre de la 15e édition de la Biennale de Dakar et en partenariat avec la Direction du Patrimoine Culturel du Ministère de la Culture du Sénégal, nous avons organisé :</p>
        <ul>
            <li><span class="color-turquoise">un séminaire sur les approches théoriques et pratiques de la conservation et de la préservation des œuvres d’art</span>, tenu au sein de la Direction du Patrimoine Culture. Ce programme de formation d’une semaine, combinant théorie et pratique, a réuni des responsables, conservateurs et techniciens de diverses institutions de Dakar et d’autres régions du Sénégal ;</li>
            <li><span class="color-black">un atelier sur les techniques artistiques</span>, auquel ont participé une quarantaine d’artistes venus de Dakar, du Sénégal ou d’autres pays africains ;</li>
            <li><span class="color-black">un talk consacré aux enjeux de la conservation </span> et de la préservation de l’art contemporain et du patrimoine culturel africain, réunissant sept intervenants de la scène artistique sénégalaise et internationale.</li>
        </ul>`,
        images: [
            '/img-project/Atelier Nov 2024.jpg',
            '/img-project/Atelier techniques artistiques_Nov 2024.jpg',
            '/img-project/Atelier techniques artistiques_Nov 2024_1.jpg',
            '/img-project/Atelier techniques artistiques_ Nov 2024_2.jpg'
        ],
        date: 'Novembre 2024'
    },
    {
        title: 'Mai 2025',
        text: `<p>En mai 2025, nous avons été invités à donner <span class="color-turquoise">un cours de sensibilisation sur les techniques artistiques</span> à <span class="color-black">l’Ecole Nationale des Arts et Métiers de la Culture</span> à Dakar.</p>
        <p>Un mois plus tard, nous avons voyagé au Bénin pour participer au festival artistique des <span class="color-turquoise">Rencontres Contemporaines de Cotonou</span>. Dans son programme scientifique, nous avons dirigé <span class="color-turquoise">une Master Class traitant différentes thématiques autour des métiers d’art et des techniques artistiques</span>, réunissant une vingtaine d’artistes en résidence ou venus du Bénin et des pays avoisinants.</p>`,
        images: [
            { src: '/img-project/Ecole Nationale Arts_Mai 2025_2.jpg', position: 'bottom' },
            '/img-project/Ecole Nationale Arts_Mai 2025_3.jpg',
            '/img-project/Ecole Nationale Arts_mai 2025.jpg'
        ],
        date: 'Mai 2025'
    },
    {
        title: 'Novembre 2025',
        text: `<p>Rencontres avec les doyens de <span class="color-turquoise">l’Université Cheikh Anta Diop, Dakar</span> et <span class="color-turquoise">l’Université Gaston Berger </span>, Saint Louis et définition d’un <span class="color-turquoise">programme pilote sur deux ans</span>, composé de modules théoriques et pratiques pour la formation en conservation-restauration d’œuvres d’art intégré au programme de Master.</p>`,
        images: [
            { src: '/img-project/Nov 2025_1.jpg', position: 'top' },
            '/img-project/Nov2025_2.jpg',
            '/img-project/Nov2025_3.jpg',
            '/img-project/Nov2025_4.jpg',

        ],
        date: 'Novembre 2025'
    },
    {
        title: 'Notre projet',
        text: `
        <p>Les objectifs pour 2026 :</p>
        <ul>
            <li>présenter le programme de formation en conservation-restauration d’œuvres d’art dans le programme scientifique et pédagogique du IN de la 16e édition de la Biennale de Dakar ;</li>
            <li>initier les protagonistes du secteur culturel et artistique du Sénégal et d’autres pays d’Afrique à la formation en conservation-restauration lors de deux semaines de cours intensifs à Dakar et Saint-Louis ;</li>
            <li>adapter en continu le contenu du projet aux besoins des acteurs du terrain.</li>
        </ul>`,
        images: [
            '/img-project/new/Futur_2.jpg',
            { src: '/img-project/new/Masterclass Benin_Mai 2025.jpg', position: 'top' },
        ],
        date: 'Futur'
    }
]

// Contenus pour la section Soutenir
const supportData = {
    intro: `
        <p>En tant qu’association, ArtPulse s’appuie sur les contributions de mécènes et sponsors, que ceux-ci soient des institutions publiques ou privées, des entreprises ou des particuliers souhaitant soutenir nos projets.</p>
        <p>Votre soutien permet de développer des programmes de formation, des ateliers, des master class et des actions de sensibilisation autour des métiers d’art et de la conservation-restauration d’œuvres d’art.</p>
        <p>Merci beaucoup pour votre soutien.</p>
    `,
    donations: `
        <p><strong>Donations</strong></p>
        <p>Le montant des donations est alloué en fonction des besoins et des projets en cours. Chaque contribution, quel que soit son montant, est précieuse pour soutenir nos actions.</p>
        <p><strong>Par virement bancaire</strong><br>Compte PostFinance CHF<br>Compte PostFinance EUR</p>
        <p><strong>Avec Paypal</strong><br><strong>Par TWINT</strong></p>
    `,
    'pack-50': `
        <p><strong>Pack 50 CHF</strong></p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ce pack symbolique contribue à soutenir une partie des coûts liés à la logistique et au matériel pédagogique.</p>
    `,
    'pack-100': `
        <p><strong>Pack 100 CHF</strong></p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ce soutien permet de financer des heures de formation, de conseil ou d’accompagnement pour les participantes et participants.</p>
    `,
    'pack-200': `
        <p><strong>Pack 200 CHF</strong></p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cette contribution aide à faire vivre un module complet de workshop ou de master class.</p>
    `,
    'pack-unlimited': `
        <p><strong>Pack illimité</strong></p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ce pack permet d’envisager un partenariat sur mesure, en lien avec les valeurs et les priorités de votre institution ou entreprise.</p>
    `,
}

// Données de l'équipe
const teamData = [
    {
        subtitle: 'Andrea Hoffmann Dobrynski – Présidente',
        bio: `<p>Titulaire d'un Master en Histoire de l'art de l'Université de Genève, Andrea Hoffmann Dobrynski débute sa carrière chez Sotheby's à Genève avant de se spécialiser dans la conservation-restauration de tableaux. Forte de plus de 30 ans d'expérience, elle est la fondatrice et directrice de l'atelier Hoffmann Art Management, où elle met sa passion et son expertise au service de ses clients. Elle participe également à des projets de protection et de sauvegarde du patrimoine, notamment dans le cadre de la rénovation du Palais des Nations de l'ONU à Genève.</p>
        <p>Membre active de la MAG (Association des Métiers d'Art Genève), elle préside la SAMAH (Société des Amis du Musée d'Art et d'Histoire de Genève) de 2018 à 2022. Depuis 2021, elle enseigne l'art de la restauration à la Haute Ecole de Gestion de Genève.</p>
        <p>Sa passion pour l'art africain l'a conduite à restaurer de nombreuses œuvres d'artistes africains établis et émergents, et elle est la restauratrice attitrée d'une des plus grandes collections privées d'art africain contemporain. En 2024, elle fonde ArtPulse Africa.</p>`,
        image: '/Equpie/Screenshot 2025-10-01 at 17.03.37.jpg',
        imagePosition: 'center center'
    },
    {
        subtitle: 'Elisabeth Assal-Bouchardy – Vice-présidente',
        bio: `<p>Diplômée d'un Master en Relations internationales de l'IUHEI de Genève, Elisabeth Assal-Bouchardy commence sa carrière au Comité International de la Croix-Rouge, où elle travaille pendant sept ans, à Genève et à l'étranger. Elle poursuit ensuite sa carrière dans le secteur des institutions d'aide sociale avant de fonder sa propre société de conseils, Human Capital Partners, spécialisée dans la protection de la personnalité au travail.</p>
        <p>En 2015, elle crée la Green Flower Foundation, une organisation dédiée au développement durable. Elle initie deux projets en Ethiopie : la création d'un programme de formation en maraîchage biologique et un soutien technique aux jeunes maraîchers se lançant dans cette activité.</p>
        <p>Fille de parents artistes peintres, Elisabeth Assal-Bouchardy nourrit depuis toujours un intérêt profond pour l'art, en particulier pour les métiers d'art, et participe activement au processus créatif.</p>`,
        image: '/Equpie/Screenshot 2025-10-01 at 17.03.41.jpg',
        imagePosition: 'center center'
    },
    {
        subtitle: 'Dominique de Saint Pierre – Trésorière',
        bio: `<p>Après deux années d'études à Londres dans une école des beaux-arts, Dominique de Saint Pierre poursuit sa formation à l'Université de Genève, où elle obtient une licence en sciences commerciales et industrielles.</p>
        <p>Elle s'installe ensuite pendant dix ans au Texas, où elle entame sa carrière dans la finance. Elle y collabore notamment avec de grandes banques sud-américaines.</p>
        <p>De retour à Genève, elle évolue dans le secteur bancaire, occupant divers postes dans les domaines de la syndication, des clients institutionnels, des gérants indépendants, puis de la clientèle privée au sein de la banque Lombard Odier Darier Hentsch.</p>
        <p>Aujourd'hui, elle siège depuis plusieurs années au conseil d'administration du groupe Procimmo, un acteur majeur de la gestion de fonds immobiliers en Suisse.</p>
        <p>Elle occupe également le poste de trésorière de la Société des Amis du Musée d'art et d'histoire (MAH), a présidé le comité de la Fondation Otium (soutien aux personnes atteintes de cancer) et s'implique activement dans plusieurs autres organisations caritatives.</p>
        <p>Animée depuis toujours par une passion pour l'art, elle est aussi une collectionneuse invétérée.</p>`,
        image: '/Equpie/Screenshot 2025-10-01 at 17.03.48.jpg',
        imagePosition: 'calc(50% -160px) center'
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

        this.camera = new THREE.PerspectiveCamera(50, width / height, 0.001, 20);
        this.camera.position.set(-0.158, -0.102, 0.700)

        this.renderer = new THREE.WebGLRenderer({
            alpha: false,
            antialias: false
        })
        this.renderer.setSize(width, height)
        this.container.appendChild(this.renderer.domElement)

        // Media Query JavaScript pour changer la couleur de fond sur mobile
        const isMobile = window.innerWidth <= 768
        this.scene.background = new THREE.Color(isMobile ? '#f5f5f5' : '#ffffff')

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

            // Mettre à jour le fond si on change de taille (desktop <-> mobile)
            const isMobile = window.innerWidth <= 768
            this.scene.background = new THREE.Color(isMobile ? '#f5f5f5' : '#ffffff')
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

// Gestion de la section Soutenir
function initSupportSection() {
    const supportTextEl = document.getElementById('support-text')
    const links = document.querySelectorAll('.support-link')

    if (!supportTextEl) return

    const setActiveContent = (key) => {
        const content = supportData[key] || supportData.intro
        supportTextEl.innerHTML = content
    }

    links.forEach((link) => {
        link.addEventListener('mouseenter', () => {
            links.forEach(l => l.classList.remove('active'))
            link.classList.add('active')
            setActiveContent(link.dataset.support)
        })
        link.addEventListener('focus', () => {
            links.forEach(l => l.classList.remove('active'))
            link.classList.add('active')
            setActiveContent(link.dataset.support)
        })
    })

    // Contenu par défaut
    setActiveContent('intro')
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
        this.lastTouchX = 0
        this.lastTouchY = 0

        this.init()
    }

    init() {
        this.container.style.display = 'block'
        this.container.innerHTML = ''

        this.createCanvas()
        this.createStyles()
        this.loadImages()

        this.container.addEventListener('mousemove', (e) => this.manageMouseMove(e))
        // Support tactile pour mobile
        this.container.addEventListener('touchstart', (e) => this.manageTouchStart(e), { passive: false })
        this.container.addEventListener('touchmove', (e) => this.manageTouchMove(e), { passive: false })
        window.addEventListener('resize', () => this.handleResize())
        this.animate()
    }

    createCanvas() {
        this.canvas = document.createElement('canvas')
        const sectionRect = this.container.closest('.p5-section').getBoundingClientRect()
        const width = sectionRect.width || window.innerWidth
        const height = sectionRect.height || window.innerHeight
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

    manageTouchStart(e) {
        e.preventDefault()
        const touch = e.touches[0]
        if (touch) {
            this.lastTouchX = touch.clientX
            this.lastTouchY = touch.clientY
            this.mouseX = touch.clientX
            this.mouseY = touch.clientY
            this.lastMouseMove = Date.now()
        }
    }

    manageTouchMove(e) {
        e.preventDefault()
        const touch = e.touches[0]
        if (touch) {
            const clientX = touch.clientX
            const clientY = touch.clientY
            const movementX = clientX - this.lastTouchX
            const movementY = clientY - this.lastTouchY

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

            this.lastTouchX = clientX
            this.lastTouchY = clientY
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
        const textWidth = columnWidth * 4 + gridGutter * 3
        const textX = (canvasWidth - textWidth) / 2

        // Position verticale du texte (centré verticalement dans la section visible)
        const spacingBetweenLogoAndText = 80
        const textColumnWidth = textWidth
        const lineHeight = 25 * 1.6 // font-size * line-height
        const text1 = "Préserver le patrimoine est le plus beau cadeau qu’on puisse faire aux générations"

        // Dessiner le logo "ArtPulse" centré avec "Art" en bold et "Pulse" en regular
        this.ctx.save()
        this.ctx.textBaseline = 'top'
        this.ctx.textAlign = 'left'

        // Taille de police plus grosse
        const logoFontSize = window.innerWidth <= 768 ? '4rem' : '8rem'
        const baseFontSize = 16 // 1rem = 16px
        const logoFontPx = parseFloat(logoFontSize) * baseFontSize

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

        // Calculer la hauteur du bloc (logo + espace + texte)
        const spacingBetweenLogoAndText = window.innerWidth <= 768 ? 40 : 80
        const textFontSize = window.innerWidth <= 768 ? '18px' : '25px'
        const lineHeight = (window.innerWidth <= 768 ? 18 : 25) * 1.6 // font-size * line-height
        
        // Sur mobile, utiliser plus de largeur disponible
        const effectiveTextWidth = window.innerWidth <= 768 ? canvasWidth - 40 : textWidth

        const text1Lines = Math.ceil(this.estimateTextLines(text1, effectiveTextWidth, textFontSize))
        const estimatedHeight = text1Lines * lineHeight
        const totalBlockHeight = logoFontPx + spacingBetweenLogoAndText + estimatedHeight
        const blockStartY = Math.max((canvasHeight - totalBlockHeight) / 2, 0)
        const logoY = blockStartY
        const textY = logoY + logoFontPx + spacingBetweenLogoAndText

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
        this.ctx.font = `500 ${textFontSize} "Inter", sans-serif`
        this.ctx.textAlign = 'left'
        this.ctx.textBaseline = 'top'

        // Sur mobile, centrer le texte horizontalement aussi si besoin
        const effectiveTextX = window.innerWidth <= 768 ? (canvasWidth - effectiveTextWidth) / 2 : textX

        // Créer un gradient vertical pour chaque colonne (du turquoise en haut au rouge en bas)
        const gradient1 = this.ctx.createLinearGradient(effectiveTextX, textY, effectiveTextX, textY + estimatedHeight)
        gradient1.addColorStop(0, '#02CDA8') // Turquoise en haut
        gradient1.addColorStop(1, '#AE3407') // Rouge en bas

        // Dessiner la première colonne avec gradient
        this.ctx.fillStyle = gradient1
        this.wrapText(this.ctx, text1, effectiveTextX, textY, effectiveTextWidth, lineHeight)

        this.ctx.restore()
    }

    estimateTextLines(text, maxWidth, fontSize = '25px') {
        // Estimer le nombre de lignes en mesurant le texte
        const words = text.split(' ')
        let line = ''
        let lines = 1

        this.ctx.font = `500 ${fontSize} "Inter", sans-serif`

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
            const height = sectionRect.height || window.innerHeight
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
        this.slides = []
        this.onResize = this.handleResize.bind(this)
        this.init()
    }

    init() {
        if (!this.container) return

        this.container.addEventListener('mousemove', (e) => {
            const rect = this.container.getBoundingClientRect()
            const mouseX = e.clientX - rect.left
            const percentage = (mouseX / rect.width) * 100

            this.container.classList.remove('cursor-left', 'cursor-right')

            if (percentage < 50) {
                this.container.classList.add('cursor-left')
            } else {
                this.container.classList.add('cursor-right')
            }
        })

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

        this.container.addEventListener('mouseleave', () => {
            this.container.classList.remove('cursor-left', 'cursor-right')
        })

        window.addEventListener('resize', this.onResize)
    }

    setImages(images) {
        this.currentProjectImages = images
        this.currentSlideIndex = 0
        this.render()
    }

    render() {
        if (!this.track) return

        this.track.innerHTML = ''
        this.currentProjectImages.forEach((imageItem, index) => {
            const slide = document.createElement('div')
            slide.className = 'image-slider-slide'
            const img = document.createElement('img')

            // Gérer les deux formats : string simple ou objet {src, position}
            if (typeof imageItem === 'string') {
                img.src = imageItem
                img.style.objectPosition = 'center center' // Défaut
            } else {
                img.src = imageItem.src
                if (imageItem.position) {
                    img.style.objectPosition = `center ${imageItem.position}`
                } else {
                    img.style.objectPosition = 'center center'
                }
            }

            img.alt = `Project image ${index + 1}`
            slide.appendChild(img)
            this.track.appendChild(slide)
        })

        this.slides = Array.from(this.track.children)
        this.updateSlideWidths()
        this.updatePosition(true)
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

    updatePosition(disableTransition = false) {
        if (!this.track || !this.container) return
        const offset = -this.currentSlideIndex * this.container.offsetWidth

        if (disableTransition) {
            const previousTransition = this.track.style.transition
            this.track.style.transition = 'none'
            this.track.style.transform = `translate3d(${offset}px, 0, 0)`
            requestAnimationFrame(() => {
                this.track.style.transition = previousTransition || ''
            })
        } else {
            this.track.style.transform = `translate3d(${offset}px, 0, 0)`
        }
    }

    updateSlideWidths() {
        if (!this.slides || this.slides.length === 0 || !this.container) return
        const width = this.container.offsetWidth
        this.slides.forEach((slide) => {
            slide.style.width = `${width}px`
            slide.style.flex = '0 0 auto'
        })
    }

    handleResize() {
        this.updateSlideWidths()
        this.updatePosition(true)
    }
}

// Gestionnaire du carrousel
class CarouselManager {
    constructor(imageSlider) {
        this.currentIndex = 0
        this.imageSlider = imageSlider
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

        // Mettre à jour le slider d'images
        if (data.images && data.images.length > 0) {
            if (this.imageSlider) {
                this.imageSlider.setImages(data.images)
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

        // Mettre à jour l'affichage initial selon les données
        this.switchTo(this.currentIndex)
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
        if (imageEl) {
            imageEl.src = data.image
            if (data.imagePosition) {
                imageEl.style.objectPosition = data.imagePosition
            } else {
                imageEl.style.objectPosition = 'center center'
            }
        }

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
    const sliderTrack = document.getElementById('image-slider-track')
    const sliderContainer = document.getElementById('slider-container')

    const imageSlider = (sliderTrack && sliderContainer) ? new ImageSlider(sliderTrack, sliderContainer) : null

    // Initialiser le carrousel
    const carouselManager = new CarouselManager(imageSlider)

    // Initialiser l'équipe
    const teamManager = new TeamManager()

    // Initialiser la section Soutenir
    initSupportSection()
})
