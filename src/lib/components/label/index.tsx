import type { TextProps, ThemingProps } from '@chakra-ui/react';
import { CloseButton, Text } from '@chakra-ui/react';

type LabelProps = {
  label: string;
  showCloseButton?: boolean;
  closeButtonSize?: ThemingProps<'CloseButton'>['size'];
  onClose?: () => void;
};
const Label = ({
  label,
  showCloseButton,
  closeButtonSize,
  onClose,
  ...props
}: TextProps & LabelProps) => {
  const labelProps: TextProps = {
    as: 'span',
    p: '0.5rem',
    fontSize: { base: 'x-small', md: 'sm' },
    rounded: 'base',
    ...props,
  };
  const closeButtonVisibleProps: TextProps | undefined = showCloseButton
    ? {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 3,
      }
    : undefined;
  return (
    <Text {...labelProps} {...closeButtonVisibleProps}>
      {label}
      {showCloseButton && (
        <CloseButton onClick={onClose} size={closeButtonSize} />
      )}
    </Text>
  );
};

export default Label;
