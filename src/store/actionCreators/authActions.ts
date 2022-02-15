import { AuthService } from '@services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAuthenticateWithGoogleRequest } from '@models';

export const autoLogoutThunk = createAsyncThunk('auth/autoLogout', () => {
  AuthService.autoLogout();
});

export const authenticateWithGoogleThunk = createAsyncThunk(
  'auth/authenticateWithGoogle',
  async (requestBody: IAuthenticateWithGoogleRequest, thunkAPI) => {
    try {
      const data = await AuthService.authenticateWithGoogle(
        requestBody.tokenId,
        requestBody.profileType
      );
      await thunkAPI.dispatch(autoLogoutThunk());
      return { userData: data.user };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const tryAuthenticateThunk = createAsyncThunk(
  'auth/tryAuthenticateWithToken',
  async (arg, thunkAPI) => {
    try {
      const data = await AuthService.tryAuthenticate();
      await thunkAPI.dispatch(autoLogoutThunk());
      return { userData: data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
