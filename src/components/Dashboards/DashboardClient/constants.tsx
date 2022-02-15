import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GavelIcon from '@mui/icons-material/Gavel';
import ArticleIcon from '@mui/icons-material/Article';
import HomeIcon from '@mui/icons-material/Home';
import { DashboardMenuItemProps } from '../../DashboardMenu';

export const clientMenuItems: DashboardMenuItemProps[] = [
  {
    href: '/dashboard',
    text: 'Home',
    icon: <HomeIcon />
  },
  {
    href: '/dashboard/posted-tenders',
    text: 'Tenders',
    icon: <GavelIcon />
  },
  {
    href: '/dashboard/orders/orders',
    text: 'Orders',
    icon: <AttachMoneyIcon />,
    disabled: true
  },
  {
    href: '/dashboard/contracts/contracts',
    text: 'Contracts',
    icon: <ArticleIcon />,
    disabled: true
  }
];
