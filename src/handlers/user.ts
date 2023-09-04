import prisma from '../db'
import {comparePasswords, createJWT, hashPassword} from '../modules/auth'

export const SignUpNewUser = async (req, res) => {
  const hash = await hashPassword(req.body.password)

  const user = await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      password: hash,
    },
  })

  const token = createJWT(user)
  res.json({token})
}

export const LoginUser = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  })

  if (!user) {
    return res.status(404).json({message: 'User not found'})
  }

  const valid = await comparePasswords(req.body.password, user.password)

  if (!valid) {
    return res.status(400).json({message: 'Invalid Password'})
  }

  const token = createJWT(user)
  res.json({token})
}
