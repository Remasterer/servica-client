import { EProfileType } from '@enums';

export interface User {
  id: string;
  username: string;
  email: string;
  role: EProfileType;
}
