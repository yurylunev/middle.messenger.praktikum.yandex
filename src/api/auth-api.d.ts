/* eslint-disable camelcase */
export type TSignup = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export type TSignin = {
  login: string;
  password: string;
}

export type TUserInfo = Omit<TSignup, 'password'> & {
  avatar: string;
  display_name: string;
}
/* eslint-enable camelcase */
