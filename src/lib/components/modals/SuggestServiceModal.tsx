import { Box } from '@chakra-ui/react';

import { PrimaryButton } from '../button';
import MTextArea from '../form/MTextArea';

import BasicModal from './BasicModal';

type SuggestServiceModalProps = {
  onClose: () => void;
  isOpen: boolean;
};
const SuggestServiceModal = ({ isOpen, onClose }: SuggestServiceModalProps) => {
  return (
    <BasicModal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      closeOnOverlayClick={false}
      title="Let us know the services methods you want on Sentinel"
    >
      <Box my={{ base: 6 }}>
        <MTextArea placeholder="Message" width="full" isRequired />
      </Box>
      <Box width="fit-content" mx="auto">
        <PrimaryButton onClick={onClose} m={4}>
          Let us know
        </PrimaryButton>
      </Box>
    </BasicModal>
  );
};

export default SuggestServiceModal;
