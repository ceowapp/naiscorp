import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Auth {
 sessionId: string | undefined;
 email: string | undefined;
 userId: string | undefined;
}

const initialState: Auth = {
 sessionId: undefined,
 email: undefined,
 userId: undefined,
};

const authSlice = createSlice({
 name: "auth",
 initialState,
 reducers: {
   storeSession: (state, action: PayloadAction<Partial<Auth>>) => {
     Object.assign(state, action.payload);
   },
   reset: () => {
     return initialState;
   },
 },
});

export const { storeSession, reset } = authSlice.actions;

export const selectSession = (state: { auth: Auth }) => state.auth;

export default authSlice.reducer;