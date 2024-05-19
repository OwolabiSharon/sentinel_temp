import type { ModalProps } from '@chakra-ui/react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';

import { SectionTitle2 } from '../title';

type BasicModalProps = {
  title?: string;
};
const BasicModal = ({
  title,
  children,
  ...modalProps
}: BasicModalProps & ModalProps) => {
  return (
    <Modal {...modalProps} isCentered>
      <ModalOverlay />
      <ModalBody>
        <ModalContent p={{ base: 4, md: 6 }}>
          <ModalCloseButton />
          {title && (
            <SectionTitle2
              my={{ base: 4 }}
              width="fit-content"
              mx="auto"
              textAlign="center"
            >
              {title}
            </SectionTitle2>
          )}
          {children}
        </ModalContent>
      </ModalBody>
    </Modal>
  );
};

export default BasicModal;
