import { Router } from 'express'
import * as db from '../db/db.ts'

const router = Router()
// Get all Trips
router.get('/', async (req, res) => {
  try {
    const trips = await db.getAllTrips()

    res.json(trips)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})
// Get Trip by ID
router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const trip = await db.getTripById(id)

    if (!trip) {
      res.sendStatus(404)
    } else {
      res.json(trip)
    }
  } catch (err) {
    next(err)
  }
})
// Get Users by Trip ID

router.get('/:id/users', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const geUsersByTripId = await db.geUsersByTripId(id)

    if (!geUsersByTripId) {
      res.sendStatus(404)
    } else {
      res.json(geUsersByTripId)
    }
  } catch (err) {
    next(err)
  }
})
export default router
