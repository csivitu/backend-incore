import express from 'express'
import { protect } from '../middleware/protect.js'
import { ProtectedController } from '../controllers/protected.controller.js'
const protectedRouter = express.Router()

protectedRouter.get('/', protect, ProtectedController)

export default protectedRouter
