import { VStack } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

import Logo from '~/lib/components/Logo';

const Home = () => {
  return (
    <VStack w="full" h="100vh" justify="center" align="center">
      <NextSeo title="Home" />
      <Logo width={137} />
    </VStack>
  );
};

export default Home;
