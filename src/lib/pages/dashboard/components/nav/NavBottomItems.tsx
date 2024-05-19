import type { ColorProps } from '@chakra-ui/react';
import { VStack, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { RiShutDownLine, RiQuestionFill } from 'react-icons/ri';

import supabase from '../../../../supabase';

import LogoutButton from './LogoutButton';

type MenuBoxProps = {
  color: ColorProps['color'];
};

const MenuBox = ({ color }: MenuBoxProps) => {
  const router = useRouter();
  const toast = useToast(); // Initialize useToast hook

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout failed:', error.message);
        toast({
          title: 'Failed',
          description: 'Logging Out failed!',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } else {
        console.log('Logout successful');
        // Display success toast for successful logout
        toast({
          title: 'Success',
          description: 'Logout successful!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        router.push('/login');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <VStack mt={{ base: 16 }} rowGap={{ base: 1 }}>
      <LogoutButton
        name="Help"
        icon={RiQuestionFill}
        color={color}
        url="/help"
        active={router.pathname === '/dashboard/help'}
      />
      <LogoutButton
        name="Log Out"
        icon={RiShutDownLine}
        color={color}
        active={router.pathname === '/dashboard/log-out'}
        onClick={handleLogout}
      />
    </VStack>
  );
};

export default MenuBox;
