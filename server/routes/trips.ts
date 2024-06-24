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

router.get('/:id/users', async (req, res) => {
  try {
    const tripId = Number(req.params.id)
    if (isNaN(tripId)) {
      return res.status(400).json({ message: 'Invalid trip ID' })
    }

    const users = await db.getUsersByTripId(tripId)
    res.status(200).json(users)
  } catch (error) {
    console.error('Error fetching users by trip ID:', error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// Delete a user from a trip
router.delete('/:tripId/users/:userId', async (req, res) => {
  try {
    const tripId = Number(req.params.tripId)
    const userId = Number(req.params.userId)

    if (isNaN(tripId) || isNaN(userId)) {
      return res.status(400).json({ message: 'Invalid trip ID or user ID' })
    }

    const result = await db.deleteUserFromTrip(tripId, userId)
    if (result) {
      res.status(200).json({ message: 'User removed from trip successfully' })
    } else {
      res.status(404).json({ message: 'User or trip not found' })
    }
  } catch (error) {
    console.error('Error removing user from trip:', error)
    res.status(500).json({ message: 'Something went wrong' })
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
    const { id, createdBy, tripName, startDate, endDate } = req.body

    const newTrip = { id, createdBy, tripName, startDate, endDate }
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

// Add User to Trip id

router.post('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { username } = req.body
    console.log('route', req.body)

    const final = await db.addUserToTrip(id, username)

    res.status(200).json({ updated: final })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// Route to handle adding user to trip
router.post('/:id/users', async (req, res) => {
  try {
    const tripId = Number(req.params.id)
    const { username } = req.body // Ensure username is sent in the body
    console.log('Route handler received:', { tripId, username })

    const result = await db.addUserToTrip(tripId, username)

    res.status(200).json({ updated: result })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})
export default router
