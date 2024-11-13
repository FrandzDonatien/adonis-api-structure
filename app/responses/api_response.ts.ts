/* eslint-disable prettier/prettier */
import env from '#start/env';
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ApiResponse {
  
  private apiVersion = env.get('API_VERSION');

  constructor(private ctx: HttpContext) {}

  public success(messageKey: string, data = {}) {
    const message = this.ctx.i18n.t(`messages.${messageKey}`);
    return {result: "1", status: 'success', message, version:this.apiVersion, data }
  }

  public error(messageKey: string, errorCode = 400) {
    const message = this.ctx.i18n.t(`messages.${messageKey}`);
    return {result: "0", status: 'error', message, version:this.apiVersion, errorCode }
  }
}
