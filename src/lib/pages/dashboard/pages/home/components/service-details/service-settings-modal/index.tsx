/* eslint-disable react/no-array-index-key */
import { Box, useBoolean } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import supabase from '../../../../../../../supabase';
// import { PrimaryButton } from '~/lib/components/button';
// import { CheckCard } from '~/lib/components/card';
// import { SectionTitle2 } from '~/lib/components/title';
// import type { TService } from '~/lib/pages/dashboard/hooks';

type ServiceSettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  serviceId: string;
  serviceName: string;
};

const ServiceSettingsModal = ({
  isOpen,
  serviceId,
}: ServiceSettingsModalProps) => {
  const [form, setForm] = useState<(string | number)[]>([]);
  const [checkDisabled, { on }] = useBoolean(form.length === 0);
  const [subServiceData, setSubServiceData] = useState<any[]>();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('providers')
        .select('services(id, name ,components(id, name))')
        .eq('id', serviceId);
      if (error) {
        console.error('Error fetching user subscriptions:', error.message);
        return;
      }
      setSubServiceData(data[0].services);
    };

    fetchData();
  }, [isOpen]);

  return (
    <Box mt={{ base: 8 }}>
      {/* <SectionTitle2 mb={{ base: 4 }} width="fit-content" mx="auto">
        Preferences for {serviceName} Sub-Services
      </SectionTitle2>
      <Grid>
        <GridItem>
          <CheckCard
            width={{ base: 'full' }}
            name="Show and get notification on all sub-services"
            fontSize={{ base: 'sm' }}
            checkBoxProps={{
              isChecked: checkDisabled,
              onChange: wrapOn,
            }}
            cardProps={{ shadow: 'unset', py: 2, border: 'none' }}
          />
        </GridItem>
        <GridItem>
          <CheckCard
            width={{ base: 'full' }}
            name="Show and get notification on only selected sub-services"
            fontSize={{ base: 'sm' }}
            checkBoxProps={{ isChecked: !checkDisabled, onChange: off }}
            cardProps={{ shadow: 'unset', py: 2, border: 'none' }}
          />
        </GridItem>
      </Grid>
      <Box width="fit-content" mx="auto" my={8}>
        <PrimaryButton isDisabled>Save changes</PrimaryButton>
      </Box> */}
    </Box>
  );
};

export default ServiceSettingsModal;
