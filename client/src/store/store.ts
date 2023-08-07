import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authReducer';
import cartReducer from '../reducers/cartReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
