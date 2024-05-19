import { Box } from '@chakra-ui/react';

import { PrimaryButton } from '~/lib/components/button';
import FormInput from '~/lib/components/form/FormInput';

const ForgotPasswordForm = () => {
  return (
    <form style={{ width: '100%' }}>
      <FormInput
        label="Email*"
        inputProps={{
          placeholder: 'Email',
          type: 'email',
          isRequired: true,
          width: 'full',
          mb: 6,
        }}
      />
      <Box width="fit-content" mx="auto">
        <PrimaryButton>Reset password</PrimaryButton>
      </Box>
    </form>
  );
};

export default ForgotPasswordForm;
