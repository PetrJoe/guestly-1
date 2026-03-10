'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function AffiliatePayoutsPage() {
  const [payouts, setPayouts] = useState<any[]>([]);
  const [pendingEarnings, setPendingEarnings] = useState(0);

  useEffect(() => {
    // Fetch payout data
    fetch('/api/affiliates/dashboard')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPendingEarnings(data.affiliate?.pendingEarnings || 0);
        }
      });
  }, []);

  const requestPayout = async () => {
    const res = await fetch('/api/affiliates/payout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: pendingEarnings }),
    });

    if (res.ok) {
      alert('Payout request submitted successfully');
      window.location.reload();
    }
  };

  return (
    <ProtectedRoute allowRoles={['attendee', 'organiser']}>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Payouts</h1>
        
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Pending Earnings</h2>
          <p className="text-4xl font-bold text-green-600 mb-4">
            ₦{pendingEarnings.toLocaleString()}
          </p>
          <Button
            onClick={requestPayout}
            disabled={pendingEarnings < 5000}
          >
            Request Payout
          </Button>
          {pendingEarnings < 5000 && (
            <p className="text-sm text-gray-600 mt-2">
              Minimum payout amount is ₦5,000
            </p>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Payout History</h2>
          {payouts.length === 0 ? (
            <p className="text-gray-600">No payout history yet</p>
          ) : (
            <div className="space-y-3">
              {payouts.map(payout => (
                <div key={payout.id} className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <p className="font-semibold">₦{payout.amount.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(payout.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded text-sm ${
                    payout.status === 'completed' ? 'bg-green-100 text-green-800' :
                    payout.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {payout.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </ProtectedRoute>
  );
}
