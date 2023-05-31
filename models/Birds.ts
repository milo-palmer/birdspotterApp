export interface Bird {
  name: string
  image: string
  description: string
}

export interface BirdDb extends Bird {
  id: number
}
