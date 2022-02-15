import { IRadioOptions,  TypeRadioButton } from '@components';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import { EProfileType } from '@enums';

export const profileTypeOptions: IRadioOptions[] = [
  {
    value: EProfileType.CLIENT,
    control: (
      <TypeRadioButton
        title="Find worker"
        icon={<HomeRepairServiceIcon sx={{ fontSize: '4.9rem' }} />}
        value={EProfileType.CLIENT}
      />
    )
  },
  {
    value: EProfileType.SPECIALIST,
    control: (
      <TypeRadioButton
        title="Find job"
        icon={<AttachMoneyIcon sx={{ fontSize: '4.9rem' }} />}
        value={EProfileType.SPECIALIST}
      />
    )
  }
];
