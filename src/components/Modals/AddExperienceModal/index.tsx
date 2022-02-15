import { DialogTitle, Dialog } from '@mui/material';
import { FC } from 'react';
import { ExperienceCaseForm } from '@components';
import { ExperienceCase } from '../../Forms/CreateProfileForm/formInitialValues';

interface AddExperienceModalProps {
  handleCloseModal: () => void;
  handleSaveExperience(_values: ExperienceCase): void;
  open: boolean;
}

export const AddExperienceModal: FC<AddExperienceModalProps> = ({
  handleCloseModal,
  handleSaveExperience,
  open
}) => {
  return (
    <Dialog open={open} onClose={handleCloseModal} maxWidth="md" fullWidth>
      <DialogTitle>Add experience case</DialogTitle>
      <ExperienceCaseForm
        handleSaveExperience={handleSaveExperience}
        handleCloseModal={handleCloseModal}
      />
    </Dialog>
  );
};
