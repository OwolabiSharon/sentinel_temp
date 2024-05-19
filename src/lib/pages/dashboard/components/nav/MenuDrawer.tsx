import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from '@chakra-ui/react';
import type { ReactNode } from 'react';

import Logo from '~/lib/components/Logo';

import NavBottomItems from './NavBottomItems';

type MenuDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};
const MenuDrawer = ({ isOpen, onClose, children }: MenuDrawerProps) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="left"
      blockScrollOnMount
    >
      <DrawerOverlay />
      <DrawerContent backgroundColor="brand.blue.500">
        <DrawerHeader>
          <Logo
            width={120}
            color="white"
            boxProps={{ display: 'flex', justifyContent: 'center', mt: 4 }}
          />
        </DrawerHeader>
        <DrawerBody>{children}</DrawerBody>
        <DrawerFooter
          width="full"
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <NavBottomItems color="white" />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MenuDrawer;
