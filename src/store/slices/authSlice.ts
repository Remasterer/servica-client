import { EProfileType } from '@enums';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITryAuthResponse } from '@models';
import { AppDispatch } from '../store';
import { AuthService } from '../../services/authService';
import { authenticateWithGoogleThunk, tryAuthenticateThunk } from '../actionCreators/authActions';

interface AuthState {
  user: ITryAuthResponse | null;
  userIsLoading: 'idle' | 'loading' | 'pending' | 'fulfilled' | 'rejected';
  loginRole: EProfileType | null;
}

const initialState: AuthState = {
  user: null,
  userIsLoading: 'idle',
  loginRole: null
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLogout: (state) => {
      state.user = null;
    }
  },
  extraReducers: {
    [authenticateWithGoogleThunk.pending.type]: (state: AuthState) => {
      state.userIsLoading = 'pending';
    },
    [authenticateWithGoogleThunk.fulfilled.type]: (
      state: AuthState,
      action: PayloadAction<{ userData: ITryAuthResponse }>
    ) => {
      state.user = action.payload.userData;
      state.loginRole = action.payload.userData.role;
      state.userIsLoading = 'fulfilled';
    },
    [tryAuthenticateThunk.pending.type]: (state: AuthState) => {
      state.userIsLoading = 'loading';
    },
    [tryAuthenticateThunk.fulfilled.type]: (
      state: AuthState,
      action: PayloadAction<{ userData: ITryAuthResponse }>
    ) => {
      state.user = action.payload.userData;
      state.loginRole = action.payload.userData.role;
      state.userIsLoading = 'fulfilled';
    },
    [tryAuthenticateThunk.rejected.type]: (state: AuthState) => {
      state.userIsLoading = 'rejected';
    }
  }
});

const { authLogout } = AuthSlice.actions;

export const authLogoutThunk = () => (dispatch: AppDispatch) => {
  AuthService.logout();
  dispatch(authLogout());
};

export const authReducer = AuthSlice.reducer;
