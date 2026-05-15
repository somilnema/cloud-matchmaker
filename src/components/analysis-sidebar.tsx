"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

export const RealTimeAnalysis = ({ answers = {} }: { answers?: Record<string, any> }) => {
  const [logs, setLogs] = useState([
    { time: "12:04:22", text: "Initializing strategic crawler...", type: "info" },
  ]);

  const answerValues = Object.values(answers);
  const count = answerValues.length;

  useEffect(() => {
    if (count > 0) {
      const lastAnswer = answerValues[count - 1];
      const time = new Date().toLocaleTimeString([], { hour12: false });
      
      setLogs(prev => [
        ...prev.slice(-4), 
        { time, text: `Analyzing selection: [${String(lastAnswer).toUpperCase().slice(0, 20)}]`, type: "primary" }
      ]);
    }
  }, [count]);

  const strategicInsight = useMemo(() => {
    if (count <= 2) return "Gathering initial data. Profiling your strategic intent...";
    
    if (count <= 5) {
      // Top 2 divisions being considered (mock logic based on common values)
      const divisions = ["TCS", "Tata Motors", "Tata Steel", "Tata Power", "Tata Digital"];
      const match1 = divisions[count % divisions.length];
      const match2 = divisions[(count + 1) % divisions.length];
      return `Current considerations: High-affinity synergy between ${match1} and ${match2}.`;
    }
    
    if (count <= 9) {
      const confidence = 65 + (count - 6) * 4;
      const predictions = ["TCS Global Transformation", "Tata Motors EV Fleet", "Tata Neu Enterprise", "Tata Power Green Grid"];
      const prediction = predictions[count % predictions.length];
      return `Predicted match: ${prediction} (${confidence}% confidence and increasing).`;
    }

    return "Finalizing neural architectural blueprint...";
  }, [count]);

  return (
    <aside className="lg:col-span-4 flex flex-col gap-6">
      <div className="glass-card p-6 border-primary/20 sticky top-32">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_rgba(109,221,129,0.5)] animate-pulse"></div>
          <h4 className="text-[10px] font-bold tracking-[0.2em] text-on-surface font-code uppercase">REAL-TIME ANALYSIS</h4>
        </div>
        
        {/* Terminal Component */}
        <div className="bg-surface-container-lowest p-4 rounded border border-outline-variant/30 font-code text-xs text-secondary/80 flex flex-col gap-2 min-h-[160px]">
          {logs.map((log, i) => (
            <div key={i} className="flex gap-2">
              <span className="text-outline opacity-50">{log.time}</span>
              <span className={log.type === "primary" ? "text-primary" : ""}>{log.text}</span>
            </div>
          ))}
          <div className="flex gap-2">
            <span className="text-outline opacity-50">{new Date().toLocaleTimeString([], { hour12: false })}</span>
            <span className="text-on-surface italic animate-pulse">Waiting for input...</span>
          </div>
        </div>

        {/* Insights Visualizer */}
        <div className="mt-8 space-y-6">
          <div>
            <div className="flex justify-between text-[10px] font-bold font-code mb-2">
              <span>MATCH PROBABILITY</span>
              <span className="text-secondary">{Math.max(40, count * 6 + 24).toFixed(1)}%</span>
            </div>
            <div className="h-1 bg-surface-variant rounded-full overflow-hidden">
              <motion.div 
                animate={{ width: `${Math.max(40, count * 6 + 24)}%` }}
                className="h-full bg-secondary"
              />
            </div>
          </div>
          
          <div className="p-4 rounded bg-surface-bright/20 border border-outline-variant/20">
            <h5 className="text-[10px] font-bold text-primary mb-2 font-code uppercase">STRATEGIC INSIGHT</h5>
            <p className="text-sm text-on-surface-variant leading-relaxed min-h-[60px]">
              {strategicInsight}
            </p>
          </div>
          
          <div className="relative h-48 rounded overflow-hidden border border-outline-variant/30">
            <img 
              className="w-full h-full object-cover opacity-60" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYUAX2r2WCFjhCEE5_8NTNANC30_fUdYW6Y6ny2_AN5cT3WPpedHdliQpGUQ1wIbdqltZAR24rZFK_ALbO-IHCw7iMR6g2qFTYjqm3ufxs8FK1alq0WgfaJl_CAz6EOP90RrBqayQjo7VqW6T-fjui5P2jGkeqYO0R-nkJGgSXBT0OS4tIlmFS3_kD59C-G6p25aUZCM9heVvXBbmAPiyKaustKxJLNxlffXlG4TAX-4th-mOdHSLTAAJ44IsSE2Qclob4cQpuMq4"
              alt="Data Visualization"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
          </div>
        </div>
      </div>
    </aside>
  );
};
