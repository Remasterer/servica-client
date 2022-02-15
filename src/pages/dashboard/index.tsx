import { NextPage } from 'next';
import { useAppSelector } from '@hooks';
import { EProfileType } from '@enums';
import { DashboardClient, DashboardSpecialist } from '@components';
import { withAuthGuard } from '../../HOC';

const DashboardPage: NextPage = ({ children }) => {
  const authRole = useAppSelector((state) => state.auth.loginRole);

  return authRole === EProfileType.CLIENT ? (
    <DashboardClient>{children}</DashboardClient>
  ) : (
    <DashboardSpecialist>{children}</DashboardSpecialist>
  );
};

export default withAuthGuard(DashboardPage, true, false, true);
