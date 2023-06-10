import { Bird, Post } from '../../models/Birds'
import connection from './connection'

export function getLimitedPosts(limit: number, db = connection) {
  return db('birds')
    .select('id', 'name', 'description', 'image')
    .orderBy('id', 'desc')
    .limit(limit)
}

export function getPosts(db = connection) {
  return db('birds')
    .select('id', 'name', 'description', 'image')
    .orderBy('id', 'desc')
}

export function addPost(post: Bird, db = connection) {
  return db('birds').insert({
    name: post.name,
    description: post.description,
    image: post.image,
    auth_id: post.authId,
  })
}

export function editPost(id: number, post: Post, db = connection) {
  return db('birds').where('id', id).update(post)
}

export function getPostById(id: number, db = connection) {
  return db('birds')
    .where('id', id)
    .select('id', 'name', 'description', 'image', 'auth_id as authId')
    .first()
}

export function deletePost(id: number, db = connection) {
  return db('birds').where('id', id).del()
}
