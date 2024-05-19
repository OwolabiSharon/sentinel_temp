/* eslint-disable prettier/prettier */
import { Stack, Box, Flex, Icon } from '@chakra-ui/react';
import { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

import Logo from '../../../../components/Logo';
import useDeviceType from '../../../../hooks/device-type';

import MenuBox from './MenuBox';
import MenuDrawer from './MenuDrawer';
import NavBottomItems from './NavBottomItems';

const Nav = () => {
  const { isPc } = useDeviceType();
  const [state, setState] = useState(false);
  return (
    <Box
      width={!isPc ? 'full' : 'sm'}
      bgColor="brand.blue.500"
      height={!isPc ? 'initial' : '100vh'}
      position={!isPc ? 'initial' : 'relative'}
    >
      <Flex
        direction={!isPc ? 'row-reverse' : 'column'}
        p={{ base: 4 }}
        justify={!isPc ? 'space-between' : 'initial'}
        align={!isPc ? 'center' : 'initial'}
        position={{ base: 'relative' }}
      >
        <Box width={{ base: 'full', lg: 'unset' }} py={{ md: 4 }}>
          <Logo
            width={!isPc ? 120 : 150}
            color="white"
            boxProps={{
              display: 'flex',
              justifyContent: 'center',
            }}
          />
        </Box>
        {isPc ? (
          <MenuBox color="white" />
        ) : (
          <>
            <MenuDrawer isOpen={state} onClose={() => setState(false)}>
              <MenuBox color="white" />
            </MenuDrawer>
            <Icon
              onClick={() => setState(true)}
              as={AiOutlineMenu}
              color="white"
              boxSize={{ base: 8, md: 10 }}
              position={{ base: 'absolute', lg: 'relative' }}
              top={0}
              left={0}
              transform={{
                base: 'translate(40%, 60%)',
                md: 'translate(50%, 80%)',
              }}
            />
          </>
        )}
      </Flex>
      {!isPc || (
        <Stack
          __css={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
          width="full"
          p={{ base: 4 }}
          spacing={4}
          direction="column"
        >
          <NavBottomItems color="white" />
        </Stack>
      )}
    </Box>
  );
};

export default Nav;
