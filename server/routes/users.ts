import { Router } from 'express'
// import checkJwt, { JwtRequest } from '../auth0.ts'
// import { StatusCodes } from 'http-status-codes'

import * as db from '../db/db.ts'

const router = Router()

// Get all Users
router.get('/', async (req, res) => {
  try {
    const users = await db.getAllUsers()

    //gets all info of users
    res.json(users)

    // res.json({ users: users.map((user) => user.username) })
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

// Get Trips by CreatedBy
router.get('/:id/created', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const trip = await db.getTripByCreatedBy(id)

    if (!trip) {
      res.sendStatus(404)
    } else {
      res.json(trip)
    }
  } catch (err) {
    next(err)
  }
})

// Add User
router.post('/', async (req, res) => {
  console.log('post route')
  try {
    const newUser = req.body
    await db.addUser(newUser)
    res.sendStatus(200)
  } catch (error) {
    console.log(`database error: ${error}`)
    res.sendStatus(500)
  }
})

// Update a User
router.patch('/:id', async (req, res) => {
  try {
    const {
      email,
      phoneNumber,
      profilePicture,
      username,
      firstName,
      lastName,
    } = req.body
    const id = Number(req.params.id)
    const updatedUser = {
      email,
      phoneNumber,
      profilePicture,
      username,
      firstName,
      lastName,
    }
    const final = await db.updateUser(id, updatedUser)
    if (final) {
      res.status(200).json({ updated: final })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

//delete user

router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    await db.deleteUser(id)
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
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
