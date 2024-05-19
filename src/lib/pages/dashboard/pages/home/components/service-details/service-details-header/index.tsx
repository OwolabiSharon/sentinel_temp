import {
  Icon,
  Box,
  Text,
  GridItem,
  Grid,
  useBoolean,
  Image,
} from '@chakra-ui/react';
import { BsCircleFill, BsArrowUpRight } from 'react-icons/bs';

import { RedFilledButton } from '~/lib/components/button';
import ChakraLink from '~/lib/components/ChakraLink';
import AlertModal from '~/lib/components/modals/AlertModal';
import { IconMapping } from '~/lib/utils';

type ServiceDetailsHeaderType = {
  name: string;
  link: string;
};

const ServiceDetailsHeader = ({ name, link }: ServiceDetailsHeaderType) => {
  const [modalState, { on: showModal, off: closeModal }] = useBoolean(false);
  console.log(name, link);
  return (
    <Grid
      templateColumns={{ base: '2fr 10fr', md: '1fr 11fr' }}
      gap={{ base: 3, md: 4 }}
    >
      <GridItem placeContent="center">
        <Box
          rounded="100%"
          borderWidth={1}
          width={{ base: 20 }}
          height={{ base: 20 }}
          p={{ base: 4 }}
        >
          <Image
            src={IconMapping[name?.toLowerCase()]}
            width={{ base: 20 }}
            transform="scale(1.2)"
          />
        </Box>
      </GridItem>
      <GridItem
        display="grid"
        gridTemplateColumns={{ base: '12fr', md: '8fr 4fr' }}
        gap={{ base: 4 }}
      >
        <GridItem>
          <Box>
            <Text>
              <Text
                as="span"
                fontSize={{ base: 'md', md: '1.5rem' }}
                fontWeight="bold"
              >
                {name}
              </Text>
              <Text
                as="span"
                bgColor="brand.success.light"
                p={2}
                mx={{ base: 4 }}
                rounded="lg"
                display={{ base: 'inline-flex' }}
                width="max-content"
                alignItems="center"
                fontSize="xs"
              >
                <Icon as={BsCircleFill} mr={2} color="brand.success.main" />
                <Text letterSpacing="tighter" as="span">
                  All sub-services are up
                </Text>
              </Text>
            </Text>
            <Box
              mt={{ base: 4 }}
              color="brand.primary.main"
              fontSize="sm"
              display="flex"
              alignItems="baseline"
              borderBottomColor="blue.900"
              borderBottomWidth={1.5}
              width="fit-content"
              _hover={{
                cursor: 'pointer',
              }}
              fontWeight="semibold"
            >
              <ChakraLink
                href={link}
                mr={{ base: 1 }}
                _hover={{
                  textDecoration: 'none',
                }}
              >
                Official status page
              </ChakraLink>
              <Icon as={BsArrowUpRight} />
            </Box>
          </Box>
        </GridItem>
        <GridItem placeContent={{ base: 'start', md: 'center' }} display="grid">
          <RedFilledButton onClick={showModal}>Remove service</RedFilledButton>
        </GridItem>
      </GridItem>
      <AlertModal
        isOpen={modalState}
        onClose={closeModal}
        text={
          <Text>
            Are you sure you want to remove{' '}
            <Text as="span" color="brand.black" fontWeight="semibold">
              {name}
            </Text>{' '}
            from your list of services?
          </Text>
        }
        title="Remove Service"
        ctaText="Remove"
      />
    </Grid>
  );
};

export default ServiceDetailsHeader;
