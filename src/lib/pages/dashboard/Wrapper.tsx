import { Flex, Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import FadeIn from '../../components/motion/fade-in';
import useDeviceType from '../../hooks/device-type';

import Nav from './components/nav';

type WrapperProps = {
  children: ReactNode;
};
const Wrapper = ({ children }: WrapperProps) => {
  const { isPc } = useDeviceType();
  return (
    <Flex direction={!isPc ? 'column' : 'row'}>
      <Nav />
      <FadeIn
        props={{
          maxHeight: !isPc ? 'initial' : '100vh',
          overflowY: !isPc ? 'initial' : 'scroll',
          width: 'full',
        }}
      >
        <Box
          bgColor="transparent"
          my={{ base: 4, md: 8 }}
          mx={{ base: 4, md: 12 }}
          pb={{ base: 8, md: 'unset' }}
          position="relative"
          boxSizing="border-box"
        >
          {children}
        </Box>
      </FadeIn>
    </Flex>
  );
};

export default Wrapper;
