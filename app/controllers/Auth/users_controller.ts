/* eslint-disable prettier/prettier */
import AuthService from '#services/auth/auth_service'
import { registerValidator } from '#validators/user_register'
import type { HttpContext } from '@adonisjs/core/http'
import ApiResponse from '../../responses/api_response.ts.js'
import { inject } from '@adonisjs/core'

@inject()
export default class UsersController {

  private authService: AuthService
  private apiResponse: ApiResponse


  constructor( authService: AuthService, apiResponse: ApiResponse){
    this.authService = authService
    this.apiResponse = apiResponse
  }

  public async register({request}:HttpContext) {
    const payload = await registerValidator.validate(request.body())

    try {
      const user = this.authService.register(payload)
      // const user = await User.create(payload)
      const returnData = {
        user: user
      };
      return this.apiResponse.success('successfully', returnData)
    } catch (error) {
      return this.apiResponse.error('', 400)
    }
  } 

  public async login({}:HttpContext) {
    return 'login'
  }
}
