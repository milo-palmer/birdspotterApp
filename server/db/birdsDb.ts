import connection from './connection'

export function getLimitedPosts(limit: number, db = connection) {
  return db('birds').select().orderBy('id', 'desc').limit(limit)
}

export function getPosts(db = connection) {
  return db('birds').select().orderBy('id', 'desc')
}
