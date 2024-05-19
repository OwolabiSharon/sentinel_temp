import type { LinkProps } from '@chakra-ui/react';
import { Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import type { ReactNode } from 'react';

type ChakraLinkProps = {
  children: ReactNode;
};

/**
 * Creates a link using the Link component from Chakra.
 * Receives same props as the Link component
 */
const ChakraLink = ({
  children,
  _hover,
  ...linkProps
}: ChakraLinkProps & LinkProps) => {
  return (
    <Link
      as={NextLink}
      color="brand.primary.900"
      _hover={{
        textDecoration: 'none',
        color: 'brand.primary.800',
        ..._hover,
      }}
      {...linkProps}
    >
      {children}
    </Link>
  );
};

export default ChakraLink;
