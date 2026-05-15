"use client";

import React, { useState, useEffect } from "react";
import { Navbar, Footer } from "@/components/layout";
import { motion } from "framer-motion";
import { Sparkles, FileText, ArrowRight, BarChart3, BrainCircuit, Download, Users, Share2, Network } from "lucide-react";

export default function ResultsPage() {
  const [answers, setAnswers] = useState<any>(null);
  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {
    const savedAnswers = sessionStorage.getItem("quiz_results");
    const savedAnalysis = sessionStorage.getItem("ai_analysis");
    if (savedAnswers) setAnswers(JSON.parse(savedAnswers));
    if (savedAnalysis) setAnalysis(JSON.parse(savedAnalysis));
  }, []);

  const primaryRec = analysis?.primary_recommendation || {
    name: "TCS Digital Transformation Suite",
    score: "98.4%",
    cost_gain: "+22% ROI",
    latency_gain: "3x Velocity",
    link: "https://www.tcs.com",
    reasoning: "Your requirement for large-scale enterprise modernization and global service delivery makes the TCS Digital Transformation Suite the optimal match. It provides the necessary orchestration for your complex business units while ensuring Tata-grade security and operational excellence."
  };

  const secondaryRecs = analysis?.secondary_recommendations || [
    { name: "Tata Neu Enterprise", score: "94%", desc: "Integrated consumer data platform for unified customer experiences.", icon: "BarChart3", color: "primary", featured: "CONSUMER INSIGHTS", link: "https://www.tataneu.com" },
    { name: "Tata Power Green Solutions", score: "89%", desc: "Sustainable energy infrastructure and smart grid management.", icon: "BrainCircuit", color: "tertiary", featured: "ESG OPTIMIZATION", link: "https://www.tatapower.com" }
  ];

  const benchmarks = analysis?.benchmarks || [
    { metric: "Strategic Alignment Score", legacy: "Low", blueprint: "High", gain: "Cross-Division", gainColor: "text-secondary" },
    { metric: "Digital Maturity Uplift", legacy: "42%", blueprint: "88%", gain: "+46% Growth", gainColor: "text-secondary" },
    { metric: "Cross-Division Synergy", legacy: "Siloed", blueprint: "Unified", gain: "Full Integration", gainColor: "text-secondary" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-6 md:px-20 max-w-7xl mx-auto w-full">
        {/* Header */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-[10px] font-bold text-secondary tracking-[0.3em] uppercase font-code">
              Strategic Report // 2024-TATA
            </span>
            <div className="h-px flex-1 bg-outline-variant/30"></div>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold font-display mb-4 text-on-surface"
          >
            Your Tata Synergy Blueprint
          </motion.h1>
          <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Based on your strategic requirements for digital modernization, consumer reach, and sustainable growth, we have synthesized the following ecosystem path.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Top Recommendation: Hero Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="glass-card outer-bloom-primary rounded-2xl overflow-hidden relative group border-primary/20"
            >
              <div className="absolute inset-0 scanner-gradient opacity-20 pointer-events-none" />
              <div className="flex flex-col md:flex-row">
                <div className="md:w-3/5 p-8 md:p-12 relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/20 border border-primary/30 mb-8">
                    <Sparkles className="w-4 h-4 text-primary" fill="currentColor" />
                    <span className="text-[10px] font-bold text-primary font-code uppercase tracking-wider">
                      STRATEGIC MATCH: HIGHEST COMPATIBILITY
                    </span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold font-display text-on-surface mb-6">
                    {primaryRec.name}
                  </h2>
                  
                  <p className="text-on-surface-variant mb-10 leading-relaxed text-sm md:text-base">
                    {primaryRec.reasoning}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mt-10 no-print">
                    <button 
                      onClick={() => window.print()}
                      className="px-8 py-4 bg-primary text-on-primary font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3 shadow-lg shadow-primary/20"
                    >
                      <Download className="w-5 h-5" />
                      Download Strategic Plan
                    </button>
                    <a 
                      href={primaryRec.link || `https://www.google.com/search?q=${encodeURIComponent((primaryRec.name || "Tata Group") + " official website")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-4 border border-outline text-on-surface font-bold rounded-xl hover:bg-surface-bright/20 transition-all flex items-center gap-2"
                    >
                      Explore {primaryRec.name || "Service"}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="md:w-2/5 min-h-[300px] relative overflow-hidden bg-surface-container-highest">
                  <img 
                    alt="Tata Group Synergy Visualization" 
                    className="w-full h-full object-cover mix-blend-luminosity opacity-40 group-hover:scale-105 transition-transform duration-1000" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgKUEMSJOcR1E9sDbXHFdvg9-8u1mOWpmPJ2FcM25wiC2KKJVgTJQeFpNyC0dNUaVStZxhDkQqXMshkarJXZKFDc53COUmajklnThKPouoA8SY4wBFbeY9MjkGoH7_hVdtOs_iorS8P1wnWJOB211iv5TPepIiNt32b5sPXuokF4s1XlkMVPPCuzggcLXS9-0oI4LOJxw8p78MAA9Jo8i402I8KP3ZLeGkYnvSUaL-NNDadMHHG7hS8iVBNNgTRf9Wo96G_UqtluU"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-surface via-transparent to-transparent hidden md:block"></div>
                </div>
              </div>
            </motion.div>

            {/* Metrics Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "STRATEGIC MATCH", value: primaryRec.score, color: "text-primary" },
                { label: "BUSINESS IMPACT", value: primaryRec.cost_gain, color: "text-secondary" },
                { label: "GROWTH VELOCITY", value: primaryRec.latency_gain, color: "text-tertiary" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="glass-card p-8 rounded-2xl border-outline-variant/30 flex flex-col justify-between min-h-[160px]"
                >
                  <span className="text-[10px] font-bold text-on-surface-variant font-code tracking-widest uppercase mb-4">{item.label}</span>
                  <h4 className={`text-2xl font-bold font-display leading-tight break-words ${item.color}`}>
                    {item.value}
                  </h4>
                </motion.div>
              ))}
            </section>
          </div>

          {/* Synergy Map Sidebar */}
          <div className="lg:col-span-4">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-card p-8 rounded-2xl border-secondary/20 h-full sticky top-32"
            >
              <div className="flex items-center gap-3 mb-8">
                <Network className="w-5 h-5 text-secondary" />
                <h3 className="text-xs font-bold font-code uppercase tracking-widest">Neural Synergy Map</h3>
              </div>
              
              <div className="relative aspect-square mb-8">
                {/* SVG Visualizer */}
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <motion.circle 
                    cx="100" cy="100" r="40" 
                    fill="none" stroke="currentColor" 
                    className="text-primary opacity-20" strokeWidth="0.5"
                    animate={{ r: [35, 45, 35] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <circle cx="100" cy="100" r="4" className="fill-primary animate-pulse" />
                  
                  {/* Connection Lines */}
                  {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                    const x = 100 + Math.cos(angle * Math.PI / 180) * 70;
                    const y = 100 + Math.sin(angle * Math.PI / 180) * 70;
                    return (
                      <g key={i}>
                        <motion.line 
                          x1="100" y1="100" x2={x} y2={y} 
                          stroke="currentColor" className="text-primary opacity-20" 
                          strokeWidth="1"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 1 + i * 0.1, duration: 1 }}
                        />
                        <circle cx={x} cy={y} r="3" className="fill-secondary/60" />
                        <text x={x+8} y={y+4} className="text-[6px] fill-on-surface-variant font-code opacity-60">NODE_{i+1}</text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-surface-container-high/50 border border-outline-variant/20">
                  <div className="text-[10px] font-bold text-secondary font-code uppercase mb-1">Core Synergy</div>
                  <div className="text-sm font-bold text-on-surface">Integrated Enterprise Stack</div>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-high/50 border border-outline-variant/20">
                  <div className="text-[10px] font-bold text-primary font-code uppercase mb-1">Scale Index</div>
                  <div className="text-sm font-bold text-on-surface">Tier-1 Global Distribution</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Categories: Secondary Recommendations Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {secondaryRecs.map((rec: any, idx: number) => {
            const Icon = rec.icon === "BarChart3" ? BarChart3 : BrainCircuit;
            const colorClass = rec.color === "tertiary" ? "hover:border-tertiary/50" : "hover:border-primary/50";
            const iconBgClass = rec.color === "tertiary" ? "bg-tertiary-container/20 border-tertiary/30" : "bg-secondary-container/20 border-secondary/30";
            const iconColorClass = rec.color === "tertiary" ? "text-tertiary" : "text-secondary";

            return (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className={`glass-card rounded-2xl p-10 flex flex-col justify-between transition-colors group border-outline-variant/30 ${colorClass}`}
              >
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center border ${iconBgClass}`}>
                      <Icon className={`w-8 h-8 ${iconColorClass}`} />
                    </div>
                    <span className="text-[10px] font-bold text-on-surface-variant bg-surface-variant px-3 py-1.5 rounded-full font-code">MATCH: {rec.score}</span>
                  </div>
                  <h3 className="text-2xl font-bold font-display text-on-surface mb-3">{rec.name}</h3>
                  <p className="text-on-surface-variant mb-10 leading-relaxed">{rec.desc}</p>
                </div>
                <div className="flex items-center gap-4 pt-6 border-t border-outline-variant/20">
                  <a 
                    href={rec.link || `https://www.google.com/search?q=${encodeURIComponent(rec.name + " official website")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-[10px] font-bold font-code tracking-wider hover:underline flex items-center gap-2 ${iconColorClass}`}
                  >
                    EXPLORE SERVICE <ArrowRight className="w-3 h-3" />
                  </a>
                  <ArrowRight className="w-5 h-5 text-on-surface-variant ms-auto group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </section>

        {/* Details: Cost & Performance */}
        <section className="mb-12 no-print">
          <h4 className="text-[10px] font-bold text-on-surface-variant mb-6 tracking-[0.3em] uppercase font-code">Strategic Benchmark Comparison</h4>
          <div className="glass-card rounded-2xl overflow-hidden border-outline-variant/30">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-high/50">
                    <th className="p-8 text-[10px] font-bold text-on-surface-variant border-b border-outline-variant/30 font-code">METRIC</th>
                    <th className="p-8 text-[10px] font-bold text-on-surface-variant border-b border-outline-variant/30 font-code">LEGACY MODEL (EST.)</th>
                    <th className="p-8 text-[10px] font-bold text-primary border-b border-outline-variant/30 font-code">TATA SYNERGY BLUEPRINT</th>
                    <th className="p-8 text-[10px] font-bold text-secondary border-b border-outline-variant/30 font-code">PRECISION GAIN</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-code">
                  {benchmarks.map((row: any, i: number) => (
                    <tr key={i} className="border-b border-outline-variant/10 hover:bg-white/5 transition-colors">
                      <td className="p-8 text-on-surface font-body font-semibold">{row.metric}</td>
                      <td className="p-8 text-on-surface-variant">{row.legacy}</td>
                      <td className="p-8 text-primary font-bold">{row.blueprint}</td>
                      <td className={`p-8 font-bold ${row.gainColor}`}>{row.gain}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA Cluster */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-12 p-12 glass-card rounded-2xl border-primary/20 bg-gradient-to-br from-primary/5 to-transparent relative overflow-hidden no-print">
          <div className="absolute inset-0 bg-primary/5 blur-3xl -z-10" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold font-display text-on-surface mb-3">Ready to transform your enterprise?</h2>
            <p className="text-on-surface-variant">Download the full strategic synergy roadmap and implementation plan.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto relative z-10">
            <button 
              onClick={() => {
                sessionStorage.removeItem("quiz_results");
                sessionStorage.removeItem("ai_analysis");
                window.location.href = "/quiz";
              }}
              className="px-10 py-5 bg-primary text-on-primary font-bold rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all"
            >
              Start New Assessment
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
