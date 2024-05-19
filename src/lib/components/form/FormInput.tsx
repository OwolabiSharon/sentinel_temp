import type { FormLabelProps, InputProps, SpaceProps } from '@chakra-ui/react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import type { ReactNode, RefObject } from 'react';

type FormInputProps = {
  mb?: SpaceProps['mb'];
  label?: string;
  inputProps: InputProps;
  labelProps?: FormLabelProps;
  children?: ReactNode;
  inputRef?: RefObject<HTMLInputElement>;
  required?: boolean;
  isDisabled?: boolean;
};

/**
 * Creates an input element
 *
 * @param {FormInputProps} param0 props for form input
 * @returns {JSX.Element}
 */
const FormInput = ({
  mb,
  label,
  children,
  inputProps,
  labelProps,
  inputRef,
  required,
  isDisabled, 
}: FormInputProps) => {
  const updatedInputProps: InputProps = {
    rounded: 'md',
    variant: 'outline',
    borderColor: 'brand.darkGray.700',
    errorBorderColor: 'brand.error.main',
    borderWidth: '1px',
    fontSize: ['sm', 'md'],
    px: { base: 2 },
    _placeholder: {
      color: 'brand.darkGray.600',
    },
    _focus: {
      outlineColor: 'brand.primary.700',
      outlineWidth: '3px',
      border: 'initial',
    },
    ...inputProps,
  };
  const updatedLabelProps: FormLabelProps = {
    mb: { base: 1, md: 1.5 },
    fontSize: ['sm', 'md'],
    ...labelProps,
  };
  return (
    <FormControl mb={mb === undefined ? 2 : mb}>
      {label && <FormLabel {...updatedLabelProps}>{label}</FormLabel>}
      <Input disabled={isDisabled} {...updatedInputProps} ref={inputRef} required={required} />
      {children}
    </FormControl>
  );
};

export default FormInput;
