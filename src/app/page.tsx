"use client";

import React from "react";
import Link from "next/link";
import { Navbar, Footer } from "@/components/layout";
import { motion } from "framer-motion";
import { ArrowRight, Database, Cpu, Layers, CheckCircle, Network, TrendingUp, Shield, BarChart3 } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          {/* Background Graphic */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-40">
              <img 
                alt="Abstract Tata Ecosystem" 
                className="w-full h-full object-cover mix-blend-screen" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTqplYYCQZEY_MbTIFBO9pEJ-ZCR2VB7EbB6vl6ORN09cHm2N8XcdViqvcqjwSvqzw44ImKD3-bXTVjIxJ2WC1NyZAgvW4me3fTiADheFvSQBIKwhecMRsgWhpKRzSTrVhoBqVWe9h17KclJ-ac73HJ2JGDFxBPRhhjCvNswg04YODQDfpkoOq-wE4txYEmSZdpKgwk-_jmfMpEQIcEkl8TniCldm9R5T9l9J7KERjt_pynwnZtGsSi6IvyHEy776o7m3eW9fCO8k"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
          </div>
          
          <div className="container mx-auto px-6 md:px-20 max-w-7xl relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-8">
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] font-code">
                  Ecosystem Intelligence Engine v2.1
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold font-display text-on-surface mb-6 leading-[1.1]">
                Engineer Your Strategy with <span className="text-primary">Tata Synergy</span>
              </h1>
              
              <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mb-10 leading-relaxed">
                A dynamic 10-step strategic assessment to match your enterprise requirements with the optimal Tata Group divisions. Get calibrated synergy paths across IT, Motors, Steel, and Power.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/quiz"
                  className="bg-primary text-on-primary px-10 py-4 rounded-lg font-bold text-lg shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 group"
                >
                  Start Assessment
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="glass-card text-on-surface px-10 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all">
                  Explore Ecosystem
                </button>
              </div>
            </motion.div>
          </div>
        </section>
 
        {/* Methodology Section */}
        <section className="py-24 bg-surface-container-lowest">
          <div className="container mx-auto px-6 md:px-20 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] font-code block mb-4">
                  Methodology
                </span>
                <h2 className="text-4xl font-bold font-display text-on-surface">The Strategic Alignment Pipeline</h2>
              </div>
              <p className="text-on-surface-variant max-w-md text-base">
                Our algorithmic approach deconstructs your business objectives into core primitives to ensure perfect alignment with Tata's enterprise capabilities.
              </p>
            </div>
 
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="glass-card p-10 rounded-xl scanner-effect group hover:border-primary/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-8 border border-primary/20">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <div className="text-[10px] font-bold text-primary/60 mb-2 font-code">STEP 01</div>
                <h3 className="text-2xl font-bold font-display text-on-surface mb-4">Business Intake</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Define your strategic objectives, market reach, and operational scale through our high-fidelity intake interface.
                </p>
              </motion.div>
 
              {/* Step 2 */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="glass-card p-10 rounded-xl scanner-effect group hover:border-secondary/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-8 border border-secondary/20">
                  <TrendingUp className="w-6 h-6 text-secondary" />
                </div>
                <div className="text-[10px] font-bold text-secondary/60 mb-2 font-code">STEP 02</div>
                <h3 className="text-2xl font-bold font-display text-on-surface mb-4">Synergy Analysis</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Our neural engine cross-references your needs against the full Tata portfolio to identify cross-division leverage points.
                </p>
              </motion.div>
 
              {/* Step 3 */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="glass-card p-10 rounded-xl scanner-effect group hover:border-tertiary/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-tertiary/10 flex items-center justify-center mb-8 border border-tertiary/20">
                  <Shield className="w-6 h-6 text-tertiary" />
                </div>
                <div className="text-[10px] font-bold text-tertiary/60 mb-2 font-code">STEP 03</div>
                <h3 className="text-2xl font-bold font-display text-on-surface mb-4">Blueprint Delivery</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Receive a definitive synergy map, ROI projection, and implementation roadmap tailored to your enterprise goals.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
 
        {/* Feature Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-6 md:px-20 max-w-7xl">
            <div className="glass-card rounded-2xl p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
                <Network className="w-full h-full text-primary" strokeWidth={0.5} />
              </div>
              
              <div className="md:w-1/2 relative z-10">
                <h2 className="text-4xl font-bold font-display text-on-surface mb-8">Built for Enterprise Decision Makers</h2>
                <div className="space-y-6">
                  {[
                    { title: "Strategic Scoring:", desc: "Every recommendation includes a synergy match score based on your unique business profile." },
                    { title: "Division Alignment:", desc: "Direct mapping to specialized Tata entities like TCS, Tata Motors, and Tata Digital." },
                    { title: "Direct Roadmap:", desc: "Download high-level implementation plans and strategic roadmap summaries immediately." }
                  ].map((feature, i) => (
                    <div key={i} className="flex gap-4">
                      <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                      <p className="text-on-surface-variant">
                        <strong className="text-on-surface">{feature.title}</strong> {feature.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
 
              <div className="md:w-1/2 w-full">
                <div className="glass-card p-8 rounded-xl border-primary/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/5 blur-3xl -z-10" />
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-error/40"></div>
                      <div className="w-3 h-3 rounded-full bg-secondary/40"></div>
                      <div className="w-3 h-3 rounded-full bg-primary/40"></div>
                    </div>
                    <span className="text-[10px] font-bold text-primary font-code uppercase">SYNERGY_RESULT.JSON</span>
                  </div>
                  <div className="font-code text-sm text-primary/80 space-y-3">
                    <p><span className="text-secondary">"recommended_division"</span>: <span className="text-tertiary">"Tata_Digital"</span>,</p>
                    <p><span className="text-secondary">"primary_service"</span>: <span className="text-tertiary">"Tata_Neu_Enterprise"</span>,</p>
                    <p><span className="text-secondary">"consulting_partner"</span>: <span className="text-tertiary">"TCS_Global"</span>,</p>
                    <p><span className="text-secondary">"strategic_match"</span>: <span className="text-on-surface">0.98</span>,</p>
                    <p><span className="text-secondary">"business_impact"</span>: <span className="text-on-surface">"Significant"</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
 
      <Footer />
    </div>
  );
}
