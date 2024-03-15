import { combineReducers, configureStore } from '@reduxjs/toolkit';
import exampleReducer from './exampleReducer';

const rootReducer = combineReducers({
  // list of Reducers
  exampleReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// useSelector 시
// const example = useSelector((state: RootState) => state.exampleReducer.exampleActionFunction);
