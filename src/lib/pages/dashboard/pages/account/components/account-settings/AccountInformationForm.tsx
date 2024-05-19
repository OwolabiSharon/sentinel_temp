import { HStack, VStack } from '@chakra-ui/react';
import type { ChangeEvent } from 'react';
import { useReducer } from 'react';
import supabase from '../../../../../../supabase';

import { PrimaryButton } from '~/lib/components/button';
import FormInput from '~/lib/components/form/FormInput';


const userDataString = typeof window !== 'undefined' ? localStorage.getItem('fullAuthUserData') : null;
const data = userDataString ? JSON.parse(userDataString) : null;


const userInfo = {
  first_name: data?.first_name,
  last_name: data?.last_name,
  email: data?.organization.email,
  company: data?.organization.name,
  phone_number: data?.phone_number,
};

const infoReducer = (
  info: typeof userInfo,
  event: ChangeEvent<HTMLInputElement>
): typeof userInfo => {
  const input = event.target;
  if (!input.reportValidity) {
    return info;
  }
  return {
    ...info,
    [input.name]: input.value,
  };
};

const AccountInformationForm = () => {
  const [form, updateForm] = useReducer(infoReducer, userInfo);

  const handleUpdate = async () => {
    try {
      const { data: response, error } = await supabase
      .from('users')
        .update({
          first_name: form.first_name,
          last_name: form.last_name,
          phone_number: form.phone_number
      })
      .eq('id', data?.id);

    if (error) {
      console.error('Error updating user:', error.message);
      return null;
    }
    return response
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return (
    <form>
      <VStack>
        <HStack width="full" align="start">
          <FormInput
            label="First Name"
            inputProps={{
              type: 'text',
              name: 'first_name',
              value: form.first_name || '',
              isRequired: true,
              onChange: updateForm,
            }}
          />
          <FormInput
            label="Last Name"
            inputProps={{
              type: 'text',
              name: 'last_name',
              value: form.last_name,
              isRequired: true,
              onChange: updateForm,
            }}
          />
        </HStack>
        <FormInput
          label="Email"
          inputProps={{
            type: 'email',
            name: 'email',
            value: form.email,
            isRequired: true,
            onChange: updateForm,
            isDisabled: true
          }}
        />
        <FormInput
          label="Company"
          inputProps={{
            type: 'text',
            name: 'company',
            value: form.company,
            isRequired: true,
            onChange: updateForm,
            isDisabled: true
          }}
        />
        <FormInput
          label="Phone Number"
          inputProps={{
            type: 'tel',
            name: 'phone_number',
            value: form.phone_number,
            isRequired: true,
            onChange: updateForm,
          }}
        />
      </VStack>
      <PrimaryButton mt={[4]} onClick={handleUpdate}>
        Save changes
      </PrimaryButton>
    </form>
  );
};

export default AccountInformationForm;
