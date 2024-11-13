/* eslint-disable prettier/prettier */
import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    email: vine.string().trim().minLength(3).maxLength(32).email(),
    password: vine.string().trim().minLength(3).maxLength(32),
  })

)