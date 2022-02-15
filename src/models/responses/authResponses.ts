import { User } from '../user';

interface IWorkProfile {
  id: string;
  finished: boolean;
}
export interface ITryAuthResponse extends User {
  specialistProfile?: IWorkProfile;
  clientProfile?: IWorkProfile;
}
export interface IAuthenticateWithGoogleResponse {
  token: string;
  user: ITryAuthResponse;
  expirationDate: string;
}
