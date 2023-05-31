import express from 'express'

import * as db from '../db/birdsDb'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const data = await db.getPosts()
    res.json(data)
  } catch (error) {
    res.status(500)
  }
})
router.get('/limit', async (req, res) => {
  try {
    const data = await db.getLimitedPosts(3)
    res.json(data)
  } catch (error) {
    res.status(500)
  }
})

export default router
