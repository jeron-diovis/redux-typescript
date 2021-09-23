// import { API_BASE_URL, createInstance } from 'src/api/api'

import { ILoginFormFields, IUser /*IUserResponse*/ } from './types'

// const AuthAPI = createInstance({
//   baseURL: `${API_BASE_URL}/auth`,
// })

export async function login(data: ILoginFormFields) {
  // await AuthAPI.post('/login', data)
  await new Promise(res => setTimeout(res, 1000))
}

export async function logout() {
  // await AuthAPI.post('/logout')
  await new Promise(res => setTimeout(res, 1000))
}

export async function getUser(): Promise<IUser> {
  // await AuthAPI.get<IUserResponse>('/use')
  return await new Promise(res =>
    setTimeout(res, 1000, {
      id: 1,
      email: 'user@gmail.com',
      username: 'fake-user',
      first_name: 'John',
      last_name: 'Smith',
    })
  )
}
