import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type User = {
  _id: string;
  name: string;
  company: string;
  email: string;
  profileImage: string;
  username: string;
};
export interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },

    signOut: (state) => {
      state.user = null;
    },

    update: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { signIn, signOut, update } = authSlice.actions;

export default authSlice.reducer;
