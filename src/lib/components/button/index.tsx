/* eslint-disable sonarjs/no-duplicate-string */
import type { ButtonProps, TextProps } from '@chakra-ui/react';
import { Text, Button } from '@chakra-ui/react';

export const PrimaryButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      colorScheme="brand.blue"
      color="white"
      _disabled={{
        _hover: {
          cursor: 'not-allowed',
          bgColor: 'brand.darkGray.600',
        },
        bgColor: 'brand.darkGray.600',
        color: 'brand.lightGray.700',
      }}
      rounded="base"
      {...props}
    >
      {children}
    </Button>
  );
};

export const TextLikeButton = ({ children, _hover, ...props }: TextProps) => {
  return (
    <Text
      color="brand.primary.900"
      _hover={{
        cursor: 'pointer',
        color: 'brand.primary.800',
        ..._hover,
      }}
      display="inline"
      fontWeight="semibold"
      {...props}
    >
      {children}
    </Text>
  );
};

export const GradientButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      color="brand.saturatedWhite"
      background="linear-gradient(90deg, #084EAB 0%, #0A65DB 110.96%)"
      rounded="lg"
      fontWeight="medium"
      _hover={{
        background: 'linear-gradient(90deg, #0A65DB 0%, #247EF5 110.96%)',
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export const DarkButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      colorScheme="brand.blackAlpha"
      color="white"
      _disabled={{
        _hover: {
          cursor: 'not-allowed',
          bgColor: 'brand.darkGray.600',
        },
        bgColor: 'brand.darkGray.600',
        color: 'brand.lightGray.700',
      }}
      rounded="base"
      {...props}
    >
      {children}
    </Button>
  );
};

export const RedFilledButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      backgroundColor="brand.error.main"
      color="white"
      {...props}
      rounded="base"
      _hover={{
        variant: 'outline',
        color: 'brand.error.main',
        backgroundColor: 'white',
        borderColor: 'brand.error.main',
        borderWidth: '1px',
      }}
    >
      {children}
    </Button>
  );
};

export const RedOutlineButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button colorScheme="brand.red" variant="outline" {...props} rounded="base">
      {children}
    </Button>
  );
};
