export interface Bird {
  name: string
  image: string
  description: string
  authId: string
  lat: string
  lng: string
}

export interface BirdDb extends Bird {
  id: number
}

export interface Post {
  name?: string
  image?: string | null | undefined | ArrayBuffer
  description?: string
  authId?: string
}

export interface PostWithID extends Post {
  id: number
}

export interface CommentDb {
  postId: number
  comment: string
  name: string
}
