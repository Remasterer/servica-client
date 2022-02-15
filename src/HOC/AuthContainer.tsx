import { useAppDispatch } from '@hooks';
import { FC, ReactNode, useEffect } from 'react';
import { tryAuthenticateThunk } from '../store/actionCreators/authActions';

export const AuthContainer: FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function tryAuth() {
      await dispatch(tryAuthenticateThunk());
    }

    tryAuth().catch((err) => console.error(err));
  }, [dispatch]);

  return <div>{children}</div>;
};
