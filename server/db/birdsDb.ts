import { Bird, CommentDb, Post } from '../../models/Birds'
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
    lat: post.lat,
    lng: post.lng,
  })
}

export function editPost(id: number, post: Post, db = connection) {
  return db('birds').where('id', id).update(post)
}

export function getPostById(id: number, db = connection) {
  return db('birds')
    .where('id', id)
    .select(
      'id',
      'name',
      'description',
      'image',
      'auth_id as authId',
      'lat',
      'lng'
    )
    .first()
}

export async function deletePost(id: number, db = connection) {
  await db('comments').where('post_id', id).del()
  return db('birds').where('id', id).del()
}

export function getCommentByPostId(postId: number, db = connection) {
  return db('comments').where('post_id', postId).select('id', 'comment', 'name')
}

export function addCommentByPostId(comment: CommentDb, db = connection) {
  return db('comments').insert({
    comment: comment.comment,
    name: comment.name,
    post_id: comment.postId,
  })
}
