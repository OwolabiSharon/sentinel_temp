// ServiceSearchField.tsx

import {
  InputGroup,
  InputLeftElement,
  Icon,
  Text,
  Box,
  useBoolean,
} from '@chakra-ui/react';
import type React from 'react';
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';

import { TextLikeButton } from '../button';
import SuggestServiceModal from '../modals/SuggestServiceModal';

import FormInput from './FormInput';

interface ServiceSearchFieldProps {
  onSearch: (query: string) => void;
}

const ServiceSearchField: React.FC<ServiceSearchFieldProps> = ({
  onSearch,
}) => {
  const [modalState, { on: showModal, off: closeModal }] = useBoolean(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value); // Pass the search query to the parent component
  };

  return (
    <Box width="full" fontSize="smaller">
      <InputGroup variant="outline">
        <InputLeftElement color="brand.darkGray.600">
          <Icon as={BsSearch} boxSize={{ base: 5, md: 6 }} />
        </InputLeftElement>
        <FormInput
          inputProps={{
            py: { base: 4 },
            px: { base: 10 },
            placeholder: 'Search',
            value: searchQuery,
            onChange: handleChange,
          }}
        />
      </InputGroup>
      <Text fontWeight="medium" lineHeight="150%">
        Can&apos;t find a service you use?{' '}
        <TextLikeButton as="span" fontWeight="bold" onClick={showModal}>
          Let us know
        </TextLikeButton>
      </Text>
      <SuggestServiceModal isOpen={modalState} onClose={closeModal} />
    </Box>
  );
};

export default ServiceSearchField;
