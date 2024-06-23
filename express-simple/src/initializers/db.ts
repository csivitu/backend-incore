import mongoose from 'mongoose'
import getEnv from '../helpers/getEnv.js'

const DB_HOST = getEnv.DB_HOST
const DB_PORT = getEnv.DB_PORT
const DB_USER = getEnv.DB_USER
const DB_PASSWORD = getEnv.DB_PASSWORD
const DB_DATABASE = getEnv.DB_DATABASE

async function connectToDB (): Promise<void> {
  const url = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?authSource=admin`

  try {
    await mongoose.connect(url)
    console.log('Connected to Database!')
  } catch (error) {
    console.error('Error connecting to the database:', error)
    process.exit(1)
  }
}

export default connectToDB
