import type { TextareaProps } from '@chakra-ui/react';
import { Textarea } from '@chakra-ui/react';

const MTextArea = (props: TextareaProps) => {
  return (
    <Textarea
      mx={0}
      rounded="md"
      borderColor="brand.darkGray.700"
      errorBorderColor="brand.error.main"
      borderWidth="1px"
      fontSize={['sm', 'md']}
      px={{ base: 2 }}
      _placeholder={{
        color: 'brand.darkGray.600',
      }}
      _focus={{
        outlineColor: 'brand.primary.700',
        outlineWidth: '3px',
        border: 'initial',
      }}
      {...props}
    />
  );
};

export default MTextArea;
