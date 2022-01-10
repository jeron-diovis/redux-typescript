import { AsyncState } from 'src/types'

export interface ILoginFormFields {
  username: string
  password: string
}

export interface IUserResponse {
  id: number
  email: string
  username: string
  first_name: string
  last_name: string
  roles: UserRole[]
}

export interface IUser extends IUserResponse {}

// ---

export interface IUserState extends AsyncState {
  data: IUser
}

export enum UserRole {
  test = 'Test',
}
