import React from "react";
import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Guestly — Discover & Organise Events",
  description: "Discover, attend, and organise events across Africa. Buy tickets, join communities, and explore merch.",
  openGraph: {
    title: "Guestly — Discover & Organise Events",
    description: "Discover, attend, and organise events across Africa.",
    url: "https://guestly.app/",
    siteName: "Guestly",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guestly — Discover & Organise Events",
    description: "Discover, attend, and organise events across Africa.",
  },
};

export default function Home() {
  return <HomeClient />;
}
