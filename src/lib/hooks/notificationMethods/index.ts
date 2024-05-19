import type { IconProps } from '@chakra-ui/react';
import type { IconType } from 'react-icons';
import {
  BsMailbox2,
  BsHouseLockFill,
  BsWhatsapp,
  BsSlack,
} from 'react-icons/bs';

const useNotificationMethods = () => {
  const notificationMethods: {
    name: string;
    icon: IconType;
    iconProps?: IconProps;
    type?: string
  }[] = [
    {
      name: 'Webhook',
      icon: BsHouseLockFill,
      iconProps: {
        color: 'telegram.800',
      },
    },
    {
      name: 'Email',
      icon: BsMailbox2,
      },
      {
        name: 'slack',
        icon: BsSlack,
        type: 'coming soon',
      },
      {
        name: 'WhatsApp',
        icon: BsWhatsapp,
        iconProps: {
          color: 'whatsapp.600',
        },
        type: 'coming soon'
      },
  ];

  return [notificationMethods];
};

export default useNotificationMethods;
