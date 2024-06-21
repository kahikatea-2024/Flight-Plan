import { Router } from 'express'
import * as db from '../db/db.ts'

const router = Router()

//Add Friends
router.post('/add-friend', async (req, res) => {
  const { userId, friendId } = req.body

  if (!userId || !friendId) {
    return res.status(400).json({ error: 'User ID and Friend ID are required' })
  }

  try {
    const result = await db.addFriend(parseInt(userId), parseInt(friendId)) // Ensure IDs are integers

    res.status(200).json(result)
  } catch (error) {
    res.status(500)
  }
})

//Get Friends

// GET /api/friends/:userId
router.get('/:userId', async (req, res) => {
  const userId = Number(req.params.userId)
  console.log(userId)

  try {
    const friends = await db.getFriends(userId)
    res.status(200).json(friends)
  } catch (error) {
    res.status(500)
  }
})

//Delete Followers

export default router
