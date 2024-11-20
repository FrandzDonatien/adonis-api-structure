/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

import { middleware } from './kernel.js'
import './api/V1/auth.js'
import './api/V1/home.js'

router
  .post('/', async () => {
    return {
      hello: 'world',
    }
  })
  .use(middleware.auth())
  .prefix('api/V1')
