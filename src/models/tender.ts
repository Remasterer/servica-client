import { ServiceOptionType } from './services';
import { User } from './user';

interface TenderWorker {
  quantity: number | '';
  type: { name: string };
}

export type TenderFormValues = {
  price: number | '';
  endDate: Date | '';
  type: string;
  services?: ServiceOptionType[];
  workers?: TenderWorker[];
} & Omit<Tender, 'id' | 'price' | 'endDate' | 'services' | 'workers'>;

export interface Tender {
  id: string;
  title: string;
  description: string;
  price?: number;
  endDate?: Date;
  type: string;
  services?: string[];
  workers?: { type: string; quantity: number }[];
  user?: User;
}
