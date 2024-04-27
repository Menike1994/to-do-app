import { createSlice } from "@reduxjs/toolkit";

export type authState = {
  isLoading: boolean;
};

const initialState: authState = {
  isLoading: false,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    // setLoading: (state, action: PayloadAction<boolean>) => {
    //   state.isLoading = action.payload;
    // },
  },
});

// export const { setLoading } = AuthSlice.actions;

export default AuthSlice.reducer;
