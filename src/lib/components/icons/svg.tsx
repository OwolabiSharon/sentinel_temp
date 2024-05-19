import type { BoxProps, ColorProps } from '@chakra-ui/react';
import { useToken, Box } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import type { SVGIconType } from '~/lib/types';

type SVGProps = {
  svg: FunctionComponent<SVGIconType>;
  boxProps?: BoxProps;
  width?: number;
  color?: ColorProps['color'];
};
const SVG = ({ boxProps: props, width, color, svg: SVGElement }: SVGProps) => {
  const colorProp = color ? (color as string) : 'not_defined';
  const [colorValue] = useToken('colors', [colorProp], ['#062984']);
  return (
    <Box {...props}>
      <SVGElement width={width} color={colorValue} />
    </Box>
  );
};

export default SVG;
