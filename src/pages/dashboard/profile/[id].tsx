import { Typography, Avatar, Box, Divider, Stack, Chip, Button, Grid } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import { EProfileType } from '@enums';
import { useGetUserQuery } from 'src/services/userService';
import { useRouter } from 'next/router';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { withAuthGuard } from '../../../HOC';
import DashboardPage from '../index';

const ProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: user } = useGetUserQuery(id as string, {
    skip: !id
  });
  const isSpecialist = user?.role === EProfileType.SPECIALIST;

  return (
    <DashboardPage>
      <Box display="flex" flexDirection="column" alignItems="center" gap="10px" pt={2}>
        <Avatar
          alt={user?.username}
          src="/static/images/avatar/1.jpg"
          sx={{ width: 60, height: 60 }}
        />
        <Typography variant="body1">{user?.username}</Typography>
        <Typography variant="body2" color={isSpecialist ? 'secondary' : 'primary'}>
          {isSpecialist ? 'Specialist' : 'Client'}
        </Typography>
        <Divider light sx={{ width: '100%' }} />
      </Box>
      <Stack my={2} spacing={1} direction="row" color="text.secondary">
        <LocationOnIcon fontSize="medium" />
        <Typography variant="body1">Working locations:</Typography>
        <Typography variant="body1" color="text.primary">
          Lviv, Ivano-frankivsk
        </Typography>
      </Stack>
      <Divider light sx={{ width: '100%' }} />
      <Stack my={2} spacing={1} direction="row" color="text.secondary">
        <HomeRepairServiceIcon fontSize="medium" />
        <Typography variant="body1">Services:</Typography>
        <Stack color="text.primary" direction="row" spacing={1} rowGap={1} flexWrap="wrap">
          {user?.specialistProfile?.services.map((service: string) => (
            <Chip key={service} label={service} />
          ))}
        </Stack>
      </Stack>
      <Divider light sx={{ width: '100%' }} />
      <Stack my={2} spacing={1} direction="row" color="text.secondary">
        <EmojiEventsIcon fontSize="medium" />
        <Typography variant="body1">Experience cases:</Typography>
      </Stack>
      <Grid container spacing={2}>
        {user?.specialistProfile?.experienceCases.map((experienceCase) => (
          <Grid item md={5} key={experienceCase.id}>
            <Card variant="outlined" sx={{ borderColor: 'primary.light' }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="primary" gutterBottom>
                  {experienceCase.title}
                </Typography>
                <Typography variant="h5" component="div" />
                <Typography variant="body2">{experienceCase.description}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" startIcon={<EditIcon />}>
                  Edit
                </Button>
                <Button size="small" startIcon={<DeleteIcon />}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </DashboardPage>
  );
};

export default withAuthGuard(ProfilePage, true, false, true);
