"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Cpu, Database, Network, ShieldCheck, Sparkles } from "lucide-react";

const STAGES = [
  { id: "ingest", label: "Ingesting Strategic Input", icon: Database, color: "text-primary" },
  { id: "neural", label: "Neural Pattern Matching", icon: BrainCircuit, color: "text-secondary" },
  { id: "synergy", label: "Evaluating Cross-Division Synergy", icon: Network, color: "text-tertiary" },
  { id: "optimize", label: "Optimizing ROI Projections", icon: Sparkles, color: "text-primary" },
  { id: "finalize", label: "Finalizing Synergy Blueprint", icon: ShieldCheck, color: "text-secondary" }
];

export default function ProcessingPage() {
  const router = useRouter();
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startAnalysis = async () => {
      const answers = sessionStorage.getItem("quiz_results");
      if (!answers) {
        router.push("/quiz");
        return;
      }

      // Stage progression logic
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 0.5;
        });
      }, 30);

      // Stage label logic
      const stageInterval = setInterval(() => {
        setCurrentStage(prev => {
          if (prev >= STAGES.length - 1) {
            clearInterval(stageInterval);
            return prev;
          }
          return prev + 1;
        });
      }, 1500);

      try {
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: JSON.parse(answers) }),
        });
        const analysis = await response.json();
        sessionStorage.setItem("ai_analysis", JSON.stringify(analysis));
        
        // Wait for animation to feel "earned"
        setTimeout(() => {
          router.push("/results");
        }, 8000);
      } catch (error) {
        console.error("Analysis failed", error);
      }

      return () => {
        clearInterval(interval);
        clearInterval(stageInterval);
      };
    };

    startAnalysis();
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
      
      {/* Neural Core Visualization */}
      <div className="relative w-80 h-80 mb-20">
        {/* Orbital Rings */}
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            animate={{ rotate: 360 * (ring % 2 === 0 ? 1 : -1) }}
            transition={{ duration: 10 + ring * 5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-primary/20"
            style={{ 
              margin: ring * 20,
              borderStyle: ring === 2 ? "dashed" : "solid"
            }}
          />
        ))}

        {/* Central Core */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              boxShadow: [
                "0 0 20px rgba(173,198,255,0.2)",
                "0 0 60px rgba(173,198,255,0.5)",
                "0 0 20px rgba(173,198,255,0.2)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-24 h-24 rounded-full bg-primary flex items-center justify-center z-10"
          >
            <BrainCircuit className="w-10 h-10 text-on-primary animate-pulse" />
          </motion.div>
        </div>

        {/* Data Particles */}
        {STAGES.map((stage, i) => {
          const angle = (i * (360 / STAGES.length)) * (Math.PI / 180);
          const x = Math.cos(angle) * 140;
          const y = Math.sin(angle) * 140;
          const isActive = i <= currentStage;

          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: isActive ? 1 : 0.3, 
                scale: isActive ? 1.2 : 0.8,
                x, y 
              }}
              className={`absolute top-[40%] left-[40%] w-12 h-12 rounded-xl flex items-center justify-center glass-card border-outline-variant/30 ${isActive ? 'bg-primary/20 border-primary/50 shadow-lg shadow-primary/20' : ''}`}
            >
              <stage.icon className={`w-5 h-5 ${isActive ? stage.color : 'text-on-surface-variant'}`} />
            </motion.div>
          );
        })}
      </div>

      {/* Progress & Status */}
      <div className="text-center relative z-20 max-w-md w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold font-display text-on-surface mb-2">
              {STAGES[currentStage].label}
            </h2>
            <div className="flex items-center justify-center gap-2 text-primary font-code text-xs tracking-widest uppercase">
              <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
              Processing Strategic Node_{STAGES[currentStage].id.toUpperCase()}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="space-y-3">
          <div className="flex justify-between text-[10px] font-bold font-code text-on-surface-variant tracking-tighter">
            <span>ANALYSIS PROGRESS</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden p-[2px]">
            <motion.div 
              animate={{ width: `${progress}%` }}
              className="h-full bg-primary rounded-full relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
            </motion.div>
          </div>
        </div>

        <div className="mt-12 text-on-surface-variant/40 text-[10px] font-code uppercase tracking-[0.3em]">
          Synthesizing Tata Ecosystem Synergies // Secure-Link-Active
        </div>
      </div>
    </div>
  );
}
