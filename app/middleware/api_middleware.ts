/* eslint-disable prettier/prettier */
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { inject } from '@adonisjs/core'
import env from '#start/env'

@inject()
export default class ApiMiddleware {

  constructor(){
  }

  async handle(ctx: HttpContext, next: NextFn) {
    const headers = ctx.request.headers()
    const publicKey = headers['public_key']
    const secretKey = headers['secret_key']
    
    // const accessToken = headers['Authorization']

    const envPublicKey = env.get('PUBLIC_KEY')
    const envSecretKey = env.get('SECRET_KEY')

    /**
     * Middleware logic goes here (before the next call)
     */

    if (publicKey !== envPublicKey || secretKey !== envSecretKey) {
      return ctx.response.status(401).send({result: "0", message: ctx.i18n.formatMessage('messages.unauthorized_request'), 'data': [] })
    }
    /**
     * Call next method in the pipeline and return its output
    */
    await next()
  }
}