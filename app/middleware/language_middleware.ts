/* eslint-disable prettier/prettier */
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import i18nManager from '@adonisjs/i18n/services/main'


export default class LanguageMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const headers = ctx.request.headers()
    /**
     * Middleware logic goes here (before the next call)
     */
    const locale = headers['accept-language'] ||  i18nManager.defaultLocale
    ctx.i18n.switchLocale(locale)
    /**
     * Call next method in the pipeline and return its output
     */
    return await next()
  }
}