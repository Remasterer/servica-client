import { FC } from 'react';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import PersonIcon from '@mui/icons-material/Person';

interface TagsWorkersProps {
  items: { quantity: number; type: string }[] | null | undefined;
}

export const TagsWorkers: FC<TagsWorkersProps> = ({ items }) => {
  return items && items.length > 0 ? (
    <Stack direction="row" spacing={1} rowGap={1} flexWrap="wrap">
      {items.map(({ quantity, type }) => (
        <Chip
          icon={<PersonIcon />}
          key={type}
          label={`${quantity}   ${type}`}
          color="secondary"
          sx={{
            '& .MuiChip-label': {
              fontSize: 15,
              wordSpacing: 5
            }
          }}
        />
      ))}
    </Stack>
  ) : null;
};
