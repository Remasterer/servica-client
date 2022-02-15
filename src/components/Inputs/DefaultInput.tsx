import { InputLabel, OutlinedInput, OutlinedInputProps } from '@mui/material';
import { FC } from 'react';

type OutlinedTextInputProps = {
  inputLabel: string;
} & OutlinedInputProps;

export const DefaultInput: FC<OutlinedTextInputProps> = ({ inputLabel, ...props }) => {
  return (
    <>
      <InputLabel shrink htmlFor={props.id} sx={{ fontSize: 18 }}>
        {inputLabel}
      </InputLabel>
      <OutlinedInput
        {...props}
        sx={{
          'label + &': {
            marginTop: 3
          }
        }}
      />
    </>
  );
};
