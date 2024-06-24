import { Router } from 'express'
// import checkJwt, { JwtRequest } from '../auth0.ts'
// import { StatusCodes } from 'http-status-codes'

import * as db from '../db/db.ts'

const router = Router()
// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await db.getAllEvents()

    res.json(events)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})
// Get event by ID
router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const event = await db.getEventById(id)

    if (!event) {
      res.sendStatus(404)
    } else {
      res.json(event)
    }
  } catch (err) {
    next(err)
  }
})
// Get event by Date
router.get('/date/:id/:date', async (req, res, next) => {
  try {
    const id = req.params.id
    const date = req.params.date

    const event = await db.getEventsByDate(id, date)

    if (!event) {
      res.sendStatus(404)
    } else {
      res.json(event)
    }
  } catch (err) {
    next(err)
  }
})

//Add New Event
router.post('/', async (req, res) => {
  try {
    const newEvent = req.body
    await db.addNewEvent(newEvent)
    res.sendStatus(201)
  } catch (error) {
    res.sendStatus(500)
  }
})

//Add New Event by  id
router.post('/date/:date', async (req, res) => {
  try {
    const date = req.params.date
    const newEvent = {
      ...req.body,
      date,
    }
    await db.addNewEventByTripDate(newEvent)
    res.sendStatus(201)
  } catch (error) {
    res
      .sendStatus(500)
      .json({ message: 'Unable to insert new Event to database' })
  }
})

//Update an Event by events.id
router.patch('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const {
      trip_id,
      date,
      start_time,
      end_time,
      description,
      notes,
      created_by,
      location,
      type,
    } = req.body

    const updateEvents = await db.updateEventsById(id, {
      trip_id,
      date,
      start_time,
      end_time,
      description,
      notes,
      created_by,
      location,
      type,
    })
    if (updateEvents) {
      res.sendStatus(200)
    }
  } catch (error) {
    res.sendStatus(500).json({ message: 'Unable to update event to database' })
  }
})

// Delete an Event By Id
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    await db.deleteEvent(id)
    res.sendStatus(200)
  } catch (error) {
    console.error(`database error: ${error}`)
    res.sendStatus(500)
  }
})

export default router
