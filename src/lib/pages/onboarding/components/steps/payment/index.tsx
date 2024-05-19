import { Heading, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';

import FadeIn from '../../../../../components/motion/fade-in';
import SuccessIcon from '~/lib/components/success-icon';

type PaymentProps = {
  initialValue?: boolean;
  cb: () => void;
};

const Payment = ({ cb, initialValue }: PaymentProps) => {
  const [payState, setPayState] = useState(initialValue || true);
  const [successfulPayment, setSuccessfulPayment] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    // Redirect user to Lemon Squeezy checkout
    window.location.href = 'http://localhost:3000/login'; // url to next page after onboarding
    // Set payState to true to indicate payment processing
    setPayState(true);
  };

  const handleCallback = useCallback(() => {
    // Handle callback from Lemon Squeezy here
    const { paymentStatus } = router.query; // Assuming Lemon Squeezy sends payment status as a query parameter
    if (paymentStatus === 'success') {
      setSuccessfulPayment(true);
      cb(); // Proceed to the next step in the onboarding process
    } else {
      // Handle payment failure or other status
      console.error('Payment failed or status unknown');
    }
  }, [cb, router.query]); // Include dependencies of handleCallback in the useCallback dependency array

  useEffect(() => {
    // Listen for callback from Lemon Squeezy when component mounts
    handleCallback();
    handleClick();
  }, [handleCallback]); // Include handleCallback in the dependency array

  return (
    <FadeIn
      props={{
        width: 'full',
        px: { base: 4 },
      }}
    >
      <VStack>
        <Heading size="md" m={8} textAlign="center">
          {payState
            ? 'Processing transaction...'
            : "You haven't made payments yet"}
        </Heading>
        <SuccessIcon />
      </VStack>
    </FadeIn>
  );
};

export default Payment;
