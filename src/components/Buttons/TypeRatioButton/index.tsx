import { Typography, useRadioGroup } from '@mui/material';
import { ReactNode, ChangeEvent, useState, useEffect, FC } from 'react';
import { TypeRadioButtonStyled } from './styles';

export const TypeRadioButton: FC<{
  title: string;
  icon: ReactNode;
  value: string;
}> = ({ title, icon, value }) => {
  const radioGroup = useRadioGroup();
  const [checked, setChecked] = useState<boolean>(false);

  const radioGroupValue = radioGroup?.value as string;

  useEffect(() => {
    setChecked(radioGroupValue === value);
  }, [radioGroupValue, value]);

  const handleChange = () => {
    if (radioGroup) {
      const target = { value } as EventTarget & HTMLInputElement;
      radioGroup.onChange({ target } as ChangeEvent<HTMLInputElement>, value);
    }
  };

  return (
    <TypeRadioButtonStyled elevation={8} active={checked ? 1 : 0} onClick={handleChange}>
      {icon}
      <Typography mt={2}>{title}</Typography>
    </TypeRadioButtonStyled>
  );
};
