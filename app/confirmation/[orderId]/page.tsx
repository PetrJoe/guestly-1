"use client";
import React from "react";
import Link from "next/link";
import QRDisplay from "@/components/tickets/QRDisplay";
import Button from "@/components/ui/Button";

// Confetti animation component
function Confetti() {
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 2,
    color: ['#4392F1', '#248232', '#DF2935', '#f59e0b', '#8b5cf6'][Math.floor(Math.random() * 5)]
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-2 h-2 opacity-0"
          style={{
            left: `${piece.left}%`,
            top: '-10px',
            backgroundColor: piece.color,
            animation: `confettiFall ${piece.duration}s ease-in ${piece.delay}s forwards`,
            transform: 'rotate(0deg)',
          }}
        />
      ))}
      <style jsx>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

interface ConfirmationContentProps {
  order: {
    id: string;
    status: string;
    items: Array<{ type: string; quantity: number; price: number; attendanceType?: "physical" | "virtual" }>;
    total: number;
  };
}

function ConfirmationContent({ order }: ConfirmationContentProps) {
  const [showConfetti, setShowConfetti] = React.useState(true);

  React.useEffect(() => {
    // Hide confetti after 5 seconds
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showConfetti && <Confetti />}
      
      <div className="container flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md animate-scale-in">
          {/* Success card with glass morphism */}
          <div className="relative flex flex-col items-center gap-6 rounded-3xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-8 shadow-2xl text-center overflow-hidden">
            {/* Glass morphism overlay */}
            <div className="absolute inset-0 glass-light opacity-50" />
            
            {/* Content */}
            <div className="relative z-10 w-full space-y-6">
              {/* Animated checkmark with glow */}
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-success-500/10 mx-auto animate-bounce-subtle">
                <div className="absolute inset-0 rounded-full bg-success-500/20 animate-pulse-glow" />
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success-500 shadow-lg">
                  <svg className="h-10 w-10 text-white animate-scale-in" style={{ animationDelay: '0.2s' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              {/* Success message */}
              <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <h1 className="text-2xl font-extrabold text-[var(--foreground)] mb-2">
                  🎉 You&apos;re all set!
                </h1>
                <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
                  Your tickets have been confirmed. Show the QR code below at the event entrance.
                </p>
              </div>

              {/* Order details */}
              <div className="animate-fade-in-up bg-[var(--surface-bg)] rounded-2xl p-4 space-y-2" style={{ animationDelay: '0.4s' }}>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--foreground-muted)]">Order ID</span>
                  <span className="font-mono text-xs text-[var(--foreground)]">{order.id.slice(0, 8)}</span>
                </div>
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-[var(--foreground-muted)]">{item.type}</span>
                      {item.attendanceType === "physical" && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 font-medium">
                          In-Person
                        </span>
                      )}
                      {item.attendanceType === "virtual" && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-success-100 text-success-700 font-medium">
                          Virtual
                        </span>
                      )}
                    </div>
                    <span className="font-semibold text-[var(--foreground)]">
                      {item.quantity}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between text-sm pt-2 border-t border-[var(--surface-border)]">
                  <span className="font-semibold text-[var(--foreground)]">Total Paid</span>
                  <span className="font-bold text-primary-600 tabular-nums">${order.total.toFixed(2)}</span>
                </div>
              </div>

              {/* QR Code with glass effect */}
              <div className="animate-fade-in-up glass-medium rounded-2xl p-6" style={{ animationDelay: '0.5s' }}>
                <QRDisplay value={order.id} />
                <p className="mt-3 text-xs text-[var(--foreground-subtle)]">
                  Save this QR code to your device
                </p>
              </div>

              {/* Quick actions */}
              <div className="animate-fade-in-up flex items-center justify-center gap-4 text-xs" style={{ animationDelay: '0.6s' }}>
                <button className="flex items-center gap-1.5 text-primary-600 hover:text-primary-700 transition-colors">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share
                </button>
                <button className="flex items-center gap-1.5 text-primary-600 hover:text-primary-700 transition-colors">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Add to Calendar
                </button>
                <button className="flex items-center gap-1.5 text-primary-600 hover:text-primary-700 transition-colors">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </button>
              </div>

              {/* Action buttons */}
              <div className="flex w-full flex-col gap-3 pt-2 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                <Link href="/attendee" className="w-full">
                  <Button className="w-full min-h-[48px] text-base font-semibold">
                    View My Tickets
                  </Button>
                </Link>
                <Link href="/explore" className="w-full">
                  <Button variant="outline" className="w-full min-h-[48px]">
                    Explore More Events
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Email confirmation notice */}
          <div className="mt-6 text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--surface-card)] border border-[var(--surface-border)] px-4 py-2 text-xs text-[var(--foreground-muted)]">
              <svg className="h-4 w-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Confirmation email sent to your inbox
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default async function ConfirmationPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  
  // Dynamic import to avoid server-side issues
  const { getOrder } = await import("@/lib/store");
  const order = getOrder(orderId);

  if (!order || order.status !== "paid") {
    return (
      <div className="container flex flex-col items-center justify-center gap-4 py-24 text-center">
        <div className="text-6xl animate-bounce-subtle">😕</div>
        <h1 className="text-xl font-bold text-[var(--foreground)]">Order not found</h1>
        <p className="text-sm text-[var(--foreground-muted)] max-w-md">
          This order doesn&apos;t exist or hasn&apos;t been paid yet.
        </p>
        <Link href="/explore">
          <Button variant="outline" size="lg">Browse Events</Button>
        </Link>
      </div>
    );
  }

  return <ConfirmationContent order={order} />;
}

