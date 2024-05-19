import { useMediaQuery, useToken } from '@chakra-ui/react';

const useDeviceType = () => {
  const [sm, md] = useToken('breakpoints', ['sm', '2md']);
  const [isMobile, isTablet, isPc] = useMediaQuery([
    `(max-width: ${sm})`,
    `(min-width: ${sm}) and (max-width: ${md})`,
    `(max-width: ${md})`,
  ]);

  return { isMobile, isTablet, isPc: !isPc };
};

export default useDeviceType;
