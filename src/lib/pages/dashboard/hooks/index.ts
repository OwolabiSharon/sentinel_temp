/* eslint-disable sonarjs/no-duplicate-string */
import { useCallback, useMemo } from 'react';
import type { IconType } from 'react-icons';
import { BsMapFill } from 'react-icons/bs';

export type TService = {
  name: string;
  icon: IconType;
  lastOutage: string;
  up: boolean;
  subServices: {
    name: string;
    level: string;
    up: boolean;
    lastOutage: string;
    outages: {
      message: string;
      time: string;
    }[];
  }[];
};

const useServices = () => {
  let services = useMemo(
    (): TService[] => [
      {
        name: 'AWS',
        icon: BsMapFill,
        lastOutage: '10 Jun, 2022',
        up: true,
        subServices: [
          {
            name: 'USSD',
            level: 'minor',
            lastOutage: '10 Jun, 2022',
            up: true,
            outages: [
              { message: 'Outage has been resolved', time: '2 hours ago' },
              {
                message: 'Delay in USSD transaction processing',
                time: '4 hours ago',
              },
            ],
          },
          {
            name: 'Transfers',
            level: 'major',
            up: true,
            lastOutage: '10 Jun, 2022',
            outages: [
              { message: 'Outage has been resolved', time: '2 hours ago' },
              {
                message: 'Delay in transfers',
                time: '7 days ago at 14:45',
              },
              {
                message: 'Downtime in transfers',
                time: '7 days ago at 16:45',
              },
            ],
          },
          {
            name: 'POS',
            level: 'minor',
            up: true,
            lastOutage: '10 Jun, 2022',
            outages: [
              { message: 'Outage has been fixed', time: 'an hour ago' },
              {
                message: 'Delay in USSD transactions processing',
                time: '4 hours ago',
              },
            ],
          },
        ],
      },
      {
        name: 'MailJet',
        icon: BsMapFill,
        lastOutage: '15 Jun, 2022',
        up: true,
        subServices: [
          {
            name: 'USSD',
            level: 'minor',
            up: true,
            lastOutage: '10 Jun, 2022',
            outages: [
              { message: 'Outage has been resolved', time: '2 hours ago' },
              {
                message: 'Delay in USSD transaction processing',
                time: '4 hours ago',
              },
            ],
          },
          {
            name: 'Transfers',
            level: 'major',
            up: true,
            lastOutage: '10 Jun, 2022',
            outages: [
              { message: 'Outage has been resolved', time: '2 hours ago' },
              {
                message: 'Delay in transfers',
                time: '7 days ago at 14:45',
              },
              {
                message: 'Downtime in transfers',
                time: '7 days ago at 16:45',
              },
            ],
          },
          {
            name: 'POS',
            level: 'minor',
            up: true,
            lastOutage: '10 Jun, 2022',
            outages: [
              { message: 'Outage has been fixed', time: 'an hour ago' },
              {
                message: 'Delay in USSD transactions processing',
                time: '4 hours ago',
              },
            ],
          },
        ],
      },
      {
        name: 'Paystack',
        icon: BsMapFill,
        lastOutage: '15 July, 2022',
        up: false,
        subServices: [
          {
            name: 'USSD',
            level: 'minor',
            up: true,
            lastOutage: '10 Jun, 2022',
            outages: [
              { message: 'Outage has been resolved', time: '2 hours ago' },
              {
                message: 'Delay in USSD transaction processing',
                time: '4 hours ago',
              },
            ],
          },
          {
            name: 'Transfers',
            level: 'major',
            up: true,
            lastOutage: '10 Jun, 2022',
            outages: [
              { message: 'Outage has been resolved', time: '2 hours ago' },
              {
                message: 'Delay in transfers',
                time: '7 days ago at 14:45',
              },
              {
                message: 'Downtime in transfers',
                time: '7 days ago at 16:45',
              },
            ],
          },
          {
            name: 'POS',
            level: 'minor',
            up: true,
            lastOutage: '10 Jun, 2022',
            outages: [
              { message: 'Outage has been fixed', time: 'an hour ago' },
              {
                message: 'Delay in USSD transactions processing',
                time: '4 hours ago',
              },
            ],
          },
        ],
      },
    ],
    []
  );
  services = [...services, ...services, ...services];
  const getService = useCallback(
    (name: string) => services.find((value) => value.name === name),
    [services]
  );
  return { services, getService };
};

export default useServices;
