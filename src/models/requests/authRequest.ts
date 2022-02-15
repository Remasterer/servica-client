import { EProfileType } from '@enums';

export interface IAuthenticateWithGoogleRequest {
  tokenId: string;
  profileType?: EProfileType;
}
