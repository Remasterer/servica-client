import { FC } from 'react';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

interface TagsServicesProps {
  items: string[] | null | undefined;
}

export const TagsServices: FC<TagsServicesProps> = ({ items }) => {
  return items && items.length > 0 ? (
    <Stack direction="row" spacing={1} rowGap={1} flexWrap="wrap">
      {items.map((item) => (
        <Chip
          key={item}
          label={item}
          color="secondary"
          sx={{
            '& .MuiChip-label': {
              fontSize: 15
            }
          }}
        />
      ))}
    </Stack>
  ) : null;
};
