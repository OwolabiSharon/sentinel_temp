import { Box, HStack, Text, useBoolean, Image, VStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

import { PrimaryButton } from '~/lib/components/button';
import AddTeammateModal from '~/lib/components/modals/AddTeammateModal';
import AlertModal from '~/lib/components/modals/AlertModal';
import { SectionTitle2 } from '~/lib/components/title';
import supabase from '../../../../../../supabase';

const mates = [
  {
    email: 'nator@newco.com',
    joined: '16 Jan, 2023',
  },
  {
    email: 'mighty@newco.com',
    joined: '16 Jan, 2023',
  },
];


const Team = () => {
  const userDataString = typeof window !== 'undefined' ? localStorage.getItem('fullAuthUserData') : null;
  const data = userDataString ? JSON.parse(userDataString) : null;

  const [users, setUsers] = useState<any[] | undefined>([]);
  const getData = async (data: any) => {
    try {
      const { data: orgUsers, error: orgError } = await supabase
            .from('organization')
            .select('id, users(*)')
            .eq('id', data?.organization.id)
            .single()
    console.log(orgUsers);
    setUsers(orgUsers?.users)
    } catch (error) {
      console.log(error);
      
    }
  };

  useEffect(() => {
    getData(data)
  }, []);
  

  const [
    removeMateModalState,
    { on: openRemoveMateModal, off: closeRemoveMateModal },
  ] = useBoolean(false);
  const [addMateModalState, { on: openAddMateModal, off: closeAddMateModal }] =
    useBoolean(false);
  const [mateEmail, setMateEmail] = useState('');
  const openConfirmationModal = (email: string) => {
    setMateEmail(email);
    openRemoveMateModal();
  };
  return (
    <Box
      width="full"
      maxWidth="md"
      bgColor="whiteAlpha.900"
      mt={[8]}
      px={[6]}
      py={[4]}
    >
      <HStack justify="space-between">
        <SectionTitle2>Team Members</SectionTitle2>
        <PrimaryButton onClick={openAddMateModal}>Add teammate</PrimaryButton>
      </HStack>
      {users?.map((value) => (
        <VStack py={[3]} key={value?.id} align="start">
          <HStack justify="space-between" width="full">
            <Box>
              <Text fontSize={['sm']} pb={[1]} fontWeight={['medium']}>
                {value?.first_name} {value?.last_name} 
              </Text>
            </Box>
            <Box
              _hover={{
                cursor: 'pointer',
                shadow: 'sm',
                rounded: 'base',
                transform: 'scale(1.2)',
                transition: 'all 100ms ease-in',
              }}
              onClick={() => openConfirmationModal(value?.first_name)}
            >
              <Image width="4" src="/assets/svg/delete.svg" />
            </Box>
          </HStack>
          <Text fontSize={['xs']}>Role:  {value.role}</Text>
        </VStack>
      ))}
      <AlertModal
        isOpen={removeMateModalState}
        onClose={closeRemoveMateModal}
        text={
          <Text>
            Are you sure you want to remove{' '}
            <Text as="span" color="black">
              {mateEmail}
            </Text>{' '}
            from your team&apos;s account?
          </Text>
        }
        title="Remove Teammate"
        ctaText="Remove"
        email = {mateEmail}
      />
      <AddTeammateModal
        isOpen={addMateModalState}
        onClose={closeAddMateModal}
        user_id = {data?.id}
        organization_id = {data?.organization.id}
      />
    </Box>
  );
};

export default Team;
