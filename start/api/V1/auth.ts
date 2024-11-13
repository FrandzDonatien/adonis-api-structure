const UsersController = () => import('#controllers/Auth/users_controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.post('/register', [UsersController, 'register'])
    router.post('/login', [UsersController, 'login'])
  })
  .prefix('/api/V1/auth')
  .use(middleware.api())
