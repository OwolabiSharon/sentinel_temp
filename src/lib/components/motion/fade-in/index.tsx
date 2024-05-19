import type { BoxProps } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type FadeInProps = {
  children: ReactNode;
  props?: BoxProps;
};
const FadeIn = ({ children, props }: FadeInProps) => {
  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition="3s ease-in"
      {...props}
    >
      {children}
    </Box>
  );
};

export default FadeIn;
