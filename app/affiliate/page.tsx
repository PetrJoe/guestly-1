"use client";
import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { motion } from "framer-motion";

export default function AffiliateLandingPage() {
  return (
    <div className="min-h-screen bg-[var(--surface-bg)] text-[var(--foreground)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-primary-500/10 blur-[120px]" />
          <div className="absolute -right-1/4 bottom-0 h-[600px] w-[600px] rounded-full bg-success-500/10 blur-[120px]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="flex flex-col items-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-warning-500/30 bg-warning-500/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-warning-600 dark:text-warning-400 mb-8"
            >
              <Icon name="activity" size={14} />
              The Influencer & Promoter Program
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl font-black leading-tight sm:text-7xl mb-8 text-[var(--foreground)]"
            >
              Monetize your <span className="text-gradient-blue">influence.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-[var(--foreground-muted)] mb-12 max-w-2xl leading-relaxed"
            >
              Partner with the biggest events in Africa. Share unique referral links, track your performance in real-time, and earn industry-leading commissions on every ticket sold.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-6"
            >
              <Button href="/affiliate-auth/register" size="xl" glow className="min-w-[200px]">
                Become an Affiliate
              </Button>
              <Button href="/affiliate-auth/login" variant="outline" size="xl" className="min-w-[200px] border-[var(--surface-border)] bg-[var(--surface-card)] text-[var(--foreground)] hover:bg-[var(--surface-hover)] dark:bg-white/5 dark:hover:bg-white/10">
                Partner Sign In
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-24 bg-[var(--surface-card)]/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                icon: "zap", 
                title: "Instant Setup", 
                desc: "Get approved and start sharing links in under 5 minutes. No technical knowledge required." 
              },
              { 
                icon: "bar-chart", 
                title: "Live Analytics", 
                desc: "Track clicks, conversions, and commissions in real-time with our transparent dashboard." 
              },
              { 
                icon: "credit-card", 
                title: "Weekly Payouts", 
                desc: "Receive your earnings directly to your GUESTLY wallet or bank account every Friday." 
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col gap-6 p-8 rounded-[2.5rem] border border-[var(--surface-border)] bg-[var(--surface-card)] hover:bg-[var(--surface-hover)] transition-all dark:bg-white/5"
              >
                <div className="h-14 w-14 rounded-2xl bg-warning-500/10 flex items-center justify-center text-warning-600 dark:text-warning-400">
                  <Icon name={item.icon as any} size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-[var(--foreground)] uppercase tracking-wider mb-2">{item.title}</h3>
                  <p className="text-[var(--foreground-muted)] leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-warning-500/20 blur-[100px] rounded-full" />
              <div className="relative rounded-[2.5rem] border border-[var(--surface-border)] bg-[var(--surface-card)] p-8 shadow-2xl dark:bg-white/5 dark:backdrop-blur-xl">
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-6 border-b border-[var(--surface-border)]">
                    <div className="h-10 w-10 rounded-full bg-primary-500/20" />
                    <div className="text-right">
                      <p className="text-xs font-black uppercase text-[var(--foreground-subtle)]">Earnings</p>
                      <p className="text-2xl font-black text-success-600 dark:text-success-400">₦450,000</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-[var(--surface-bg)] border border-[var(--surface-border)]">
                      <p className="text-[10px] font-black uppercase text-[var(--foreground-subtle)]">Clicks</p>
                      <p className="text-xl font-black">12.4K</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[var(--surface-bg)] border border-[var(--surface-border)]">
                      <p className="text-[10px] font-black uppercase text-[var(--foreground-subtle)]">Sales</p>
                      <p className="text-xl font-black">842</p>
                    </div>
                  </div>
                  <div className="h-40 rounded-2xl bg-gradient-to-t from-warning-500/10 to-transparent border border-warning-500/20 flex items-end p-4">
                    <div className="flex gap-1 w-full items-end">
                      {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                        <div key={i} className="flex-1 bg-warning-500/40 rounded-t-sm" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 order-1 lg:order-2 space-y-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-warning-500/30 bg-warning-500/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-warning-600 dark:text-warning-400">
                Influencer Tools
              </span>
              <h2 className="text-4xl font-black text-[var(--foreground)] leading-tight sm:text-5xl">
                Automated <span className="text-gradient-blue">Media Kits.</span>
              </h2>
              <p className="text-[var(--foreground-muted)] text-lg leading-relaxed">
                Stop manually tracking your performance. GUESTLY automatically generates a professional media kit showcasing your conversion rates and audience reach to attract high-paying event partnerships.
              </p>
              <div className="pt-4">
                <Button href="/affiliate-auth/register" size="xl" glow>
                  Join the Network
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
