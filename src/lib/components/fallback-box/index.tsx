import type { FlexProps, SpinnerProps } from '@chakra-ui/react';
import { Flex, Spinner } from '@chakra-ui/react';

import Logo from '../Logo';

type FallBackBoxProps = {
  boxProps?: FlexProps;
  loaderProps?: SpinnerProps;
  showLogo?: boolean;
};
const FallBackBox = ({ boxProps, loaderProps, showLogo }: FallBackBoxProps) => {
  const flexProps: FlexProps = {
    align: 'center',
    justify: 'center',
    width: 'full',
    direction: 'column',
    ...boxProps,
  };
  const spinnerProps: SpinnerProps = {
    textColor: 'brand.primary.900',
    emptyColor: 'blue.900',
    speed: '0.6s',
    thickness: '4px',
    size: 'xl',
    ...loaderProps,
  };
  return (
    <Flex {...flexProps}>
      {showLogo && <Logo width={120} boxProps={{ m: { base: 4 } }} />}
      <Spinner {...spinnerProps} />
    </Flex>
  );
};

export default FallBackBox;
