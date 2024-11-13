/* eslint-disable prettier/prettier */

import vine from '@vinejs/vine'
export const registerValidator = vine.compile(
  vine.object({
    email: vine
    .string()
    .trim()
    .minLength(3)
    .maxLength(32)
    .email()
    .unique(async (db, value) => {
      const user = await db.from('users').where('email', value).first()
      return !user
    }),
    fullName: vine.string().trim(),
    password: vine.string().trim().escape()
  }),
)

