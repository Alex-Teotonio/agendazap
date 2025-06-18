// src/types/api.ts

/** Retorno do POST /register */
export interface RegisterResponse {
  message: string;
  userId: string;
}

/** Retorno do POST /login */
export interface LoginResponse {
  token: string;
  nutriId: string;
}
