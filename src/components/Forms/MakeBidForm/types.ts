interface TenderBidFormValuesWorkers {
  type: string;
  quantity: number | string;
  quantityAgree: boolean;
  neededQuantity: number;
}

export type TenderBidFormValues = {
  workers?: TenderBidFormValuesWorkers[];
  clientPriceAgree: boolean;
} & Omit<TenderBid, 'workers'>;

interface TenderBidWorkers {
  type: string;
  quantity: number;
}

export interface TenderBid {
  price: number | '';
  applicationLetter: string;
  workers?: TenderBidWorkers[];
}
