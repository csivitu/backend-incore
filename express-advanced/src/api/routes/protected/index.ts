import { Router } from 'express'
import ProtectedController from './protected.controller'
import { protect } from '../../middlewares/protect'

const protectedRouter = Router()

export default (app: Router): void => {
  app.use('/protected', protectedRouter)

  protectedRouter.get('/', protect, ProtectedController.GetUser)
}
