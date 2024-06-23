import type { Response, Request } from 'express'
import catchAsync from '../helpers/catchAsync.js'
import User from '../models/user.model.js'

export const ProtectedController = catchAsync(
  async (req: Request, res: Response) => {
    const userID = req.body.decoded.sub as string
    const user = await User.findById(userID)
    if (user == null) return res.status(404).json({ message: 'User not found' })
    return res.status(200).json({ name: user.name, createdAt: user.createdAt })
  })
