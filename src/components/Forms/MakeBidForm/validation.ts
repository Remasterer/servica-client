import { priceValidation } from '@utils';
import * as yup from 'yup';
import { workersQuantityValidation } from '../../../utils/validation';

export const makeBidFormValidation = yup.object({
  clientPriceAgree: yup.boolean(),
  price: priceValidation.when('clientPriceAgree', {
    is: false,
    then: priceValidation.required('Please provide us with price')
  }),
  workers: yup.array().of(
    yup.object().shape({
      quantityAgree: yup.boolean(),
      quantity: workersQuantityValidation.when('quantityAgree', {
        is: false,
        then: priceValidation.required('Set quantity of workers which you can provide')
      })
    })
  ),
  applicationLetter: yup.string()
});
