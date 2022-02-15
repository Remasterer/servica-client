import * as React from 'react';
import Typography from '@mui/material/Typography';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
} from '@mui/material';
import { useAppDispatch, useAppSelector, useModalState } from '@hooks';
import { authLogoutThunk } from '@store';
import { AuthModal } from '@components';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { UserBarStyled } from './styles';

interface IHeaderAuthBarProps {
  accent?: boolean;
}

export const HeaderAuthBar: React.FC<IHeaderAuthBarProps> = ({ accent }) => {
  const [openModal, loginModalMode, handleOpenModal, handleCloseModal] = useModalState();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogoutClick = () => {
    dispatch(authLogoutThunk());
    setAnchorElUser(null);
  };

  return user ? (
    <Box sx={{ flexGrow: 0 }}>
      <Box display="flex" alignItems="center" gap="1em">
        <Tooltip title="Open settings">
          <UserBarStyled
            onClick={handleOpenUserMenu}
            display="flex"
            alignItems="center"
            gap="1em"
            accent={accent}>
            <IconButton sx={{ p: 0, color: 'inherit' }}>
              <MenuIcon />
            </IconButton>
            <IconButton sx={{ p: 0 }}>
              <Avatar
                alt={user?.username}
                src="/static/images/avatar/2.jpg"
                sx={{ borderRadius: '.3em', width: '35px', height: '35px' }}
              />
            </IconButton>
          </UserBarStyled>
        </Tooltip>
      </Box>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}>
        <MenuItem>
          <Typography textAlign="center">
            <Link href={`/dashboard/profile/${user.id}`}>Profile</Link>
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleLogoutClick}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  ) : (
    <>
      <Stack direction="row" spacing={2}>
        <Button color="inherit" onClick={() => handleOpenModal(true)}>
          Login
        </Button>
        <Button variant="contained" onClick={() => handleOpenModal(false)}>
          Sign up
        </Button>
      </Stack>
      <AuthModal open={openModal} handleClose={handleCloseModal} isLogin={loginModalMode} />
    </>
  );
};

HeaderAuthBar.defaultProps = {
  accent: false
};
