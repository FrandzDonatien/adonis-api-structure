/* eslint-disable prettier/prettier */
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { randomBytes } from 'node:crypto'
import fs from 'node:fs'

export default class GeneratePublicKey extends BaseCommand {
  static commandName = 'generate:public-key'
  static description = 'Generate a new public key and store it in .env file'

  static options: CommandOptions = {}

  async run() {
    // Générer une clé publique aléatoire
    const publicKey = randomBytes(32).toString('hex')

    // Chemin vers le fichier .env
    const envFilePath = '.env'

    // Lire le contenu actuel de .env
    let envContent = fs.existsSync(envFilePath) ? fs.readFileSync(envFilePath, 'utf-8') : ''

    // Vérifier si PUBLIC_KEY existe déjà et le remplacer, sinon l'ajouter
    if (envContent.includes('PUBLIC_KEY')) {
      envContent = envContent.replace(/PUBLIC_KEY=.*/g, `PUBLIC_KEY=${publicKey}`)
    } else {
      envContent += `\nPUBLIC_KEY=${publicKey}`
    }

    // Écrire les modifications dans le fichier .env
    fs.writeFileSync(envFilePath, envContent, 'utf-8')

    this.logger.success(`Public key generated and added to ${envFilePath}`)
  }
}