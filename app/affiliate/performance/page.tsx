'use client';

import AffiliatePerformance from '@/components/marketing/AffiliatePerformance';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function AffiliatePerformancePage() {
  return (
    <ProtectedRoute allowRoles={['attendee', 'organiser']}>
      <AffiliatePerformance />
    </ProtectedRoute>
  );
}
