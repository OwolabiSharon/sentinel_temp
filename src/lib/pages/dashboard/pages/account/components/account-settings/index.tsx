import { Box, Grid, GridItem } from '@chakra-ui/react';

import { SectionTitle2 } from '~/lib/components/title';

import AccountInformationForm from './AccountInformationForm';
import ChangePasswordForm from './ChangePasswordForm';

const AccountSettings = () => {
  return (
    <Box mt={[6, 8]} maxWidth={{ base: 'container.lg' }}>
      <Grid
        bgColor="whiteAlpha.900"
        p={{ base: 4, md: 6 }}
        rounded="base"
        templateColumns={[null, '5fr 7fr']}
        rowGap={[4]}
        border="1px solid #F2F4F7"
      >
        <GridItem>
          <SectionTitle2>Account Information</SectionTitle2>
        </GridItem>
        <GridItem>
          <AccountInformationForm />
        </GridItem>
      </Grid>
      <Grid
        mt={[4]}
        bgColor="whiteAlpha.900"
        p={{ base: 4, md: 6 }}
        rounded="base"
        templateColumns={[null, '5fr 7fr']}
        rowGap={[4]}
        border="1px solid #F2F4F7"
      >
        <GridItem>
          <SectionTitle2>Change Password</SectionTitle2>
        </GridItem>
        <GridItem>
          <ChangePasswordForm />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default AccountSettings;
