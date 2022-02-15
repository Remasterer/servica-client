import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { SeeAssignersButton } from '@components';

interface ClientTenderCardPreviewProps {
  title?: string | null;
  id?: string | null;
  endTime?: string | null;
}

export const ClientTenderCardPreview: FC<ClientTenderCardPreviewProps> = ({
  title,
  endTime,
  id
}) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1">
          {title}
        </Typography>
        {endTime && (
          <Typography color="secondary" variant="subtitle1" fontSize={17}>
            {endTime} left
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        {id && <SeeAssignersButton id={id} />}
      </CardActions>
    </Card>
  );
};

ClientTenderCardPreview.defaultProps = {
  title: null,
  endTime: null,
  id: null
};
