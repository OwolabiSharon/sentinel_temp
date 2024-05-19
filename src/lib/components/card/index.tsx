import type {
  CardProps,
  CheckboxProps,
  IconProps,
  LayoutProps,
  TypographyProps,
} from '@chakra-ui/react';
import { Checkbox, HStack, Icon, Card, Text } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { useRef, useState } from 'react';
import type { IconType } from 'react-icons';

import Label from '../label';

type TextIconCardProps = {
  name: string;
  icon: IconType;
  iconProps?: IconProps;
  cardProps?: CardProps;
  label?: ReactNode;
};
export const TextIconCard = ({
  name,
  icon,
  iconProps,
  cardProps,
  label,
}: TextIconCardProps) => {
  const updatedIconProps: IconProps = {
    boxSize: 5,
    ...iconProps,
  };
  return (
    <Card {...cardProps} shadow="none" border="1px solid #F2F4F7">
      <Icon {...updatedIconProps} as={icon} />
      <Text
        textTransform="capitalize"
        fontSize={cardProps?.fontSize}
        fontWeight="medium"
      >
        {name} {label}
      </Text>
    </Card>
  );
};

type CheckCardProps = {
  id?: any;
  name: string;
  width?: LayoutProps['width'];
  icon?: IconType;
  value?: string | number;
  iconProps?: IconProps;
  fontSize?: TypographyProps['fontSize'];
  checkBoxProps?: CheckboxProps;
  showContentWhenChecked?: ReactNode;
  cardProps?: CardProps;
  onChange?: any
};
export const CheckCard = ({
  id,
  name,
  icon,
  width,
  value,
  iconProps,
  fontSize,
  checkBoxProps,
  showContentWhenChecked,
  cardProps,
  onChange, // Function to handle selection change
}: CheckCardProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isChecked, setIsChecked] = useState(false); // State to manage checked status

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked); // Update checked status
    if (onChange) {
      onChange(id, name, event.target.checked); // Call the parent handler with id, name, and checked status
    }
  };

  return (
    <Card
      width={width || { base: 28, md: 48 }}
      px={{ base: 4 }}
      py={{ base: 3 }}
      border="1px solid #F2F4F7"
      shadow="none"
      {...cardProps}
    >
      <Checkbox
        isChecked={isChecked}
        onChange={handleChange}
        ref={inputRef}
        flexDirection={{ base: 'row-reverse' }}
        bgColor="whiteAlpha.900"
        size="lg"
        value={value || name}
        justifyContent="space-between"
        colorScheme="brand.blue"
        {...checkBoxProps}
      >
        <HStack align="center">
          {icon && typeof icon === 'string' ? (
            <img src={icon} alt="Icon" style={{ width: '1.25rem', height: 'auto' }} />
          ) : (
            icon && <Icon boxSize="1.25rem" {...iconProps} as={icon} />
          )}
          <Text
            fontSize={fontSize || { base: 'small', md: 'sm' }}
            lineHeight="150%"
            fontWeight="medium"
          >
            {name}
          </Text>
        </HStack>
      </Checkbox>
      {isChecked && showContentWhenChecked}
    </Card>
  );
};

type ComingSoonNotificationCardProps = {
  name: string;
  icon: IconType;
  width?: LayoutProps['width'];
};

export const ComingSoonNotificationCard = ({
  name,
  icon,
  width,
}: ComingSoonNotificationCardProps) => {
  return (
    <TextIconCard
      name={name}
      icon={icon}
      label={
        <Label
          bgColor="brand.primary.700"
          color="brand.black"
          fontWeight="medium"
          textTransform="none"
          ml={3}
          label="Coming soon"
          lineHeight="150%"
        />
      }
      cardProps={{
        width: width || { base: 'full', md: 'sm' },
        direction: 'row',
        gap: 2,
        px: 7,
        py: 4,
        fontSize: ['sm', 14],
      }}
    />
  );
};
