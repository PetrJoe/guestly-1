'use client';

import { use } from 'react';
import VirtualLobbyClient from '@/components/virtual/VirtualLobbyClient';

export default function EventLobbyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return <VirtualLobbyClient eventId={id} />;
}
