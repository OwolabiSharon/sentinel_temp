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

import { RedFilledButton } from '~/lib/components/button';
import { SectionTitle2 } from '~/lib/components/title';
import supabase from '../../../../../../supabase';


type AlertModalProps = {
  isOpen: boolean;
  onClose: () => void;
  icon?: IconType;
  title: string;
  text: ReactNode;
  id: any;
  ctaText: string;
  email?: string
};
const AlertModal = ({
  isOpen,
  onClose,
  icon,
  title,
  text,
  id,
  ctaText,
  email
}: AlertModalProps) => {
  async function cancelSubscription() {
    // Construct the request URL
    const url = `https://api.lemonsqueezy.com/v1/subscriptions/${id}`;
  
    // Construct the request headers
    const headers = {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NGQ1OWNlZi1kYmI4LTRlYTUtYjE3OC1kMjU0MGZjZDY5MTkiLCJqdGkiOiIwMTA2ZDc0MmMyMzY5NzNiZGI5ZTBjZDY5MjhiNDYzMmFmNmM1Yzk4OTVmZDMzNDM3ZTU3YmFlOWQ1YTYyMWY2MmYxZTY4MDAxMjIyMDQ4NCIsImlhdCI6MTcxNDE0MDcyMS44OTc0MTcsIm5iZiI6MTcxNDE0MDcyMS44OTc0MTksImV4cCI6MjAyOTY3MzUyMS44NzUwMSwic3ViIjoiMjI4ODIxMiIsInNjb3BlcyI6W119.LkLDJBgPUeooQtmPsF1ODh28sCh39ZiStolnxmJ6-gUiOQfVLRagwl2PoxuD4RtLQwrSedkMw8TU8TE9-S5xaLnhUofiSn6WiUo-X9YK4VMJaBEah1lV6X9QdkKQnbSjCTUTlw3H8dZsQmkXglSLb3QPMI1skPhoNSEkjOFEAgf5OzVZmrRNonXexgN9WRFtJiHGadBxzbUCMs29zB44yVFdwNMfLMpt_qQNfYgf1E1iHjU9Q1ZVgoJRqlJYubz88RD9MYLi6Zv7W5uNi6cdrD1XwZFI_Fr9SKJz0xxg4V1-N0O1ItWz09Rdl5cNVlpK8T4uBkO0Rg2t23SD842u7VNnEopxiCR2aTyPenB9CJN63qT1hZJrfFRoTMXORh4wZ3FXqFTqycnzpRaXY4iYXWIiIxU4CAHy4W2vz-mZT57TBDstlYuCdNF1jp0vTpKQ8pOyXDI9daEtuy0AQWCycoX1qk9o9T8iNQRxpfvnLSfrBc3tztzi5rj1fm-xiwjJ`,
    };
  
    // Construct the request options
    const requestOptions = {
      method: 'DELETE',
      headers: headers,
    };
  
    try {
      // Send the request to cancel the subscription
      const response = await fetch(url, requestOptions);
  
      // Check if request was successful
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      console.log('Subscription cancelled successfully.');
    } catch (error) {
      console.error('Error cancelling subscription:', error);
    }
  }
  
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
            <RedFilledButton onClick={cancelSubscription}>{ctaText}</RedFilledButton>
          </Flex>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
};

export default AlertModal;
