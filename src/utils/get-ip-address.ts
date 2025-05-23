'use server';

import { headers } from 'next/headers';

const FALLBACK_IP_ADDRESS = '0.0.0.0';

export const getIpAddress = async () => {
  const forwardedFor = headers().get('x-forwarded-for');

  if (forwardedFor) {
    return forwardedFor.split(',')[0] ?? FALLBACK_IP_ADDRESS;
  }

  return headers().get('x-real-ip') ?? FALLBACK_IP_ADDRESS;
};
