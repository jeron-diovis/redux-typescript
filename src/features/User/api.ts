// import { API_BASE_URL, createInstance } from 'src/api/api'

import { ILoginFormFields, IUser /*IUserResponse*/ } from './types'

// const AuthAPI = createInstance({
//   baseURL: `${API_BASE_URL}/auth`,
// })

export async function login(data: ILoginFormFields): Promise<IUser> {
  // await AuthAPI.post('/login', data)
  // return getUser()

  await new Promise(res => setTimeout(res, 1000))
  const { username, password } = data
  if (!(username === 'test' && password === 'test')) {
    return Promise.reject('Unable to log in with provided credentials')
  }
  return await new Promise(res =>
    setTimeout(res, 1000, {
      id: 123,
      email: 'test@test.test',
      username: 'test',
      first_name: 'Tested',
      last_name: 'Tester',
    })
  )
}

export async function logout() {
  // await AuthAPI.post('/logout')

  await new Promise(res => setTimeout(res, 1000))
}

export async function getUser(): Promise<IUser> {
  // await AuthAPI.get<IUserResponse>('/user')

  return Promise.reject('401 Unauthorized')
}
