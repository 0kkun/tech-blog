export type User = {
  id: number
  name: string
  email: string
}

export type PutUserRequest = {
  id?: number
  name: string
  email: string
}
