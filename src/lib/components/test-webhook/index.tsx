import React, { useState } from 'react';

import supabase from '../../supabase';
import { DarkButton } from '../button';
import FormInput from '../form/FormInput';
import FadeIn from '../motion/fade-in';

const TestWebHook = () => {
  const userDataString =
    typeof window !== 'undefined'
      ? localStorage.getItem('fullAuthUserData')
      : null;
  const data = userDataString ? JSON.parse(userDataString) : null;

  // State for storing the input value
  const [destinationURL, setDestinationURL] = useState('');

  // Function to handle button click
  const handleButtonClick = async () => {
    try {
      const { data: orgData, error } = await supabase
        .from('organization')
        .update({
          webhook_url: destinationURL,
        })
        .eq('id', data?.organization.id);

      if (error) {
        console.error('Error updating user:', error.message);
        return null;
      }
      const samplePayload = {
        event: 'test',
      };

      const response = await fetch(destinationURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(samplePayload),
      });

      if (!response.ok) {
        console.error('Error sending webhook request:', response.statusText);
        return null;
      }

      console.log('Webhook request sent successfully');
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return (
    <FadeIn props={{ p: [2], my: [4] }}>
      <form>
        <FormInput
          label="Destination URL"
          labelProps={{
            fontSize: ['14'],
          }}
          inputProps={{
            placeholder: 'https://sample.com',
            // size: ['sm', 'md'],
            width: ['75%'],
            px: [1],
            rounded: 'md',
            fontSize: ['14'],
            value: destinationURL,
            onChange: (e) => setDestinationURL(e.target.value),
          }}
          required
        />
        <DarkButton width={{ base: 24 }} onClick={handleButtonClick}>
          Test
        </DarkButton>
      </form>
    </FadeIn>
  );
};

export default TestWebHook;
