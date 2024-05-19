import type { IconProps } from '@chakra-ui/react';
import type { IconType } from 'react-icons';
import { BsSlack, BsTelegram, BsWhatsapp } from 'react-icons/bs';

const useServices = () => {
  let services: { name: string; icon: IconType; iconProps?: IconProps }[] = [
    {
      name: 'WhatsApp',
      icon: BsWhatsapp,
      iconProps: {
        color: 'whatsapp.600',
      },
    },
    {
      name: 'Telegram',
      icon: BsTelegram,
      iconProps: {
        color: 'telegram.800',
      },
    },
    {  
      name: 'Slack',
      icon: BsSlack,
    },
    
  ];

  services = [...services, ...services, ...services, ...services];
  return [services];
};

export default useServices;
