import MenuList from '@mui/material/MenuList';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { DashboardMenuItemStyled } from './styles';
import { DashboardMenuItemProps } from './types';

interface DashboardMenuProps {
  menuItems: DashboardMenuItemProps[];
}

export const DashboardMenu: FC<DashboardMenuProps> = ({ menuItems }) => {
  const { asPath } = useRouter();
  return (
    <MenuList sx={{ maxWidth: '80%' }}>
      {menuItems.map((item) => (
        <Link href={item.href} key={item.href}>
          <DashboardMenuItemStyled active={asPath === item.href} disabled={item.disabled}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.text}</ListItemText>
          </DashboardMenuItemStyled>
        </Link>
      ))}
    </MenuList>
  );
};
