export interface User {
  id: string
  name: string
  email: string
  role: string
  permissions: Array<string>
  token_expired_at: string
}

export interface AuthCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: User
  message: string
}

export interface checkAuthResponse {
  success: boolean
  user: User
}
