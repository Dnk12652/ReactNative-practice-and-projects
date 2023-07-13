import {
  SET_USER_NAME,
  SET_USER_AGE,
  SET_ALL_USERS,
  SET_USER_ID,
  SET_USER_TASKS,
} from './action';

const initialState = {
  name: '',
  age: 0,
  tasks: [],
  id: 0,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_NAME:
      return {...state, name: action.payload};
    case SET_USER_AGE:
      return {...state, age: action.payload};
    case SET_ALL_USERS:
      return {...state, users: action.payload};
    case SET_USER_ID:
      return {...state, id: action.payload};
    case SET_USER_TASKS:
      return {...state, tasks: action.payload};
    default:
      return state;
  }
}

export default userReducer;
