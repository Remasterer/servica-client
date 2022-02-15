import { ESpecialistProfileType, EWorkersQuantity, EProfileType } from '@enums';
import * as yup from 'yup';
import { formModel } from './formModel';

const {
  formField: { profileType, specialistProfileType, workersNumber, services, experienceCases }
} = formModel;

const {
  fields: { title, description, startYear, startMonth, endMonth, endYear }
} = experienceCases;

export const experienceCaseGeneral = {
  [title.name]: yup.string().min(5, 'Title must be at least 6 characters long').required(),
  [description.name]: yup.string().min(10, 'Description must have at least 20 symbols').required()
};

const checkDates = (dateOne: string, dateTwo: string, dateThree: string) =>
  [dateOne, dateTwo, dateThree].every((date) => !date);

export const experienceFormValidation = yup.object().shape(
  {
    ...experienceCaseGeneral,
    [startYear.name]: yup.string().when([endYear.name, startMonth.name, endMonth.name], {
      is: (date1: string, date2: string, date3: string) => checkDates(date1, date2, date3),
      otherwise: yup.string().required('Please specify start year of work.')
    }),
    [startMonth.name]: yup.string().when([startYear.name, endYear.name, endMonth.name], {
      is: (date1: string, date2: string, date3: string) => checkDates(date1, date2, date3),
      otherwise: yup.string().required('Please specify end month of work.')
    }),
    [endYear.name]: yup.string().when([startYear.name, startMonth.name, endMonth.name], {
      is: (date1: string, date2: string, date3: string) => checkDates(date1, date2, date3),
      otherwise: yup.string().required('Please specify start year of work.')
    }),
    [endMonth.name]: yup.string().when([startYear.name, endYear.name, startMonth.name], {
      is: (date1: string, date2: string, date3: string) => checkDates(date1, date2, date3),
      otherwise: yup.string().required('Please specify start month of work.')
    })
  },
  [
    [startYear.name, startMonth.name],
    [startYear.name, endYear.name],
    [startYear.name, endMonth.name],
    [endYear.name, startMonth.name],
    [endYear.name, endMonth.name],
    [startMonth.name, endMonth.name]
  ]
);

export const formValidation = (noProfileTypeSelected: boolean) => [
  noProfileTypeSelected
    ? yup.object().shape({
        [profileType.name]: yup
          .string()
          .oneOf([EProfileType.CLIENT, EProfileType.SPECIALIST])
          .required('Please choose from options above.')
      })
    : undefined,
  yup.object().shape({
    [specialistProfileType.name]: yup
      .string()
      .oneOf([ESpecialistProfileType.INDIVIDUAL, ESpecialistProfileType.MULTIPLE_WORKERS])
      .required('Please choose from options above.'),
    [workersNumber.name]: yup.string().when(specialistProfileType.name, {
      is: (profileTypeValue: string) =>
        profileTypeValue === ESpecialistProfileType.MULTIPLE_WORKERS,
      then: yup
        .string()
        .oneOf([EWorkersQuantity.SMALL, EWorkersQuantity.MEDIUM, EWorkersQuantity.LARGE])
        .required('Please choose size of your team')
    })
  }),
  yup.object().shape({
    [services.name]: yup
      .array()
      .of(
        yup.object().shape({
          title: yup.string().required(),
          serviceCategory: yup.string(),
          inputValue: yup.string()
        })
      )
      .min(1, 'You need to provide al least one service')
  }),
  yup.object().shape({
    [experienceCases.name]: yup.array().of(
      yup.object().shape({
        ...experienceCaseGeneral,
        startDate: yup.string(),
        endDate: yup.string()
      })
    )
  })
];
