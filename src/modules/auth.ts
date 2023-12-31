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
export const createJWT = (user, rememberMe?) => {
  const token = jwt.sign(
    {id: user.id, email: user.email},
    process.env.JWT_SECRET,
    {expiresIn: rememberMe ? '7d' : '24h'},
  )
  return token
}

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization

  if (!bearer) {
    res.status(401)
    res.send('Not authorized')
    return
  }

  const [, token] = bearer.split(' ')
  if (!token) {
    console.log('here')
    res.status(401)
    res.send('Not Valid Token')
    return
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = payload
    console.log(payload)
    next()
    return
  } catch (e) {
    console.error(e)
    res.status(401)
    res.send('Not authorized')
    return
  }
}
