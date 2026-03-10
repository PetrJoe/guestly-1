'use client';

import { useEffect, useState } from 'react';
import AffiliatePerformance from '@/components/marketing/AffiliatePerformance';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function AffiliatePerformancePage() {
  const [affiliateId, setAffiliateId] = useState<string | null>(null);

  useEffect(() => {
    // Get the current user's ID to use as affiliate ID
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user?.id) {
          setAffiliateId(data.user.id);
        }
      })
      .catch((err) => console.error('Failed to fetch user:', err));
  }, []);

  if (!affiliateId) {
    return (
      <ProtectedRoute allowRoles={['attendee', 'organiser']}>
        <div className="flex items-center justify-center py-8">
          <div className="w-6 h-6 animate-spin text-primary-500 text-xl">🔄</div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute allowRoles={['attendee', 'organiser']}>
      <AffiliatePerformance affiliateId={affiliateId} />
    </ProtectedRoute>
  );
}
