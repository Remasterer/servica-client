import * as yup from 'yup';

export const workersQuantityValidation = yup
  .number()
  .min(1, 'At least one worker')
  .max(100, '100 Worker is maximum');

export const priceValidation = yup.number().min(1, 'Price start from 1 dollar');
