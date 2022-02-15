import { Card, Icon, Typography } from '@mui/material';
import { ElementType, FC } from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

interface ServiceCardProps {
  title: string;
  icon: ElementType<any>;
  description: string;
}

export const ServiceCard: FC<ServiceCardProps> = ({ title, icon, description }) => (
  <Card
    sx={{
      minWidth: 270,
      padding: '20px 0',
      transition: 'all 0.2s ease',
      '&:hover': {
        transform: 'scale(1.05)'
      }
    }}>
    <Icon color="primary" component={icon} sx={{ fontSize: '35px !important' }} />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
    <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
      <Button variant="contained" size="small" color="secondary">
        Find specialist
      </Button>
    </CardActions>
  </Card>
);
