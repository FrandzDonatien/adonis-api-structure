/* eslint-disable prettier/prettier */
const HomeController = () => import('#controllers/home_controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.post('/', [HomeController, 'homeDash'])
  })
  .prefix('/api/V1/home')
  .use([
    middleware.api(),
    middleware.auth()
  ])