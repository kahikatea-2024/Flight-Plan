import { Router } from 'express'
import * as db from '../db/db.ts'

const router = Router()

//Get All Followers
router.get('/', async (req, res) => {
  try {
    const friends = await db.getFollowers()
    res.json(friends)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

//Get Followers by ID

//Add followers
router.post('/', async (req, res) => {
  try {
    const { friends, userId } = req.body
    const newFriend = { friends, userId }
    await db.addFriendsToList(newFriend)
    res.sendStatus(201)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

//Delete Followers

export default router
