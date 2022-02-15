import VisibilityIcon from '@mui/icons-material/Visibility';
import { ButtonProps } from '@mui/material';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface SeeAssignersButtonProps extends ButtonProps {
  id: string;
}

export const SeeAssignersButton: FC<SeeAssignersButtonProps> = ({ id, ...props }) => {
  const router = useRouter();

  const handleClickSeeAssigners = () => {
    router.push(`/dashboard/posted-tenders/${id}/bidders`).catch((err) => console.error(err));
  };

  return (
    <Button
      {...props}
      size="medium"
      startIcon={<VisibilityIcon />}
      onClick={handleClickSeeAssigners}>
      See who bidded
    </Button>
  );
};
