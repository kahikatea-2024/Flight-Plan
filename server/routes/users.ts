import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0.ts'
import { StatusCodes } from 'http-status-codes'

import * as db from '../db/db.ts'

const router = Router()

// Get all Users
router.get('/', async (req, res) => {
  try {
    const users = await db.getAllUsers()

    res.json({ users: users.map((user) => user.username) })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})
// Get User by ID
router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const user = await db.getUserById(id)

    if (!user) {
      res.sendStatus(404)
    } else {
      res.json(user)
    }
  } catch (err) {
    next(err)
  }
})
// Get Trips by User ID
router.get('/:id/trips', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const trip = await db.getTripsByUserId(id)

    if (!trip) {
      res.sendStatus(404)
    } else {
      res.json(trip)
    }
  } catch (err) {
    next(err)
  }
})

// router.post('/', checkJwt, async (req: JwtRequest, res, next) => {
//   if (!req.auth?.sub) {
//     res.sendStatus(StatusCodes.UNAUTHORIZED)
//     return
//   }

//   try {
//     const { owner, name } = req.body
//     const id = await db.addFruit({ owner, name })
//     res
//       .setHeader('Location', `${req.baseUrl}/${id}`)
//       .sendStatus(StatusCodes.CREATED)
//   } catch (err) {
//     next(err)
//   }
// })

export default router
