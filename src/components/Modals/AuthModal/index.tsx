import {
  DialogTitle,
  DialogContent,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Typography,
  Icon,
  Dialog
} from '@mui/material';
import { FC, MouseEvent, useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import { EProfileType } from '@enums';
import { IAuthenticateWithGoogleRequest } from '@models';
import { authenticateWithGoogleThunk } from '@store';
import { useAppDispatch } from '@hooks';

interface AuthModalProps {
  open: boolean;
  handleClose(): void;
  isLogin?: boolean;
}

export const AuthModal: FC<AuthModalProps> = ({ isLogin = false, open, handleClose }) => {
  const dispatch = useAppDispatch();
  const [profileType, setProfileType] = useState<EProfileType>(EProfileType.SPECIALIST);

  const handleChange = (event: MouseEvent<HTMLElement>, newAlignment: EProfileType) => {
    setProfileType(newAlignment);
  };

  const handleFailedGoogleLogin = (response: any) => {
    console.error(response);
  };

  const handleSuccessGoogleLogin = async (
    googleAuthData: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    try {
      const { tokenId } = googleAuthData as GoogleLoginResponse;

      const requestBody: IAuthenticateWithGoogleRequest = { tokenId };

      if (!isLogin && profileType) {
        requestBody.profileType = profileType;
      }
      await dispatch(authenticateWithGoogleThunk(requestBody));
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ textAlign: 'center', padding: '1rem 0 0 0' }}>
        {isLogin ? 'Log in Servica' : 'Create account'}
      </DialogTitle>
      <DialogContent
        sx={{
          textAlign: 'center',
          minHeight: '120px',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
        {!isLogin && (
          <>
            <Typography py={2} variant="h6" color="secondary" sx={{ fontWeight: 'bold' }}>
              I want to
            </Typography>
            <ToggleButtonGroup
              color="primary"
              value={profileType}
              exclusive
              onChange={handleChange}>
              <ToggleButton
                value={EProfileType.CLIENT}
                sx={{ width: '190px', display: 'flex', gap: 1, alignItems: 'center' }}>
                <Icon>
                  <HomeRepairServiceIcon />
                </Icon>
                Find a specialist
              </ToggleButton>
              <ToggleButton
                value={EProfileType.SPECIALIST}
                sx={{ width: '190px', display: 'flex', gap: 1, alignItems: 'center' }}>
                <Icon>
                  <AttachMoneyIcon />
                </Icon>
                Find a job
              </ToggleButton>
            </ToggleButtonGroup>
          </>
        )}
        <GoogleLogin
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}
          buttonText="Log in with Google"
          onSuccess={handleSuccessGoogleLogin}
          onFailure={handleFailedGoogleLogin}
          cookiePolicy="single_host_origin"
          render={(renderProps) => (
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 3, borderRadius: '20px' }}
              startIcon={<GoogleIcon />}
              disabled={renderProps.disabled}
              onClick={renderProps.onClick}>
              <span style={{ flex: 1 }}>Continue with google</span>
            </Button>
          )}
        />
        {/* <Typography my={1}>Or</Typography>
        <TextField
          autoFocus
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        /> */}
      </DialogContent>
      {/* <DialogActions>
        <Button variant="contained" color="secondary" fullWidth>
          Continue with email
        </Button>
      </DialogActions> */}
    </Dialog>
  );
};

AuthModal.defaultProps = {
  isLogin: false
};
