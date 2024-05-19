import { Box, Text, useBoolean } from '@chakra-ui/react';

import { RedFilledButton } from '~/lib/components/button';
import AlertModal from './AlertModal';
import { SectionTitle2 } from '~/lib/components/title';

const PlanCard = () => {
  const [modalState, { on: openModal, off: closeModal }] = useBoolean(false);
  const userDataString = typeof window !== 'undefined' ? localStorage.getItem('fullAuthUserData') : null;
  const data = userDataString ? JSON.parse(userDataString) : null;
  
  return (
    <Box
      width={['full', 'md']}
      bgColor="whiteAlpha.900"
      px={[6]}
      py={[4]}
      rounded="base"
    >
      <SectionTitle2>{data?.organization.plan}</SectionTitle2>
      <Box lineHeight="150%" my={[6]}>
        <Text fontSize={['sm']} color="brand.darkGray.900" fontWeight="medium">
          $9 per month (3 users)
        </Text>
        <Text fontSize={['small']} color="brand.black">
          {data?.organization.plan_status}
        </Text>
      </Box>
      <RedFilledButton fontSize="sm" onClick={openModal}>
        Cancel plan
      </RedFilledButton>
      <AlertModal
        isOpen={modalState}
        onClose={closeModal}
        text={
          <Text>
            Your account will be downgraded to a free plan. Are you sure you
            want to cancel your plan?
          </Text>
        }
        title="Cancel Plan"
        id= {data?.organization.subscription_id}
        ctaText="Cancel plan"
      />
    </Box>
  );
};

export default PlanCard;
