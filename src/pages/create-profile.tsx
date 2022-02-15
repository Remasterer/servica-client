import { CreateProfileForm, Header } from '@components';
import { Container } from '@mui/material';
import { withAuthGuard } from '../HOC';

const CreateProfilePage = () => {
  return (
    <>
      <Header noScrollEffects />
      <Container sx={{ marginTop: '90px', flexGrow: 1 }} maxWidth="md">
        <CreateProfileForm />
      </Container>
    </>
  );
};

export default withAuthGuard(CreateProfilePage, true);
