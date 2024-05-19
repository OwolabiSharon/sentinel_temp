import {
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  Flex,
  ModalOverlay,
  Box,
  Image,
} from '@chakra-ui/react';
import type { ReactNode } from 'react';
import type { IconType } from 'react-icons';

import supabase from '../../supabase';
import { RedFilledButton } from '../button';
import { SectionTitle2 } from '../title';

type AlertModalProps = {
  isOpen: boolean;
  onClose: () => void;
  icon?: IconType;
  title: string;
  text: ReactNode;
  ctaText: string;
  email?: string;
};
const AlertModal = ({
  isOpen,
  onClose,
  icon,
  title,
  text,
  ctaText,
  email,
}: AlertModalProps) => {
  const removeUser = async () => {
    const { data, error } = await supabase
      .from('users')
      .update({ organization_id: null, role: null })
      .eq('email', email);

    if (error) {
      console.error('Error updating user:', error.message);
      onClose();
    } else {
      console.log('User updated successfully:', data);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: 'md' }}
      closeOnOverlayClick={false}
      isCentered
    >
      <ModalBody>
        <ModalOverlay />
        <ModalContent p={{ base: 8 }} textAlign="center">
          <Box width="fit-content" mx="auto" mb={{ base: 4 }}>
            {icon ? (
              <Icon as={icon} boxSize={{ base: 8 }} color="brand.error.main" />
            ) : (
              <Image width="20" src="/assets/svg/caution.svg" />
            )}
          </Box>
          <SectionTitle2>{title}</SectionTitle2>
          <Box
            fontSize={{ base: 'sm' }}
            color="blackAlpha.800"
            mb={{ base: 8 }}
          >
            {text}
          </Box>
          <Flex gap={{ base: 3 }} justify="center">
            <Button
              variant="outline"
              colorScheme="blackAlpha"
              color="black"
              borderColor="gray.400"
              shadow="sm"
              onClick={onClose}
            >
              Back
            </Button>
            <RedFilledButton onClick={removeUser}>{ctaText}</RedFilledButton>
          </Flex>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
};

export default AlertModal;
