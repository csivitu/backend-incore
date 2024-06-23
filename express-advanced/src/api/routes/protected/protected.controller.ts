import { type UserType } from '@/models/user'
import catchAsync from '../../../helpers/catchAsync'
import type { Response, Request } from 'express'

const ProtectedController = {
  GetUser: catchAsync(
    async (req: Request, res: Response) => {
      const existingUser = req.body.user as UserType
      return res.json({ name: existingUser.name, createdAt: existingUser.createdAt })
    }
  )
}

export default ProtectedController
