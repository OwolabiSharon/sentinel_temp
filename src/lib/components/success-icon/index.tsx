import { Box } from '@chakra-ui/react';
import type { BoxProps } from '@chakra-ui/react';

const SuccessIcon = (props: BoxProps) => {
  return (
    <Box {...props}>
      <svg
        width="150"
        height="150"
        viewBox="0 0 150 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="75" cy="75" r="75" fill="#23AC00" fillOpacity="0.49" />
        <circle
          cx="75.0113"
          cy="75.0118"
          r="57.2916"
          fill="#23AC00"
          fillOpacity="0.52"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M37.5 74.7396C37.5 54.1727 54.1727 37.5 74.7396 37.5C95.3065 37.5 111.979 54.1727 111.979 74.7396C111.979 95.3065 95.3065 111.979 74.7396 111.979C54.1727 111.979 37.5 95.3065 37.5 74.7396Z"
          fill="#23AC00"
          fillOpacity="0.79"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M92.7489 61.3434C94.071 62.6655 94.071 64.809 92.7489 66.1311L71.7353 88.1362C70.4132 89.4583 68.2697 89.4583 66.9476 88.1362L56.7914 77.98C55.4693 76.6579 55.4693 74.5144 56.7914 73.1923C58.1135 71.8702 60.257 71.8702 61.5791 73.1923L69.3414 80.9547L87.9612 61.3434C89.2833 60.0213 91.4268 60.0213 92.7489 61.3434Z"
          fill="white"
        />
      </svg>
    </Box>
  );
};

export default SuccessIcon;
