import type { ColorProps } from '@chakra-ui/react';
import { Icon, Text, HStack } from '@chakra-ui/react';
import type { IconType } from 'react-icons';

import ChakraLink from '~/lib/components/ChakraLink';

type NavItemProps = {
  name: string;
  icon: IconType;
  color: ColorProps['color'];
  url: string;
  active?: boolean;
  onClick?: () => void; // Define onClick prop as a function that takes no arguments and returns void
};

const activeState = {
  backgroundColor: '#1250A1',
  textDecoration: 'none',
};

const LogoutButton = ({
  name,
  icon,
  color,
  url,
  active,
  onClick,
}: NavItemProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick(); // Call the onClick function if it's provided
    }
  };

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
      as={onClick ? 'button' : ChakraLink} // Render as a button if onClick is provided
      href={onClick ? undefined : `/dashboard${url}`} // Remove href if onClick is provided
      onClick={handleClick} // Call handleClick function when the button is clicked
    >
      <Icon as={icon} display="inline" boxSize={6} mr={{ base: 1 }} />
      <Text textTransform="capitalize" lineHeight="150%">
        {name}
      </Text>
    </HStack>
  );
};

export default LogoutButton;
