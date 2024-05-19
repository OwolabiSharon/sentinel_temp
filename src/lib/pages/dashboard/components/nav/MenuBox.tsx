import type { ColorProps } from '@chakra-ui/react';
import { VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { AiOutlineUser, AiOutlineBell } from 'react-icons/ai';
import { RiDashboardLine, RiHome3Line } from 'react-icons/ri';

import NavItem from './NavItem';

const navItems = [
  {
    name: 'dashboard',
    icon: RiHome3Line,
    url: '',
  },
  {
    name: 'services',
    icon: RiDashboardLine,
    url: '/services',
  },
  {
    name: 'notifications',
    icon: AiOutlineBell,
    url: '/notification-method',
  },
  {
    name: 'account',
    icon: AiOutlineUser,
    url: '/account',
  },
];

type MenuBoxProps = {
  color: ColorProps['color'];
};
const MenuBox = ({ color }: MenuBoxProps) => {
  const router = useRouter();
  return (
    <VStack mt={{ base: 16 }} rowGap={{ base: 1 }}>
      {navItems.map((value) => (
        <NavItem
          key={value.name}
          name={value.name}
          icon={value.icon}
          color={color}
          url={value.url}
          active={router.pathname === `/dashboard${value.url}`}
        />
      ))}
    </VStack>
  );
};

export default MenuBox;
