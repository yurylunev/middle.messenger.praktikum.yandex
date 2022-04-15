/* eslint-disable camelcase */
export type TChatsUser = {
  id?: number;
  first_name: string;
  second_name: string;
  display_name?: string;
  login: string;
  email: string;
  phone: string;
  avatar?: string;
  role?: string;
}

export type TChatsLastMessage = {
  user: TChatsUser;
  time: string;
  content: string;
  unread_count: number;
}

export type TChatData = {
  id: number;
  title?: string;
  avatar?: string;
  unread_count?: number;
  created_by?: number;
  last_message?: TChatsLastMessage
  time?: string;
  content?: string;
  users?: TChatsUser[]
}

type TResourceTypes = ['file'];

type TFileData = {
  id: number;
  user_id: number;
  path: string;
  filename: string;
  content_type: string;
  content_size: number;
  upload_date: string;
}

export type TChatsFile = {
  id: number;
  user_id: number;
  chat_id: number;
  time: string;
  type: TResourceTypes;
  content: number;
  file?: TFileData;
}

export type TChatsList = TChatData[]

export type TChatUsers = {
  chatId: number;
  users?: number[];
}

export type TChatsResponse = {
  userId: number;
  result: TChatData;
}

export type TChatsTokenList = Array<{
  token: string;
}>

export type TFindUserRequest = {
  login: string;
}

export type TChatsError = {
  reason: string;
}

/* eslint-enable camelcase */
