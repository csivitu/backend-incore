import { type Request, type Response, type NextFunction } from 'express'

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response => {
  console.error(err)
  return res.status(500).json({ error: err.message })
}

export default errorHandler
