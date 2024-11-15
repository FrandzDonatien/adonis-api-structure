/* eslint-disable prettier/prettier */

import User from "#models/user"; 
import db from "@adonisjs/lucid/services/db";

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