import { BsMapFill } from 'react-icons/bs';

const useServicesDown = () => {
  const services = [
    {
      name: 'AWS',
      icon: BsMapFill,
      lastOutage: '10 Jun, 2022',
      up: true,
      subService: 'USSD',
    },
    {
      name: 'MailJet',
      icon: BsMapFill,
      lastOutage: '15 Jun, 2022',
      // up: false glory commented out,
      up: true,
      subService: 'POS',
    },
    {
      name: 'Paystack',
      icon: BsMapFill,
      lastOutage: '15 July, 2022',
      up: true,
      subService: 'Mining',
    },
  ];
  const servicesDown = services.filter((value) => !value.up);
  // services = [...services, ...services, ...services];
  return { services, servicesDown };
};

export default useServicesDown;
