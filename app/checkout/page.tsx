"use client";
import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import OrderSummary from "@/components/tickets/OrderSummary";
import PaymentMethodSelector from "@/components/tickets/PaymentMethodSelector";
import Button from "@/components/ui/Button";
import Stepper from "@/components/ui/Stepper";
import { useCart } from "@/features/merchandise/CartProvider";
import ShippingAddressForm from "@/components/merchandise/ShippingAddressForm";
import { PromoCodeInput } from "@/components/tickets/PromoCodeInput";
import type { ShippingAddress } from "@/types/merchandise";

type Order = {
  id: string;
  eventId: string;
  items: Array<{ type: "General" | "VIP"; quantity: number; price: number }>;
  total: number;
  status: "pending" | "paid";
};

// ── Merch checkout summary ──────────────────────────────────────────────────

function MerchSummary({ items, total }: { items: { name: string; quantity: number; price: number; image: string; size?: string }[]; total: number }) {
  return (
    <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-[var(--foreground)]">Order Summary</h3>
      <div className="mt-3 space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-bg)] text-xl">
              {item.image}
            </span>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-[var(--foreground)]">{item.name}</p>
              {item.size && <p className="text-[11px] text-[var(--foreground-subtle)]">Size: {item.size}</p>}
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-[var(--foreground)] tabular-nums">${(item.price * item.quantity).toFixed(2)}</p>
              <p className="text-[11px] text-[var(--foreground-subtle)]">×{item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between border-t border-[var(--surface-border)] pt-3">
        <span className="text-sm font-semibold text-[var(--foreground)]">Total</span>
        <span className="text-base font-bold text-[var(--foreground)] tabular-nums">${total.toFixed(2)}</span>
      </div>
    </div>
  );
}

// ── Combined checkout summary ───────────────────────────────────────────────

function CombinedSummary({ 
  ticketItems, 
  ticketTotal, 
  merchItems, 
  merchTotal, 
  combinedTotal 
}: { 
  ticketItems: any[]; 
  ticketTotal: number; 
  merchItems: { name: string; quantity: number; price: number; image: string; size?: string }[]; 
  merchTotal: number;
  combinedTotal: number;
}) {
  return (
    <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-[var(--foreground)]">Order Summary</h3>
      
      {/* Tickets Section */}
      {ticketItems.length > 0 && (
        <div className="mt-3 space-y-3">
          <div className="flex items-center gap-2 text-xs font-medium text-[var(--foreground-muted)]">
            <span>🎫</span>
            <span>TICKETS</span>
          </div>
          {ticketItems.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-xl">
                🎫
              </span>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-[var(--foreground)]">{item.eventTitle}</p>
                <p className="text-[11px] text-[var(--foreground-subtle)]">
                  {item.type}
                  {item.attendanceType && ` • ${item.attendanceType === 'physical' ? 'Physical' : 'Virtual'}`}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-[var(--foreground)] tabular-nums">${(item.price * item.quantity).toFixed(2)}</p>
                <p className="text-[11px] text-[var(--foreground-subtle)]">×{item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Merchandise Section */}
      {merchItems.length > 0 && (
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2 text-xs font-medium text-[var(--foreground-muted)]">
            <span>🛍️</span>
            <span>MERCHANDISE</span>
          </div>
          {merchItems.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-bg)] text-xl">
                {item.image}
              </span>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-[var(--foreground)]">{item.name}</p>
                {item.size && <p className="text-[11px] text-[var(--foreground-subtle)]">Size: {item.size}</p>}
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-[var(--foreground)] tabular-nums">${(item.price * item.quantity).toFixed(2)}</p>
                <p className="text-[11px] text-[var(--foreground-subtle)]">×{item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Subtotals */}
      <div className="mt-4 space-y-2 border-t border-[var(--surface-border)] pt-3">
        {ticketItems.length > 0 && (
          <div className="flex justify-between text-sm text-[var(--foreground-muted)]">
            <span>Tickets subtotal</span>
            <span className="tabular-nums">${ticketTotal.toFixed(2)}</span>
          </div>
        )}
        {merchItems.length > 0 && (
          <div className="flex justify-between text-sm text-[var(--foreground-muted)]">
            <span>Merchandise subtotal</span>
            <span className="tabular-nums">${merchTotal.toFixed(2)}</span>
          </div>
        )}
      </div>
      
      {/* Total */}
      <div className="mt-3 flex justify-between border-t border-[var(--surface-border)] pt-3">
        <span className="text-sm font-semibold text-[var(--foreground)]">Total</span>
        <span className="text-base font-bold text-[var(--foreground)] tabular-nums">${combinedTotal.toFixed(2)}</span>
      </div>
    </div>
  );
}

// ── Checkout content ────────────────────────────────────────────────────────

function CheckoutContent() {
  const params = useSearchParams();
  const router = useRouter();
  const checkoutType = params.get("type") || "ticket"; // "ticket" | "merch" | "combined"
  const orderId = params.get("orderId") || "";

  const { 
    items: cartItems, 
    total: cartTotal, 
    clearCart,
    ticketItems,
    ticketTotal,
    clearTicketCart,
    combinedTotal,
    clearAll
  } = useCart();

  const [order, setOrder] = React.useState<Order | null>(null);
  const [method, setMethod] = React.useState<"wallet" | "card">("wallet");
  const [loading, setLoading] = React.useState(checkoutType === "ticket");
  const [processing, setProcessing] = React.useState(false);
  const [shippingAddress, setShippingAddress] = React.useState<ShippingAddress>({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
  });
  const [shippingErrors, setShippingErrors] = React.useState<Partial<Record<keyof ShippingAddress, string>>>({});
  
  // Promo code state
  const [promoCode, setPromoCode] = React.useState<string>('');
  const [promoDiscount, setPromoDiscount] = React.useState<number>(0);
  
  // Savings state
  const [savingsTarget, setSavingsTarget] = React.useState<any>(null);
  const [savingsApplied, setSavingsApplied] = React.useState(0);
  const [loadingSavings, setLoadingSavings] = React.useState(false);

  const isMerch = checkoutType === "merch";
  const isCombined = checkoutType === "combined";
  const hasTickets = ticketItems.length > 0;
  const hasMerch = cartItems.length > 0;

  // Check if cart has delivery items
  const [needsShipping, setNeedsShipping] = React.useState(false);
  
  React.useEffect(() => {
    if (isCombined && (hasMerch || hasTickets)) {
      // Check if any merch items need delivery
      if (hasMerch) {
        fetch(`/api/merch/products?ids=${cartItems.map(i => i.productId).join(",")}`)
          .then(res => res.json())
          .then(data => {
            if (data.success && data.products) {
              const hasDelivery = data.products.some((p: any) => p.fulfillmentType === "delivery");
              setNeedsShipping(hasDelivery);
            }
          });
      }
    } else if (isMerch && cartItems.length > 0) {
      // Check if any items need delivery
      fetch(`/api/merch/products?ids=${cartItems.map(i => i.productId).join(",")}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.products) {
            const hasDelivery = data.products.some((p: any) => p.fulfillmentType === "delivery");
            setNeedsShipping(hasDelivery);
          }
        });
    }
  }, [isMerch, isCombined, cartItems, hasMerch, hasTickets]);

  React.useEffect(() => {
    if (!isMerch && orderId) {
      async function load() {
        const res = await fetch(`/api/orders?id=${orderId}`);
        const data = await res.json();
        if (res.ok) setOrder(data.order as Order);
        setLoading(false);
      }
      load();
    }
  }, [orderId, isMerch]);
  
  // Fetch savings target for the event
  React.useEffect(() => {
    async function fetchSavings() {
      // Only check savings for ticket orders (not merch-only)
      if (isMerch) return;
      
      let eventId: string | undefined;
      
      if (isCombined && hasTickets) {
        // For combined checkout, use the first ticket's event
        eventId = ticketItems[0]?.eventId;
      } else if (order) {
        // For ticket-only checkout
        eventId = order.eventId;
      }
      
      if (!eventId) return;
      
      setLoadingSavings(true);
      try {
        const res = await fetch(`/api/wallet/savings/by-event?eventId=${eventId}`);
        const data = await res.json();
        
        if (data.success && data.target && data.target.currentAmount > 0) {
          setSavingsTarget(data.target);
          
          // Calculate how much savings to apply
          const orderTotal = isCombined ? combinedTotal : order?.total || 0;
          const availableSavings = data.target.currentAmount;
          const amountToApply = Math.min(availableSavings, orderTotal);
          
          setSavingsApplied(amountToApply);
        }
      } catch (error) {
        console.error("Failed to fetch savings:", error);
      } finally {
        setLoadingSavings(false);
      }
    }
    
    fetchSavings();
  }, [order, isMerch, isCombined, hasTickets, ticketItems, combinedTotal]);

  function proceed() {
    if (isCombined) {
      // Handle combined checkout (tickets + merch)
      if (needsShipping) {
        const errors: Partial<Record<keyof ShippingAddress, string>> = {};
        const requiredFields: (keyof ShippingAddress)[] = [
          "fullName",
          "addressLine1",
          "city",
          "state",
          "postalCode",
          "country",
          "phone",
        ];
        
        for (const field of requiredFields) {
          if (!shippingAddress[field]) {
            errors[field] = "This field is required";
          }
        }
        
        if (Object.keys(errors).length > 0) {
          setShippingErrors(errors);
          return;
        }
      }
      
      setProcessing(true);
      
      // Create both ticket and merch orders
      const promises: Promise<any>[] = [];
      
      // Create ticket orders if any
      if (hasTickets) {
        ticketItems.forEach(ticketItem => {
          const ticketOrderPromise = fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              eventId: ticketItem.eventId,
              items: [{
                type: ticketItem.type,
                quantity: ticketItem.quantity,
                price: ticketItem.price,
                attendanceType: ticketItem.attendanceType
              }],
              savingsApplied: savingsApplied,
              savingsTargetId: savingsTarget?.id,
            }),
          }).then(res => res.json());
          promises.push(ticketOrderPromise);
        });
      }
      
      // Create merch order if any
      if (hasMerch) {
        const eventId = cartItems[0]?.eventId || "";
        const orderItems = cartItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          size: item.size,
        }));
        
        const merchOrderPromise = fetch("/api/merch/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventId,
            items: orderItems,
            shippingAddress: needsShipping ? shippingAddress : undefined,
          }),
        }).then(res => res.json());
        promises.push(merchOrderPromise);
      }
      
      Promise.all(promises)
        .then(results => {
          const allSuccess = results.every(r => r.success);
          if (allSuccess) {
            clearAll();
            // Redirect to a combined confirmation page
            const orderIds = results.map(r => r.order?.id || r.orderId).filter(Boolean).join(",");
            router.replace(`/confirmation/combined?orderIds=${orderIds}`);
          } else {
            alert("Failed to create some orders");
            setProcessing(false);
          }
        })
        .catch(() => {
          alert("Failed to create orders");
          setProcessing(false);
        });
      return;
    }
    
    if (isMerch) {
      // Validate shipping address if needed
      if (needsShipping) {
        const errors: Partial<Record<keyof ShippingAddress, string>> = {};
        const requiredFields: (keyof ShippingAddress)[] = [
          "fullName",
          "addressLine1",
          "city",
          "state",
          "postalCode",
          "country",
          "phone",
        ];
        
        for (const field of requiredFields) {
          if (!shippingAddress[field]) {
            errors[field] = "This field is required";
          }
        }
        
        if (Object.keys(errors).length > 0) {
          setShippingErrors(errors);
          return;
        }
      }
      
      // Create merch order
      setProcessing(true);
      const eventId = cartItems[0]?.eventId || "";
      const orderItems = cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        size: item.size,
      }));
      
      fetch("/api/merch/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          items: orderItems,
          shippingAddress: needsShipping ? shippingAddress : undefined,
        }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            clearCart();
            router.replace(`/confirmation/merch-order?orderId=${data.order.id}`);
          } else {
            alert(data.error || "Failed to create order");
            setProcessing(false);
          }
        })
        .catch(() => {
          alert("Failed to create order");
          setProcessing(false);
        });
      return;
    }
    if (!order) return;
    
    // Build payment URL with savings info
    let paymentUrl = `/payment?orderId=${order.id}&method=${method}`;
    if (savingsApplied > 0 && savingsTarget) {
      paymentUrl += `&savingsApplied=${savingsApplied}&savingsTargetId=${savingsTarget.id}`;
    }
    router.replace(paymentUrl);
  }

  const stepLabels = isMerch || isCombined
    ? [
        { label: "Cart", description: "Review items" },
        { label: "Checkout", description: "Payment details" },
        { label: "Done", description: "Order confirmed" }
      ]
    : [
        { label: "Tickets", description: "Select tickets" },
        { label: "Checkout", description: "Payment method" },
        { label: "Payment", description: "Complete purchase" }
      ];
  const isEmpty = isCombined 
    ? !hasTickets && !hasMerch
    : isMerch 
      ? cartItems.length === 0 
      : !order;
  const showLoading = !isMerch && !isCombined ? loading : false;

  return (
    <ProtectedRoute allowRoles={["attendee"]}>
      <div className="container py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-1.5 text-xs text-[var(--foreground-subtle)]">
          <Link href="/" className="hover:text-[var(--foreground-muted)] transition-colors">Home</Link>
          <span>/</span>
          {isMerch && (
            <>
              <Link href="/cart" className="hover:text-[var(--foreground-muted)] transition-colors">Cart</Link>
              <span>/</span>
            </>
          )}
          <span className="text-[var(--foreground-muted)] font-medium">Checkout</span>
        </nav>

        {/* Progress Stepper */}
        <div className="mb-10 mx-auto max-w-2xl">
          <Stepper 
            steps={stepLabels} 
            currentStep={1}
            orientation="horizontal"
          />
        </div>

        {showLoading ? (
          <div className="mx-auto max-w-4xl space-y-6 animate-fade-in">
            {/* Skeleton for payment method selector */}
            <div className="space-y-4">
              <div className="h-6 w-32 bg-[var(--surface-border)] rounded shimmer" />
              <div className="space-y-3">
                <div className="h-20 bg-[var(--surface-card)] border border-[var(--surface-border)] rounded-2xl shimmer" />
                <div className="h-20 bg-[var(--surface-card)] border border-[var(--surface-border)] rounded-2xl shimmer" />
              </div>
            </div>
            
            {/* Skeleton for order summary */}
            <div className="h-64 bg-[var(--surface-card)] border border-[var(--surface-border)] rounded-2xl shimmer" />
          </div>
        ) : isEmpty ? (
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <span className="text-4xl">{isMerch ? "🛒" : "🎫"}</span>
            <p className="text-sm text-[var(--foreground-muted)]">
              {isMerch ? "Your cart is empty." : "Order not found."}
            </p>
            <Link href={isMerch ? "/explore" : "/"}>
              <Button variant="outline" size="sm">
                {isMerch ? "Browse Events" : "Go Home"}
              </Button>
            </Link>
          </div>
        ) : (
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 lg:grid-cols-5">
            {/* Left: Payment method - Full width on mobile */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              {/* Shipping Address Form for delivery items */}
              {(isMerch || isCombined) && needsShipping && (
                <div className="mb-6 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-5 shadow-sm">
                  <ShippingAddressForm
                    value={shippingAddress}
                    onChange={setShippingAddress}
                    errors={shippingErrors}
                  />
                </div>
              )}

              <h2 className="mb-4 text-lg font-bold text-[var(--foreground)] sm:text-base">
                Payment Method
              </h2>
              
              {/* Trust signals */}
              <div className="mb-6 flex flex-wrap items-center gap-4 rounded-xl bg-success-50 border border-success-200 px-4 py-3">
                <div className="flex items-center gap-2 text-xs text-success-700">
                  <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="font-medium">Secure SSL Encrypted</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-success-700">
                  <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">Verified Organizer</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-success-700">
                  <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="font-medium">Full Refund Policy</span>
                </div>
              </div>

              <PaymentMethodSelector 
                value={method} 
                onChange={setMethod}
                orderTotal={isCombined ? combinedTotal : isMerch ? cartTotal : order?.total}
                savingsApplied={savingsApplied}
              />

              {/* Promo Code Input */}
              {!isMerch && order && (
                <div className="mt-6">
                  <PromoCodeInput
                    eventId={order.eventId}
                    onApply={(code, discount) => {
                      setPromoCode(code);
                      setPromoDiscount(discount);
                    }}
                    onRemove={() => {
                      setPromoCode('');
                      setPromoDiscount(0);
                    }}
                    appliedCode={promoCode}
                    appliedDiscount={promoDiscount}
                  />
                </div>
              )}

              {/* Mobile-optimized button with proper touch target */}
              <div className="mt-6 sticky bottom-4 lg:static">
                <Button
                  onClick={proceed}
                  className="w-full min-h-[48px] text-base font-semibold shadow-lg lg:shadow-sm"
                  size="lg"
                  disabled={processing}
                >
                  {processing ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing…
                    </span>
                  ) : (
                    "Proceed to Payment"
                  )}
                </Button>
                
                {/* Additional trust signals below button */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-[var(--foreground-subtle)]">
                    By proceeding, you agree to our{" "}
                    <Link href="/terms" className="text-primary-600 hover:underline">Terms</Link>
                    {" "}and{" "}
                    <Link href="/refund-policy" className="text-primary-600 hover:underline">Refund Policy</Link>
                  </p>
                  <div className="mt-3 flex items-center justify-center gap-3 text-[var(--foreground-subtle)]">
                    <span className="text-xs">Powered by</span>
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded bg-primary-100 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary-600">G</span>
                      </div>
                      <span className="text-xs font-semibold">Guestly Pay</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Order summary - Shows first on mobile for context */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              {/* Savings Applied Banner */}
              {savingsApplied > 0 && savingsTarget && (
                <div className="mb-4 rounded-xl bg-success-50 border border-success-200 p-4 animate-fade-in">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-success-500 text-white">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-success-900">🎉 Savings Applied!</p>
                      <p className="text-xs text-success-700 mt-1">
                        ${savingsApplied.toFixed(2)} from your event savings has been automatically applied to this order.
                        {savingsTarget.currentAmount - savingsApplied > 0 && (
                          <> You'll have ${(savingsTarget.currentAmount - savingsApplied).toFixed(2)} remaining.</>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {isCombined ? (
                <CombinedSummary 
                  ticketItems={ticketItems} 
                  ticketTotal={ticketTotal}
                  merchItems={cartItems} 
                  merchTotal={cartTotal}
                  combinedTotal={combinedTotal}
                />
              ) : isMerch ? (
                <MerchSummary items={cartItems} total={cartTotal} />
              ) : (
                order && (
                  <OrderSummary 
                    items={order.items} 
                    total={order.total} 
                    showBreakdown 
                    savingsApplied={savingsApplied}
                    remainingSavings={savingsTarget ? savingsTarget.currentAmount - savingsApplied : 0}
                  />
                )
              )}
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="container flex items-center justify-center py-24">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-primary-600" />
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
