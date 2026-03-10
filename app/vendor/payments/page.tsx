"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

type VendorPayment = {
  id: string;
  vendorUserId: string;
  vendorId: string;
  eventId: string;
  eventName: string;
  organizerUserId: string;
  amount: number;
  status: "pending" | "processing" | "paid" | "cancelled";
  paymentMethod?: "bank_transfer" | "mobile_money" | "crypto";
  requestedAt: number;
  processedAt?: number;
  paidAt?: number;
  notes?: string;
  transactionReference?: string;
};

type PaymentStats = {
  totalEarnings: number;
  pendingAmount: number;
  paidAmount: number;
  totalPayments: number;
  pendingPayments: number;
  paidPayments: number;
};

type EventOption = {
  id: string;
  title: string;
};

export default function VendorPaymentsPage() {
  const [payments, setPayments] = useState<VendorPayment[]>([]);
  const [stats, setStats] = useState<PaymentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [events, setEvents] = useState<EventOption[]>([]);
  
  // Form state
  const [selectedEventId, setSelectedEventId] = useState("");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPayments();
    fetchVendorEvents();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await fetch("/api/vendor/payments");
      const data = await res.json();
      
      if (data.success) {
        setPayments(data.data.payments);
        setStats(data.data.stats);
      }
    } catch (error) {
      console.error("Failed to fetch payments:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVendorEvents = async () => {
    try {
      // Get vendor invitations to find accepted events
      const res = await fetch("/api/vendors/invitations");
      const data = await res.json();
      
      if (data.success) {
        const acceptedInvitations = data.data.filter(
          (inv: any) => inv.status === "accepted"
        );
        
        // Fetch event details for each accepted invitation
        const eventPromises = acceptedInvitations.map(async (inv: any) => {
          const eventRes = await fetch(`/api/events/${inv.eventId}`);
          const eventData = await eventRes.json();
          return eventData.success ? { id: inv.eventId, title: eventData.data.title } : null;
        });
        
        const eventResults = await Promise.all(eventPromises);
        setEvents(eventResults.filter((e): e is EventOption => e !== null));
      }
    } catch (error) {
      console.error("Failed to fetch vendor events:", error);
    }
  };

  const handleRequestPayment = async () => {
    if (!selectedEventId || !amount || parseFloat(amount) <= 0) {
      alert("Please select an event and enter a valid amount");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/vendor/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: selectedEventId,
          amount: parseFloat(amount),
          notes,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setShowRequestModal(false);
        setSelectedEventId("");
        setAmount("");
        setNotes("");
        fetchPayments();
      } else {
        alert(data.error?.message || "Failed to create payment request");
      }
    } catch (error) {
      console.error("Failed to create payment request:", error);
      alert("Failed to create payment request");
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status: VendorPayment["status"]) => {
    const styles = {
      pending: "bg-warning-100 text-warning-700 dark:bg-warning-900/20 dark:text-warning-400",
      processing: "bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400",
      paid: "bg-success-100 text-success-700 dark:bg-success-900/20 dark:text-success-400",
      cancelled: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400",
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Payment Management</h1>
          <p className="text-foreground-muted mt-1">
            Track your earnings and payment requests
          </p>
        </div>
        <Button onClick={() => setShowRequestModal(true)}>
          Request Payment
        </Button>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6">
            <div className="text-sm text-foreground-muted mb-1">Total Earnings</div>
            <div className="text-3xl font-bold text-foreground">
              {formatCurrency(stats.totalEarnings)}
            </div>
            <div className="text-xs text-foreground-subtle mt-2">
              {stats.totalPayments} payment{stats.totalPayments !== 1 ? "s" : ""}
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-sm text-foreground-muted mb-1">Paid Amount</div>
            <div className="text-3xl font-bold text-success-600 dark:text-success-400">
              {formatCurrency(stats.paidAmount)}
            </div>
            <div className="text-xs text-foreground-subtle mt-2">
              {stats.paidPayments} completed
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-sm text-foreground-muted mb-1">Pending Amount</div>
            <div className="text-3xl font-bold text-warning-600 dark:text-warning-400">
              {formatCurrency(stats.pendingAmount)}
            </div>
            <div className="text-xs text-foreground-subtle mt-2">
              {stats.pendingPayments} pending
            </div>
          </Card>
        </div>
      )}

      {/* Payments List */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Payment History</h2>
        
        {payments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-foreground-muted mb-4">No payment requests yet</p>
            <Button onClick={() => setShowRequestModal(true)}>
              Create Your First Request
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="border border-surface-border rounded-lg p-4 hover:bg-surface-hover transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-foreground">
                        {payment.eventName}
                      </h3>
                      {getStatusBadge(payment.status)}
                    </div>
                    
                    <div className="text-2xl font-bold text-foreground mb-2">
                      {formatCurrency(payment.amount)}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-foreground-muted">Requested:</span>
                        <span className="ml-2 text-foreground">
                          {formatDate(payment.requestedAt)}
                        </span>
                      </div>
                      
                      {payment.paidAt && (
                        <div>
                          <span className="text-foreground-muted">Paid:</span>
                          <span className="ml-2 text-foreground">
                            {formatDate(payment.paidAt)}
                          </span>
                        </div>
                      )}

                      {payment.paymentMethod && (
                        <div>
                          <span className="text-foreground-muted">Method:</span>
                          <span className="ml-2 text-foreground capitalize">
                            {payment.paymentMethod.replace("_", " ")}
                          </span>
                        </div>
                      )}

                      {payment.transactionReference && (
                        <div>
                          <span className="text-foreground-muted">Reference:</span>
                          <span className="ml-2 text-foreground font-mono text-xs">
                            {payment.transactionReference}
                          </span>
                        </div>
                      )}
                    </div>

                    {payment.notes && (
                      <div className="mt-3 text-sm">
                        <span className="text-foreground-muted">Notes:</span>
                        <p className="text-foreground mt-1">{payment.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Request Payment Modal */}
      <Modal
        open={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        title="Request Payment"
        description="Submit a payment request for your services"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Event
            </label>
            <select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="w-full px-3 py-2 border border-surface-border rounded-lg bg-surface-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select an event</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.title}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Amount (NGN)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.currentTarget.value)}
            placeholder="0.00"
            required
          />

          <Textarea
            label="Notes (Optional)"
            value={notes}
            onChange={(e) => setNotes(e.currentTarget.value)}
            placeholder="Add any additional details about this payment request..."
            rows={3}
          />

          <div className="flex gap-3 justify-end pt-4">
            <Button
              variant="secondary"
              onClick={() => setShowRequestModal(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleRequestPayment}
              loading={submitting}
              disabled={!selectedEventId || !amount || parseFloat(amount) <= 0}
            >
              Submit Request
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
