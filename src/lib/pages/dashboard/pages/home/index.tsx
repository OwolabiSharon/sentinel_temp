import { Heading, Box, Text, HStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';

import supabase from '../../../../supabase';
import Wrapper from '../../Wrapper';
import { DarkButton } from '~/lib/components/button';
import FadeIn from '~/lib/components/motion/fade-in';

import ServiceDetails from './components/service-details';
import ServiceHistory from './components/service-history';
import ServiceList from './components/service-list';
import ServiceStatus from './components/service-status';

const DashboardHome = () => {
  const router = useRouter();
  const { name } = router.query;
  const [serviceToView, setServiceToView] = useState<{} | null>(null);
  const [firstName, setFirstName] = useState('');
  const [organizationName, setOrganizationName] = useState('');

  const getUserData = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log('Auth User data:', user);

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*, organization(*)')
        .eq('id', user?.id)
        .single();

      if (userError) {
        console.error('Error fetching user data:', userError);
      } else {
        localStorage.setItem(
          'fullAuthUserData',
          JSON.stringify({ ...userData, user_email: user?.email })
        );
        console.log('User data:', userData);
        setFirstName(userData.first_name);
        setOrganizationName(userData.organization.name);
        // Handle user data, e.g., store in state or context
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  useEffect(() => {
    localStorage.removeItem('multiStepFormStep');
    getUserData();
    const { name: queryName } = router.query;
    if (queryName) {
      setName(queryName.toString());
    }
  }, [router.query]);

  const handleUpgradeClick = () => {
    router.push('/dashboard/upgrade'); // Navigate to the /upgrade route
  };

  return (
    <Wrapper>
      <NextSeo title="Dashboard" />
      {serviceToView ? (
        <FadeIn>
          <ServiceDetails data={serviceToView} cb={setServiceToView} />
        </FadeIn>
      ) : (
        <FadeIn>
          <HStack justify="space-between">
            <Box>
              <Heading
                as="h1"
                size={{ base: 'md', md: 'lg' }}
                mb={{ base: 2.5 }}
              >
                {`${organizationName} Dashboard`}
              </Heading>
              <Text fontSize={{ base: 'sm', md: 'md' }}>
                {`Welcome back, ${firstName}`}
              </Text>
            </Box>
            {organizationName !== 'Pro' && (
              <Box>
                <DarkButton onClick={handleUpgradeClick}>
                  Upgrade to Pro
                </DarkButton>
              </Box>
            )}
          </HStack>
          <ServiceStatus cb={setServiceToView} />
          <ServiceList cb={setServiceToView} />
          <ServiceHistory />
        </FadeIn>
      )}
    </Wrapper>
  );
};

export default DashboardHome;

function setName(arg0: string) {
  throw new Error('Function not implemented.');
}
