import { Router } from 'express'
import auth from './routes/auth'
import protectedRoute from './routes/protected'

export default (): Router => {
  const app = Router()
  auth(app)
  protectedRoute(app)
  return app
}
