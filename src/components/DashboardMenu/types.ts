import { ReactNode } from 'react';

export interface DashboardMenuItemProps {
  href: string;
  text: string;
  icon: ReactNode;
  disabled?: boolean;
}
