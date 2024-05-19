import {
  Card,
  CardBody,
  Heading,
  Text,
  VStack,
  HStack,
} from '@chakra-ui/react';

type ServiceOutageCardProps = {
  headingText: string;
  numOfOutage: number;
};
const ServiceOutageCard = ({
  headingText,
  numOfOutage,
}: ServiceOutageCardProps) => {
  return (
    <Card width={337} height={115} alignContent="start">
      <CardBody bgColor="whiteAlpha.300" rounded="base">
        <VStack alignItems="flex-start">
          <Heading fontSize="10px" color="#AFB2B6">
            {headingText}
          </Heading>
          <HStack>
            <Heading as="span" fontWeight="bold" color="brand.primary.900">
              {numOfOutage}
            </Heading>
            <Text fontSize="small" fontWeight="bold" color="brand.primary.900">
              Outages
            </Text>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default ServiceOutageCard;
