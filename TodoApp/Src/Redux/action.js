export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_AGE = 'SET_USER_AGE';
export const SET_ALL_USERS = 'SET_ALL_USERS';
export const SET_USER_ID = 'SET_USER_ID ';
export const SET_USER_TASKS = 'SET_USER_TASKS';
export const setName = name => dispatch => {
  dispatch({
    type: SET_USER_NAME,
    payload: name,
  });
};
export const setAge = age => dispatch => {
  dispatch({
    type: SET_USER_AGE,
    payload: age,
  });
};
export const setAllUsers = users => dispatch => {
  dispatch({
    type: SET_ALL_USERS,
    payload: users,
  });
};
export const setTasks = tasks => dispatch => {
  dispatch({
    type: SET_USER_TASKS,
    payload: tasks,
  });
};
export const setID = id => dispatch => {
  dispatch({
    type: SET_USER_ID,
    payload: id,
  });
};
