import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { FC } from 'react';
import { useRouter } from 'next/router';
import { getLeftTime } from '@utils';
import { Tender } from '@models';
import { TagsWorkers, TagsServices } from '../../Tags';

export const SpecialistTenderCard: FC<Partial<Tender>> = ({
  id,
  title,
  description,
  price,
  services,
  endDate,
  workers
}) => {
  const router = useRouter();

  const handleClickOnCard = () => {
    router.push(`/dashboard/tenders/${id || ''}`).catch((err) => console.error(err));
  };
  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        cursor: 'pointer'
      }}
      onClick={handleClickOnCard}
      variant="outlined">
      <CardContent sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Typography component="div" variant="h6" mb={1}>
          {title}
        </Typography>
        {price && (
          <Typography
            component="div"
            variant="h5"
            color="primary"
            sx={{ fontWeight: 'bold' }}
            mb={1}>
            {price} $
          </Typography>
        )}
        {description && (
          <Typography variant="subtitle1" color="text.secondary" component="div" mb={2}>
            {description}
          </Typography>
        )}
        {services && services.length > 0 && (
          <Box my={1}>
            <TagsServices items={services} />
          </Box>
        )}
        {workers && workers.length > 0 && (
          <Box my={1}>
            <TagsWorkers items={workers} />
          </Box>
        )}
        {endDate && (
          <Stack direction="row" spacing={1} mt={3}>
            <Typography component="div" variant="subtitle1">
              Ends in:
            </Typography>
            <Typography
              component="div"
              variant="subtitle1"
              color="primary"
              sx={{ fontWeight: 'bold' }}>
              {getLeftTime(endDate)}
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

// SpecialistTenderCard.defaultProps = {
//   id: null,
//   title: null,
//   price: null,
//   description: null,
//   services: null,
//   endDate: null
// };
