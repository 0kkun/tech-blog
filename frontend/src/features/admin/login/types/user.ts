export type User = {
  id: number
  name: string
  email: string
}

export type LoginRequest = {
  email: string
  password: string
}


export type LoginResponse = {
  token: string
  token_type: string
}
