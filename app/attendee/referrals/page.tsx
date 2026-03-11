'use client';

import { useEffect, useState } from 'react';
import ReferralDashboard from '@/components/marketing/ReferralDashboard';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ReferralsPage() {
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    // Get user ID from cookies
    const cookies = document.cookie.split(";");
    const userIdCookie = cookies.find((c) => c.trim().startsWith("user_id="));
    
    if (userIdCookie) {
      const id = userIdCookie.split("=")[1];
      setUserId(id);
    }
  }, []);

  if (!userId) {
    return <div>Loading...</div>;
  }

  return (
    <ProtectedRoute allowRoles={['attendee']}>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">My Referrals</h1>
        <ReferralDashboard userId={userId} />
      </div>
    </ProtectedRoute>
  );
}
