import jwt from 'jsonwebtoken'
import { type Request, type Response, type NextFunction } from 'express'
import envHandler from '../../config/envHandler'
import catchAsync from '../../helpers/catchAsync'
import User from '../../models/user'
import { fetchUserFromCache, setUserToCache } from '../../helpers/caching'

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string = ''

    if (
      (req.headers.authorization != null) &&
      req.headers.authorization.startsWith('Bearer')
    ) { token = req.headers.authorization.split(' ')[1] }

    if (token === '') { return res.status(400).json({ error: 'Username must be alphanumeric', verified: false }) }

    const decoded = jwt.verify(token, envHandler.JWT_KEY) as jwt.JwtPayload
    if (typeof decoded.sub !== 'string') {
      return res.status(400).json({ error: 'User not found', verified: false })
    }
    // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
    const cachedUser = await fetchUserFromCache(decoded.sub)
    if (cachedUser != null) {
      req.body.user = cachedUser
      next()
      return
    }
    const DBuser = await User.findById(decoded.sub)
    if (DBuser == null) {
      return res.status(400).json({ error: 'User not found', verified: false })
    }
    await setUserToCache(decoded.sub, DBuser)

    req.body.user = DBuser
    next()
  }
)
