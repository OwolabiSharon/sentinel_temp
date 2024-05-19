import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      backgroundColor="brand.saturatedWhite"
      width="full"
      minHeight="100vh"
      transition="0.5s ease-out"
    >
      {children}
    </Box>
  );
};

export default Layout;
