export * from './authResponses';
export * from './userResponses';
export * from './tenderResponses';

export interface ResponseDefault<T> {
  status: 'success';
  results?: number;
  data: T;
}
