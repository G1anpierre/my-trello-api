import jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'

// * When sign Up
export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash)
}

// * When Sign In
export const hashPassword = password => {
  return bcrypt.hash(password, 5)
}

// * When Sign Up and Sign In, generate token to send it to frontend
export const createJWT = user => {
  const token = jwt.sign(
    {id: user.id, email: user.email},
    process.env.JWT_SECRET,
  )
  return token
}
