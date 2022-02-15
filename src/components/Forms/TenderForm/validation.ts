import { priceValidation, workersQuantityValidation } from '@utils';
import * as yup from 'yup';

export const generalInfoValidation = yup.object({
  title: yup
    .string()
    .min(5, 'Title length must be at least 5 characters')
    .required('Title of tender is required'),
  description: yup
    .string()
    .min(10, 'Description length must be at least 10 characters')
    .required('Description of tender is required')
});

export const detailsValidation = yup.object({
  price: priceValidation,
  endDate: yup.date().min(new Date())
});

export const typesValidation = yup.object({
  type: yup
    .string()
    .oneOf(['workers', 'result'])
    .required('Please select what do you expect of this tender'),
  services: yup
    .array()
    .of(yup.object({ title: yup.string().min(1, 'Service name is not valid') }))
    .when('type', {
      is: 'result',
      then: yup
        .array()
        .of(yup.object({ title: yup.string().min(1, 'Service name is not valid') }))
        .min(1, 'You need to provide at least one service')
        .required()
    }),
  workers: yup.array().when('type', {
    is: 'workers',
    then: yup
      .array()
      .of(
        yup.object().shape({
          quantity: workersQuantityValidation.required('Quantity of worker is required'),
          type: yup.object().shape({ name: yup.string().required('Type of worker is required') })
        })
      )
      .min(1, 'You need to provide at least one service')
      .required()
  })
});
