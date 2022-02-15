import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GavelIcon from '@mui/icons-material/Gavel';
import ArticleIcon from '@mui/icons-material/Article';
import { DashboardMenuItemProps } from '../../DashboardMenu';

export const specialistMenuItems: DashboardMenuItemProps[] = [
  {
    href: '/dashboard/tenders',
    text: 'Tenders',
    icon: <GavelIcon />
  },
  {
    href: '/dashboard/orders',
    text: 'Orders',
    icon: <AttachMoneyIcon />,
    disabled: true
  },
  {
    href: '/dashboard/contracts',
    text: 'Contracts',
    icon: <ArticleIcon />,
    disabled: true
  }
];
