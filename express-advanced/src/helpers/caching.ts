import { redisClient } from '../loaders/redis'
import { type UserType } from '../models/user.js'

async function setUserToCache (key: string, user: UserType): Promise<void> {
  if (redisClient == null || redisClient.status !== 'ready') {
    return
  }
  await redisClient.set(key, JSON.stringify(user), 'EX', 100)
}

async function fetchUserFromCache (key: string): Promise<UserType | null> {
  if (redisClient == null || redisClient.status !== 'ready') {
    return null
  }
  const result = await redisClient.get(key)
  if (result == null) {
    return null
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return JSON.parse(result) as UserType
}

async function clearCache (): Promise<void> {
  if (redisClient == null || redisClient.status !== 'ready') {
    return
  }
  await redisClient.flushdb()
}

export { setUserToCache, fetchUserFromCache, clearCache }
