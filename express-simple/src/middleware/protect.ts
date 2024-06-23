import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'
import envGet from '../helpers/getEnv.js'
import logger from '../../logs/logger.js'

export const protect = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (
    req.headers.authorization == null ||
    !req.headers.authorization.startsWith('Bearer')
  ) {
    res.status(400).json({ error: 'Invalid token', verified: false })
    return
  }
  const token = req.headers.authorization.split(' ')[1]

  jwt.verify(token, envGet.JWT_KEY, function (err, decoded) {
    if (err != null) {
      logger.error(err.message + 'by' + req.ip)
      return res
        .status(401)
        .json({ error: 'Unauthorized access', verified: false })
    }
    req.body.decoded = decoded
    next()
  })
}
