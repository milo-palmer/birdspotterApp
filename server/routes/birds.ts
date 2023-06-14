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

router.post('/', async (req, res) => {
  try {
    const post = req.body
    await db.addPost(post)
    res.status(201).send('Created Successfully')
  } catch (error) {
    res.status(500)
  }
})

router.patch('/', async (req, res) => {
  try {
    const post = req.body
    await db.editPost(post.id, post)
    res.status(201).send('Updated')
  } catch (error) {
    res.status(500)
  }
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const post = await db.getPostById(+id)
    res.json(post)
  } catch (error) {
    res.status(500)
  }
})

router.delete('/', async (req, res) => {
  const id = req.body.id
  try {
    await db.deletePost(id)
    res.status(201).send('Deleted Successfully')
  } catch (error) {
    res.status(500)
  }
})

router.get('/comments/:id', async (req, res) => {
  try {
    const comments = await db.getCommentByPostId(+req.params.id)
    res.json(comments)
  } catch (error) {
    res.status(500)
  }
})

export default router
