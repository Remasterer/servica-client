import { createFilterOptions } from '@mui/material/Autocomplete';
import { ServiceOptionType } from '@models';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export const filter = createFilterOptions<ServiceOptionType>();

export const servicesOptions: ServiceOptionType[] = [
  {
    title: 'Installation of sockets and switches',
    serviceCategory: 'Electrician'
  },
  { title: 'Electrical set up and rewiring', serviceCategory: 'Electrician' },
  {
    title: 'Whole house surge protection',
    serviceCategory: 'Electrician'
  },
  { title: 'Smoke and carbon monoxide detector installations', serviceCategory: 'Electrician' }
];

export const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
export const checkedIcon = <CheckBoxIcon fontSize="small" />;
