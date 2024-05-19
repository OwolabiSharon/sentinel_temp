import type { TabProps } from '@chakra-ui/react';
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

import Wrapper from '../../Wrapper';
import { SectionTitle } from '~/lib/components/title';

import AccountSettings from './components/account-settings';
import Billing from './components/billing';
import Team from './components/team';

const tabProps: TabProps = {
  fontWeight: 'semibold',
  color: 'GrayText',
  px: [0],
  pb: [1],
  mx: [4],
  _selected: {
    borderBottomWidth: 2,
    borderBottomColor: 'brand.primary.900',
    color: 'unset',
  },
};
const Account = () => {
  return (
    <Wrapper>
      <NextSeo title="Account" />
      <SectionTitle as="h2" mb={{ base: 8 }}>
        Account &amp; Team
      </SectionTitle>
      <Box>
        <Tabs isLazy>
          <TabList>
            <Tab {...tabProps}>Account settings</Tab>
            <Tab {...tabProps}>Billing</Tab>
            <Tab {...tabProps}>Team</Tab>
          </TabList>
          <TabPanels>
            <TabPanel p={0}>
              <AccountSettings />
            </TabPanel>
            <TabPanel p={0}>
              <Billing />
            </TabPanel>
            <TabPanel p={0}>
              <Team />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Wrapper>
  );
};

export default Account;
