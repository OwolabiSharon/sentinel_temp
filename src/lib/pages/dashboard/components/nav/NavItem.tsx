import type { ColorProps } from '@chakra-ui/react';
import { HStack, Icon, Text } from '@chakra-ui/react';
import type { IconType } from 'react-icons';

import ChakraLink from '~/lib/components/ChakraLink';

type NavItemProps = {
  name: string;
  icon: IconType;
  color: ColorProps['color'];
  url: string;
  active?: boolean;
};

const activeState = {
  backgroundColor: '#1250A1',
  textDecoration: 'none',
};

const NavItem = ({ name, icon, color, url, active }: NavItemProps) => {
  return (
    <HStack
      color={color}
      width="full"
      align="center"
      py={{ base: 3 }}
      px={{ base: 4 }}
      rounded="base"
      backgroundColor={active ? activeState.backgroundColor : 'transparent'}
      _hover={{ ...activeState, color: 'white' }}
      as={ChakraLink}
      href={`/dashboard${url}`}
    >
      <Icon as={icon} display="inline" boxSize={6} mr={{ base: 1 }} />
      <Text textTransform="capitalize" lineHeight="150%">
        {name}
      </Text>
    </HStack>
  );
};

export default NavItem;
