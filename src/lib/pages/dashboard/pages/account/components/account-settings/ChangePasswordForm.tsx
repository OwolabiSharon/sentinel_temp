import { PrimaryButton } from '~/lib/components/button';
import FormInput from '~/lib/components/form/FormInput';
import supabase from '../../../../../../supabase';
import { useState } from 'react';

const ChangePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const userDataString = typeof window !== 'undefined' ? localStorage.getItem('fullAuthUserData') : null;
  const data = userDataString ? JSON.parse(userDataString) : null;
  

  const handleChangePassword = async () => {
    try {
      // Reauthenticate the user with their current password
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: data?.user_email,
        password: oldPassword,
      });

      if (authError) {
        throw new Error('Invalid old password');
      }

      // Change password using Supabase auth API
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        console.log(error);
        
        throw error;
      }

    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <form>
      <FormInput
        label="Old Password"
        inputProps={{
          type: 'password',
          name: 'password',
          placeholder: 'Old password',
          isRequired: true,
          onChange: (e) => setOldPassword(e.target.value),
        }}
      />
      <FormInput
        label="New Password"
        inputProps={{
          type: 'password',
          name: 'password',
          placeholder: 'New password',
          isRequired: true,
          onChange: (e) => setNewPassword(e.target.value),
        }}
      />
      <PrimaryButton mt={[4]} onClick={handleChangePassword}>
        Save changes
      </PrimaryButton>
    </form>
  );
};

export default ChangePasswordForm;
