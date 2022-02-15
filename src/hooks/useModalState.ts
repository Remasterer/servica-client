import { useState } from 'react';

export const useModalState = (): [boolean, boolean, (_mode?: boolean) => void, () => void] => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalAlternativeMode, setModalAlternativeMode] = useState<boolean>(false);

  const handleModalOpen = (alternativeMode?: boolean) => {
    setModalAlternativeMode(alternativeMode || false);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return [isModalOpen, modalAlternativeMode, handleModalOpen, handleModalClose];
};
