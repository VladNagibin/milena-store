import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export class ILoginData {
  login: string = '';
  token: string = '';
}

const localstorageName = 'milena-store-authefication';

const sLocalstorage = localStorage.getItem(localstorageName);
const initialState: ILoginData = sLocalstorage
  ? JSON.parse(sLocalstorage)
  : {
      login: '',
      token: '',
    };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    enter: (state = initialState, action: PayloadAction<ILoginData>) => {
      localStorage.setItem(
        localstorageName,
        JSON.stringify({
          login: action.payload.login,
          token: action.payload.token,
        }),
      );
      state.login = action.payload.login;
      state.token = action.payload.token;
    },
    out: (state) => {
      localStorage.removeItem(localstorageName);
      state.login = '';
      state.token = '';
    },
  },
});
export const { enter, out } = authSlice.actions;

export default authSlice.reducer;
