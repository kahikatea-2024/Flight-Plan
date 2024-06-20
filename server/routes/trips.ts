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
    const users = await db.geUsersByTripId(id)
    if (!users) {
      res.sendStatus(404)
    } else {
      res.json(users)
    }
  } catch (err) {
    next(err)
  }
})

//Get Events by Trip ID

router.get('/:id/events', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const events = await db.getEventsByTripId(id)

    if (!events) {
      res.sendStatus(404)
    } else {
      res.json(events)
    }
  } catch (err) {
    next(err)
  }
})

// Add a Trip

router.post('/', async (req, res) => {
  try {
    const { createdBy, tripName, startDate, endDate } = req.body

    const newTrip = {
      createdBy,
      tripName,
      startDate,
      endDate,
    }
    await db.addTrip(newTrip)
    res.sendStatus(200)
  } catch (error) {
    console.log(`database error: ${error}`)
    res.sendStatus(500)
  }
})

// Delete a Trip

router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    await db.deleteTrip(id)
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// Patch a Trip

router.patch('/:id', async (req, res) => {
  try {
    const { createdBy, tripName, startDate, endDate } = req.body
    const id = Number(req.params.id)
    const updatedTrip = { createdBy, tripName, startDate, endDate }
    const final = await db.updateTrip(id, updatedTrip)
    if (final) {
      res.status(200).json({ updated: final })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})
export default router
