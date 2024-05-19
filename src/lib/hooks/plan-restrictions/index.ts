export interface Plan {
  monitoring_provider_limit: number | null;
  notification_methods: string[];
  max_teammates: number;
}

export interface Plans {
  starter: Plan;
  pro: Plan;
}

const plans: Plans = {
  starter: {
    monitoring_provider_limit: 15,
    notification_methods: ['email'],
    max_teammates: 3,
  },
  pro: {
    monitoring_provider_limit: null,
    notification_methods: ['email', 'webhook'],
    max_teammates: 6,
  },
};

export default plans;
