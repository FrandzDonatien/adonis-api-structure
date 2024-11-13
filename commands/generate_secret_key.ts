/* eslint-disable prettier/prettier */
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { randomBytes } from 'node:crypto'
import fs from 'node:fs'

export default class GenerateSecretKey extends BaseCommand {
  static commandName = 'generate:secret-key'
  static description = ''

  static options: CommandOptions = {}

  async run() {
    const secretKey = randomBytes(32).toString('hex')

    // Chemin vers le fichier .env
    const envFilePath = '.env'

    // Lire le contenu actuel de .env
    let envContent = fs.existsSync(envFilePath) ? fs.readFileSync(envFilePath, 'utf-8') : ''

    // Vérifier si PUBLIC_KEY existe déjà et le remplacer, sinon l'ajouter
    if (envContent.includes('SECRET_KEY')) {
      envContent = envContent.replace(/PUBLIC_KEY=.*/g, `SECRET_KEY=${secretKey}`)
    } else {
      envContent += `\SECRET_KEY=${secretKey}`
    }

    // Écrire les modifications dans le fichier .env
    fs.writeFileSync(envFilePath, envContent, 'utf-8')

    this.logger.success(`Secret key generated and added to ${envFilePath}`)
  }
}