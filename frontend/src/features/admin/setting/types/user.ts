export type User = {
  id: number
  name: string
  email: string
  role: number
}

export type EditUserRequest = {
  id: number
  name: string
  email: string
  password: string
  role: number
}

export type CreateUserRequest = {
  name: string
  email: string
  password: string
  role: number
}
