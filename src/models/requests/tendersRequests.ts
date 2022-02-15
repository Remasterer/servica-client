import { TenderFormValues } from '../tender';

interface TenderCreateBodyWorkers {
  type: string;
  quantity: number;
}

export type TenderCreateBody = {
  services?: string[];
  workers?: TenderCreateBodyWorkers[];
} & Omit<TenderFormValues, 'services' | 'workers'>;
