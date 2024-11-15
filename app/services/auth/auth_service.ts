/* eslint-disable prettier/prettier */

import User from "#models/user";
import { inject } from "@adonisjs/core";
import UserRepository from "../../repositories/user/user_repository.js";

@inject()
export default class AuthService{

  //
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  //methodes
  public async register(data: Partial<User>){
    return await this.userRepository.registerUser(data);
  }
  
}