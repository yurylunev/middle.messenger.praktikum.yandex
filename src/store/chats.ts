import {Action} from './store';
import {TChatData, TChatsList} from '../api/chats-api.d';

const SET_CURRENT_CHAT = 'currentChat/SET';
const SET_CHATS_LIST = 'chatsList/SET';
const DELETE_CHAT = 'currentChat/DELETE';
const SET_MESSAGES_MOCK = 'messages/SET';
const SET_ERROR = 'chats/SET_ERROR';

export const setCurrentChat = (chatData: TChatData) => ({
  type: SET_CURRENT_CHAT,
  payload: chatData,
});

export const setChatsList = (chatsList: TChatsList) => ({
  type: SET_CHATS_LIST,
  payload: chatsList,
});

export const deleteChat = () => ({
  type: DELETE_CHAT,
});

export const setError = (error: { reason: string }) => ({
  type: SET_ERROR,
  payload: error,
});

export default (state = {currentChat: null, chatsList: [], messages: []}, action: Action) => {
  switch (action.type) {
    case SET_CURRENT_CHAT:
      return {...state, currentChat: action.payload};
    case SET_CHATS_LIST:
      return {...state, chatsList: action.payload, currentId: 0};
    case DELETE_CHAT:
      return {};
    case SET_MESSAGES_MOCK:
      return {...state, messages: action.payload};
    case SET_ERROR:
      return {error: action.payload};
    default:
      return state;
  }
};
