/* eslint-disable camelcase */
export type TUserProfile = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

export type TUserRequest = Omit<TUserProfile, 'id' | 'avatar'>

export type TUserPassword = {
  oldPassword: string;
  newPassword: string;
}

export type TFindUserRequest = {
  login: string;
}

export type TError = {
  reason: string;
}

/* eslint-enable camelcase */
