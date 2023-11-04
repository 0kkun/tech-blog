export type User = {
  id: number
  name: string
  email: string
}

export type EditUserRequest = {
  id: number
  name: string
  email: string
}

export type CreateUserRequest = {
  name: string
  email: string
  password: string
  role: number
}
