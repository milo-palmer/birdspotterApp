export interface Bird {
  name: string
  image: string
  description: string
}

export interface BirdDb extends Bird {
  id: number
}

export interface Post {
  name?: string
  image?: string | null | undefined | ArrayBuffer
  description?: string
}
