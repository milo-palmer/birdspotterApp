import { Bird } from '../../models/Birds'
import connection from './connection'

export function getLimitedPosts(limit: number, db = connection) {
  return db('birds').select().orderBy('id', 'desc').limit(limit)
}

export function getPosts(db = connection) {
  return db('birds').select().orderBy('id', 'desc')
}

export function addPost(post: Bird, db = connection) {
  return db('birds').insert(post)
}

export function getPostById(id: number, db = connection) {
  return db('birds').where('id', id).first()
}
