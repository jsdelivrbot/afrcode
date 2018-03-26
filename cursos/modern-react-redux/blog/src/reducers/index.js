import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import PostsReducer from "./reducer_posts";

// Each reducer produces a fresh piece of the application state.
const rootReducer = combineReducers({
  posts: PostsReducer, // apllication state.posts
  form: formReducer // application state.form
});

export default rootReducer;
