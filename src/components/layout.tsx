"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant/20 h-20 px-6 md:px-20 flex items-center justify-between">
      <div className="flex items-center gap-12">
        <Link href="/" className="text-xl font-bold font-display tracking-tight text-on-surface">
          Tata <span className="text-primary">Matchmaker</span>
        </Link>
      </div>
      
      <div className="flex items-center gap-4">
        <Link 
          href="/quiz"
          className="px-6 py-2.5 bg-primary text-on-primary font-bold rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all text-sm"
        >
          New Assessment
        </Link>
      </div>
    </nav>
  );
};

export const Footer = () => {
  return (
    <footer className="py-20 px-6 md:px-20 border-t border-outline-variant/20 bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div className="max-w-xs">
          <Link href="/" className="text-xl font-bold font-display tracking-tight text-on-surface mb-6 block">
            Tata <span className="text-primary">Matchmaker</span>
          </Link>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            AI-powered strategic analysis for enterprise ecosystem matching. Engineering the future across the Tata Group.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-12">
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-on-surface font-code tracking-widest uppercase">Ecosystem</h4>
            <ul className="text-sm text-on-surface-variant space-y-3">
              <li><Link href="#" className="hover:text-primary transition-colors">TCS Digital</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Tata Motors EV</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Tata Steel Global</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-outline-variant/10 flex justify-between items-center text-[10px] font-code text-on-surface-variant uppercase tracking-widest">
        <span>© Tata Strategic Matchmaker</span>
      </div>
    </footer>
  );
};
