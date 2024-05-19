import type { HeadingProps } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';

export const SectionTitle = ({ children, ...props }: HeadingProps) => {
  return (
    <Text lineHeight="140%" fontSize="1.5rem" fontWeight="semibold" {...props}>
      {children}
    </Text>
  );
};

export const SectionTitle2 = ({ children, ...props }: HeadingProps) => {
  return (
    <Text as="h2" fontWeight="bold" lineHeight="140%" fontSize="md" {...props}>
      {children}
    </Text>
  );
};
