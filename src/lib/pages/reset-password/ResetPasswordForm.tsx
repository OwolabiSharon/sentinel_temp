import { Box } from '@chakra-ui/react';

import { PrimaryButton } from '~/lib/components/button';
import FormInput from '~/lib/components/form/FormInput';

const ResetPasswordForm = () => {
  return (
    <form style={{ width: '100%' }}>
      <FormInput
        label="New Password*"
        inputProps={{
          placeholder: 'Password',
          isRequired: true,
          type: 'password',
          mb: 4,
        }}
      />
      <FormInput
        label="Confirm New Password*"
        inputProps={{
          placeholder: 'Confirm Password',
          isRequired: true,
          type: 'password',
          mb: 6,
        }}
      />
      <Box width="fit-content" mx="auto">
        <PrimaryButton>Confirm</PrimaryButton>
      </Box>
    </form>
  );
};

export default ResetPasswordForm;
