import { Flex, Text, Box } from '@chakra-ui/react';
import { useState, useRef } from 'react';

import { PrimaryButton, TextLikeButton } from '../button';
import FormInput from '../form/FormInput';
import Label from '../label';

import BasicModal from './BasicModal';
import supabase from '../../supabase';

type AddTeammateModalProps = {
  onClose: () => void;
  isOpen: boolean;
  user_id?: string;
  organization_id?: string
};
const AddTeammateModal = ({ isOpen, onClose,user_id,organization_id }: AddTeammateModalProps) => {
  const [mates, setMates] = useState<string[]>([]);
  const [email, setEmail] = useState('')
  const inputRef = useRef<HTMLInputElement>(null);

  const addTeamMate = async(mate: string) => {
    const { data, error } = await supabase.functions.invoke("invite-to-org", {
      body: {user_id ,email ,organization_id },
    })
  };
  return (
    <BasicModal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      closeOnOverlayClick={false}
      title="Add members of your team"
    >
      <Box width="90%" mx="auto">
        <FormInput
          label="Email"
          inputProps={{
            type: 'email',
            placeholder: 'Email',
            p: 2,
            bgColor: 'whiteAlpha.500',
            onChange: (e) => setEmail(e.target.value)
          }}
          required
          inputRef={inputRef}
        >
          <TextLikeButton onClick={addTeamMate} fontSize="small">
            Add another teammate
          </TextLikeButton>
        </FormInput>
        <Flex wrap="wrap" gap={1.5} minHeight={{ base: 6 }} mb={{ base: 4 }}>
          {mates.map((value) => (
            <Label
              key={value}
              label={value}
              showCloseButton
              // onClose={() => removeTeamMate(value)}
              bgColor="gray.400"
              pl={2}
              rounded="lg"
              fontSize="small"
              closeButtonSize="sm"
            />
          ))}
        </Flex>
      </Box>
      <Box color="black" textAlign="center" mb={{ base: 4 }}>
        <Text fontWeight={{ base: 'semibold' }}>$3</Text>
        <Text fontWeight={{ base: 'medium' }} m="0px" fontSize={{ base: 'sm' }}>
          Will be added to your monthly plan
        </Text>
      </Box>
      <Box width="fit-content" mx="auto">
        <PrimaryButton onClick={onClose}>Save changes</PrimaryButton>
      </Box>
    </BasicModal>
  );
};

export default AddTeammateModal;
