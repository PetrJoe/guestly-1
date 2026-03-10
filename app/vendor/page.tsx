"use client";
import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { motion } from "framer-motion";

export default function VendorLandingPage() {
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
              className="inline-flex items-center gap-2 rounded-full border border-success-500/30 bg-success-500/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-success-600 dark:text-success-400 mb-8"
            >
              <Icon name="shopping-bag" size={14} />
              The Premium Event Marketplace
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl font-black leading-tight sm:text-7xl mb-8 text-[var(--foreground)]"
            >
              Get booked by <span className="text-gradient-blue">top organizers.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-[var(--foreground-muted)] mb-12 max-w-2xl leading-relaxed"
            >
              Join Africa&apos;s most exclusive event service network. Show your portfolio, manage inquiries, and receive secure payments from vetted event creators.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-6"
            >
              <Button href="/vendor-auth/register" size="xl" glow className="min-w-[200px]">
                List Your Business
              </Button>
              <Button href="/vendor-auth/login" variant="outline" size="xl" className="min-w-[200px] border-[var(--surface-border)] bg-[var(--surface-card)] text-[var(--foreground)] hover:bg-[var(--surface-hover)] dark:bg-white/5 dark:hover:bg-white/10">
                Vendor Sign In
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust & Scale Section */}
      <section className="py-24 bg-[var(--surface-card)]/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                icon: "shield", 
                title: "Guaranteed Payments", 
                desc: "Never chase a client again. Our escrow system ensures you get paid instantly upon service completion." 
              },
              { 
                icon: "activity", 
                title: "Smart Leads", 
                desc: "Our AI matches your services with organizers actively planning events in your category and city." 
              },
              { 
                icon: "star", 
                title: "Verified Reviews", 
                desc: "Build a premium reputation with verified feedback from professional event organizers." 
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative flex flex-col items-center text-center p-8 rounded-[2.5rem] border border-[var(--surface-border)] bg-[var(--surface-card)] hover:bg-[var(--surface-hover)] transition-all dark:bg-white/5"
              >
                <div className="h-16 w-16 rounded-2xl bg-primary-500/10 flex items-center justify-center text-primary-500 mb-8 transform transition-transform group-hover:scale-110 group-hover:rotate-3">
                  <Icon name={item.icon as any} size={32} />
                </div>
                <h3 className="text-xl font-black text-[var(--foreground)] uppercase tracking-wider mb-4">{item.title}</h3>
                <p className="text-[var(--foreground-muted)] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vendor categories section */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-[var(--foreground)] uppercase tracking-[0.2em] mb-16">Who we support</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: "Catering", icon: "zap" },
              { name: "Photography", icon: "activity" },
              { name: "Venue", icon: "location" },
              { name: "Security", icon: "shield" },
              { name: "Logistics", icon: "package" },
              { name: "AV/Sound", icon: "zap" },
            ].map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col items-center gap-4 p-6 rounded-3xl border border-[var(--surface-border)] bg-[var(--surface-card)] dark:bg-white/5"
              >
                <div className="h-10 w-10 rounded-xl bg-[var(--surface-bg)] flex items-center justify-center text-primary-500">
                  <Icon name={cat.icon as any} size={20} />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-[var(--foreground)]">{cat.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-primary-600 to-primary-800 p-12 text-center text-white"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
          <h2 className="relative text-4xl font-black mb-6">Ready to scale your business?</h2>
          <p className="relative text-lg text-primary-50 mb-10 max-w-2xl mx-auto font-medium">
            Join the elite network of service providers powering Africa&apos;s most memorable experiences.
          </p>
          <Button href="/vendor-auth/register" size="xl" className="relative bg-white text-primary-700 hover:bg-primary-50 shadow-2xl">
            Register as a Vendor
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
