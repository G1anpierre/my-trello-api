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

  if (req.body.rememberMe) {
    const rememberMeToken = createJWT(user, req.body.rememberMe)
    await prisma.user.update({
      where: {id: user.id},
      data: {remenberMeToken: rememberMeToken},
    })
  }

  const token = createJWT(user)
  res.json({token})
}

export const getAppUser = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
  })

  if (!user) {
    return res.status(404).json({message: 'User not found'})
  }

  res.json({data: user})
}

export const getCreatorCard = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.params.id,
    },
  })

  if (!user) {
    return res.status(404).json({message: 'User not found'})
  }

  res.json({data: user})
}
