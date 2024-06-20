import { Router } from 'express'
import * as db from '../db/db.ts'

const router = Router()

//Get All Followers
router.get('/', async (req, res) => {
  try {
    const followers = await db.getFollowers()
    res.json(followers)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

//Get Followers by ID

//Add followers

//Delete Followers

export default router
