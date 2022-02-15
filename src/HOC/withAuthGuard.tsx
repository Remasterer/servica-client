import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from '@hooks';
import { EProfileType } from '@enums';

export const withAuthGuard = (
  WrappedComponent: FC,
  protectedAuth: boolean,
  redirectToAuth?: boolean,
  protectedFinishedProfile?: boolean
) => {
  const HOC = ({ ...props }) => {
    const { push } = useRouter();
    const user = useAppSelector((state) => state.auth.user);
    const isAuthenticated = !!user;
    const userIsLoading = useAppSelector((state) => state.auth.userIsLoading);
    const userLoginRole = useAppSelector((state) => state.auth.loginRole);

    const hasProfile = user?.specialistProfile || user?.clientProfile;
    const isProfileFinished =
      userLoginRole === EProfileType.SPECIALIST
        ? user?.specialistProfile?.finished
        : user?.clientProfile?.finished;
    const authPath = isProfileFinished
      ? '/dashboard'
      : `/create-profile${hasProfile ? '' : '?noWorkingProfile=true'}`;

    useEffect(() => {
      if (userIsLoading === 'fulfilled' || userIsLoading === 'rejected') {
        if (isAuthenticated && redirectToAuth) {
          push(authPath).catch((err) => console.error(err));
        } else if (!isAuthenticated && protectedAuth) {
          push('/').catch((err) => console.error(err));
        } else if (!isProfileFinished && protectedFinishedProfile) {
          push(authPath).catch((err) => console.error(err));
        }
      }
    }, [isAuthenticated, push, userIsLoading, authPath, isProfileFinished]);

    if (protectedAuth && !isAuthenticated) {
      return null;
    }

    if (!isProfileFinished && protectedFinishedProfile) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return HOC;
};
