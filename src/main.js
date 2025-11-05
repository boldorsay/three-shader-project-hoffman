import { ShaderProject } from './ShaderProject.js'
import { P5Canvas } from './P5Canvas.js'

class ProjectManager {
    constructor() {
        this.currentProject = null
        this.projects = {
            shader: null,
            p5: null
        }

        this.init()
    }

    init() {
        // Récupérer les boutons
        this.shaderBtn = document.getElementById('shader-btn')
        this.p5Btn = document.getElementById('p5-btn')

        // Ajouter les événements
        this.shaderBtn.addEventListener('click', () => this.switchToProject('shader'))
        this.p5Btn.addEventListener('click', () => this.switchToProject('p5'))

        // Gérer le redimensionnement
        window.addEventListener('resize', () => this.handleResize())

        // Ne pas démarrer automatiquement - attendre que l'utilisateur clique
        console.log('🎨 Interface prête - Cliquez sur un bouton pour commencer')

        this.currentProject = new P5Canvas()

    }

    switchToProject(projectName) {
        // Détruire le projet actuel
        if (this.currentProject) {
            this.currentProject.destroy()
            this.currentProject = null
        }

        // Mettre à jour les boutons
        this.updateButtons(projectName)

        // Créer le nouveau projet
        switch (projectName) {
            case 'shader':
                this.currentProject = new ShaderProject()
                this.projects.shader = this.currentProject
                break
            case 'p5':
                this.currentProject = new P5Canvas()
                this.projects.p5 = this.currentProject
                break
        }
    }

    updateButtons(activeProject) {
        // Retirer la classe active de tous les boutons
        this.shaderBtn.classList.remove('active')
        this.p5Btn.classList.remove('active')

        // Ajouter la classe active au bouton sélectionné
        switch (activeProject) {
            case 'shader':
                this.shaderBtn.classList.add('active')
                break
            case 'p5':
                this.p5Btn.classList.add('active')
                break
        }
    }

    handleResize() {
        if (this.currentProject && this.currentProject.resize) {
            this.currentProject.resize()
        }
    }
}

// Initialiser l'application
new ProjectManager()
