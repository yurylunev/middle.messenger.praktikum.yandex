import {Action} from './store';
import {TUserInfo} from '../api/auth-api.d';

const SET_USER = 'user/SET';
const DELETE_USER = 'user/DELETE';
const SET_ERROR = 'user/SET_ERROR';

export const setUser = (user: TUserInfo) => ({
  type: SET_USER,
  payload: user,
});

export const deleteUser = () => ({
  type: DELETE_USER,
});

export const setError = (error: { reason: string }) => ({
  type: SET_ERROR,
  payload: error,
});

export default (state = {profile: null, error: null, isAuthorized: false}, action: Action) => {
  switch (action.type) {
    case SET_USER:
      return {error: null, profile: action.payload, isAuthorized: true};
    case DELETE_USER:
      return {profile: null, error: null, isAuthorized: false};
    case SET_ERROR:
      return {error: action.payload, profile: null, isAuthorized: false};
    default:
      return state;
  }
};
