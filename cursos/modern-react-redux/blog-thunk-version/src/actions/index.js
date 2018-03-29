import axios from "axios";

export const FETCH_POSTS = "fetch_posts";
export const FETCH_POST = "fetch_post";
export const CREATE_POST = "create_post";
export const DELETE_POST = "delete_post";

const ROOT_URL = "http://reduxblog.herokuapp.com/api";
const API_KEY = "?key=AFR";

// Each action creator creates an action that is dispatched to all reducers.

export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

  // returns a function to redux-thunk middleware which will dispatch
  // an action after calling and waiting for this function execution
  return dispatch =>
    request.then(response => dispatch({
      type: FETCH_POSTS,
      payload: response
    }));
}

export function createPost(values, callback) {
  const request = axios
    .post(`${ROOT_URL}/posts${API_KEY}`, values)
    .then(() => callback());

  // returns a function to redux-thunk middleware which will dispatch
  // an action after calling and waiting for this function execution
  return dispatch =>
    request.then(response => dispatch({
      type: CREATE_POST,
      payload: response
    }));
}

export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

  // returns a function to redux-thunk middleware which will dispatch
  // an action after calling and waiting for this function execution
  return dispatch =>
    request.then(response => dispatch({
      type: FETCH_POST,
      payload: response
    }));
}

export function deletePost(id, callback) {
  const request = axios
    .delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
    .then(() => callback());

  return {
    type: DELETE_POST,
    payload: id
  };
}
