/* eslint-disable prettier/prettier */

import User from "#models/user"; 
import { inject } from "@adonisjs/core";
import db from "@adonisjs/lucid/services/db";

@inject()
export default class UserRepository{

  //methodes
  public async registerUser(data: Partial<User>): Promise<User>{
    return await User.create(data)
  }

  public async getByEmail(email: any)
  {
    return await db.from('users').where('email', email)
  }
}