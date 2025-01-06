/* eslint-disable prettier/prettier */
import AuthService from '#services/auth/auth_service'
import { registerValidator } from '#validators/user_register'
import type { HttpContext } from '@adonisjs/core/http'
import ApiResponse from '../../responses/api_response.ts.js'
import { inject } from '@adonisjs/core'
import UserRepository from '../../repositories/user/user_repository.js'
import User from '#models/user'

@inject()
export default class UsersController {

  //attributs
  private authService: AuthService
  private apiResponse: ApiResponse
  private userRepo: UserRepository

  //contructor
  constructor( authService: AuthService, apiResponse: ApiResponse, userRepo: UserRepository){
    this.authService = authService
    this.apiResponse = apiResponse
    this.userRepo =  userRepo
  }

  //methodes

  public async register({request}:HttpContext) {
    const payload = await registerValidator.validate(request.body())

    try {
      const user = await this.authService.register(payload)
      const returnData = {
        user: user
      };
      return this.apiResponse.success('successfully', returnData)
    } catch (error) {
      return this.apiResponse.error('', 400)
    }
  } 

  public async login({request}:HttpContext) {
    const {email, password} = request.only(['email', 'password'])
    try {
      const user = this.userRepo.getByEmail(email)
      if(!user)
        return this.apiResponse.error('invalid_credentials')
      const credential = await User.verifyCredentials(email, password)

      const token = await User.accessTokens.create(
        credential,
        ['*'],
        {
          expiresIn: '24hours', // expires in 30 days
        }
      )

      const returnData = {
        user: credential,
        access_token: token
      }
      if (token) {
        return this.apiResponse.success("login_success", returnData)
      }
    } catch (error) {
      return this.apiResponse.error('invalid_credentials')
    }
  }

  async logout({ auth, response }: HttpContext) {
    const user = await auth.authenticate()
    if (user) {
      await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    }
    return response.status(200).json({
      result: null,
      success: true,
      message: 'deconnexion',
      errors: null,
    })
}
}
