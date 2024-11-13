/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

import './api/V1/auth.js'
import { middleware } from './kernel.js'

router
  .post('/', async () => {
    return {
      hello: 'world',
    }
  })
  .use(middleware.auth())
  .prefix('api/V1')
