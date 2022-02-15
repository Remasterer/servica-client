import { EProfileType } from '@enums';
import { AxiosResponse } from 'axios';
import { ITryAuthResponse, IAuthenticateWithGoogleResponse } from '@models';
import { axiosInstance } from '../axios';

export class AuthService {
  static async authenticateWithGoogle(
    googleTokenId: string,
    profileType?: EProfileType
  ): Promise<IAuthenticateWithGoogleResponse> {
    const { data }: AxiosResponse<IAuthenticateWithGoogleResponse> = await axiosInstance.post(
      'auth/googleAuth',
      {
        tokenId: googleTokenId,
        profileType
      }
    );

    localStorage.setItem('token', data.token);
    localStorage.setItem('expirationDate', data.expirationDate);

    return data;
  }

  static autoLogout(): void {
    let expirationDate: string | null = localStorage.getItem('expirationDate');

    if (expirationDate) {
      const currentTime = new Date().getTime();
      const expirationTime = new Date(expirationDate).getTime();

      if (expirationTime > currentTime) {
        const remainingTime = expirationTime - currentTime;
        setTimeout(() => {
          this.logout();
        }, remainingTime);
      }
    }
  }

  static async tryAuthenticate(): Promise<ITryAuthResponse | null> {
    const { data }: AxiosResponse<ITryAuthResponse> = await axiosInstance.get('auth/me');
    return data;
  }

  static logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
  }

  static async checkAuthentication(): Promise<boolean> {
    const { data }: AxiosResponse<{ tokenVerified: boolean }> = await axiosInstance.post(
      'auth/verifyToken'
    );

    return data.tokenVerified;
  }
}
