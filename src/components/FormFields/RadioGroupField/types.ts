import { ReactElement } from 'react';

export interface IRadioOptions {
  value: string;
  control?: ReactElement<any, any>;
  label?: string | ReactElement;
}
