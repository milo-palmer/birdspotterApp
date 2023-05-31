import connection from './connection'

export function getPosts(db = connection) {
  return db('birds').select()
}
