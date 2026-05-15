"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Navbar, Footer } from "@/components/layout";
import { RealTimeAnalysis } from "@/components/analysis-sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2, CheckCircle2, Globe, Cpu, Zap, ShieldCheck, PencilLine, Volume2, VolumeX, Terminal } from "lucide-react";

const INITIAL_QUESTIONS = [
  {
    id: 1,
    question: "What is your primary business focus for the next 12 months?",
    reasoning: "Initializing ecosystem discovery and strategic intent profiling...",
    options: [
      { label: "Digital Transformation & IT Services", value: "tcs", icon: Cpu, desc: "Leveraging TCS Global expertise for scalable enterprise solutions." },
      { label: "Sustainable Energy & Power", value: "power", icon: Zap, desc: "Implementing green energy solutions via Tata Power." },
      { label: "Modern Mobility & Automotive", value: "motors", icon: Globe, desc: "Exploring EVs and advanced mobility with Tata Motors." },
      { label: "Consumer Health & E-commerce", value: "consumer", icon: ShieldCheck, desc: "Scaling digital consumer reach via Tata Neu and 1mg." },
      { label: "None of these / Something else", value: "custom", desc: "I'll describe my specific situation in my own words." }
    ]
  }
];

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [questions, setQuestions] = useState(INITIAL_QUESTIONS);
  const [isLoading, setIsLoading] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  
  // Custom input state
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customText, setCustomText] = useState("");

  const currentQuestion = questions[step];
  const progress = ((step + 1) / 10) * 100;

  // Voice Synthesis Function
  const speakQuestion = useCallback((text: string) => {
    if (isMuted) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.1;
    utterance.pitch = 0.9;
    window.speechSynthesis.speak(utterance);
  }, [isMuted]);

  useEffect(() => {
    if (!isLoading && !isFinishing) {
      speakQuestion(currentQuestion.question);
    }
  }, [step, isLoading, isFinishing, speakQuestion]);

  const handleAnswer = async (value: string) => {
    if (value === "custom" && !showCustomInput) {
      setShowCustomInput(true);
      return;
    }

    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);
    setShowCustomInput(false);
    setCustomText("");

    if (step < 9) {
      setIsLoading(true);
      try {
        const response = await fetch("/api/quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: newAnswers }),
        });
        const nextQuestionData = await response.json();
        
        const nextQuestion = {
          id: currentQuestion.id + 1,
          question: nextQuestionData.question,
          reasoning: nextQuestionData.reasoning || "Analyzing strategic patterns...",
          options: nextQuestionData.options.map((opt: any, idx: number) => ({
             ...opt,
             icon: [Globe, Zap, Cpu, ShieldCheck][idx % 4]
          }))
        };

        setQuestions(prev => [...prev, nextQuestion]);
        setStep(step + 1);
      } catch (error) {
        console.error("Failed to fetch next question", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsFinishing(true);
      sessionStorage.setItem("quiz_results", JSON.stringify(newAnswers));
      setTimeout(() => {
        router.push("/processing");
      }, 1500);
    }
  };

  const getGridCols = (count: number) => {
    const optionsWithoutCustom = currentQuestion.options.filter(o => o.value !== "custom");
    const num = optionsWithoutCustom.length;
    if (num === 2) return "md:grid-cols-2";
    if (num === 3) return "md:grid-cols-3";
    if (num === 4) return "md:grid-cols-2";
    return "md:grid-cols-2 lg:grid-cols-3";
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 px-6 md:px-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col items-center">
          {/* Progress Section */}
          <div className="w-full mb-12">
            <div className="flex justify-between items-end mb-4">
              <div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] font-code">
                  Strategic Assessment
                </span>
                <h2 className="text-2xl font-bold font-display text-on-surface mt-1">Ecosystem Alignment</h2>
              </div>
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-full hover:bg-surface-variant/30 transition-colors text-on-surface-variant hover:text-primary"
                  title={isMuted ? "Unmute AI Voice" : "Mute AI Voice"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <div className="text-[10px] font-bold text-on-surface-variant font-code">
                  QUESTION <span className="text-primary font-bold">{String(step + 1).padStart(2, '0')}</span> / 10
                </div>
              </div>
            </div>
            <div className="h-1 w-full bg-surface-container rounded-full overflow-hidden p-[1px]">
              <motion.div 
                animate={{ width: `${progress}%` }}
                className="h-full bg-primary relative shadow-[0_0_10px_rgba(173,198,255,0.5)] rounded-full"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </motion.div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!isFinishing ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full space-y-12"
              >
                <div className="mb-10">
                  {/* Neural Reasoning Ghost */}
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={`reasoning-${step}`}
                    className="flex items-center gap-2 mb-6"
                  >
                    <Terminal className="w-3 h-3 text-secondary animate-pulse" />
                    <span className="text-[10px] font-code text-secondary tracking-widest uppercase italic opacity-70">
                      {currentQuestion.reasoning}
                    </span>
                  </motion.div>
                  
                  <div className="h-1 w-12 bg-primary mb-6" />
                  <h1 className="text-xl md:text-3xl lg:text-4xl font-bold font-display text-on-surface leading-[1.3] break-words max-w-3xl">
                    {currentQuestion.question}
                  </h1>
                </div>

                {!showCustomInput ? (
                  <div className="w-full space-y-6">
                    <div className={`grid grid-cols-1 gap-6 w-full ${getGridCols(currentQuestion.options.length)}`}>
                      {currentQuestion.options.filter(o => o.value !== "custom").map((option: any, idx: number) => {
                        const Icon = option.icon || Globe;
                        return (
                          <motion.button
                            key={idx}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleAnswer(option.value)}
                            disabled={isLoading}
                            className="glass-card group p-8 text-left transition-all border-outline-variant/30 hover:border-primary/50 relative overflow-hidden flex flex-col gap-6"
                          >
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="flex justify-between items-start">
                                <div className="p-3 rounded bg-primary/10 border border-primary/20">
                                  <Icon className="w-6 h-6 text-primary" />
                                </div>
                                <span className="text-[10px] font-bold font-code text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                  NODE_{String(idx + 1).padStart(2, '0')}
                                </span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold font-display text-on-surface mb-2">{option.label}</h3>
                                <p className="text-on-surface-variant text-sm leading-relaxed">{option.desc}</p>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                    
                    {/* Custom Option Rendered Separately at Bottom */}
                    {currentQuestion.options.find(o => o.value === "custom") && (
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleAnswer("custom")}
                        className="w-full glass-card group p-6 text-left transition-all border-dashed border-outline-variant/50 hover:border-primary/40 flex items-center gap-6"
                      >
                         <div className="p-3 rounded bg-surface-variant/30 border border-outline-variant/30">
                            <PencilLine className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
                         </div>
                         <div className="flex-grow">
                            <h3 className="text-base font-bold font-display text-on-surface/80 group-hover:text-on-surface transition-colors">None of these / Something else</h3>
                            <p className="text-on-surface-variant text-xs italic">I'll describe my specific situation in my own words.</p>
                         </div>
                         <ChevronRight className="w-5 h-5 text-outline-variant group-hover:text-primary transition-colors" />
                      </motion.button>
                    )}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full glass-card p-10 border-primary/30 space-y-6"
                  >
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold font-display text-primary">Custom Input</h3>
                      <p className="text-on-surface-variant text-sm">Please describe your specific business situation or requirement.</p>
                    </div>
                    <textarea
                      autoFocus
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      placeholder="Describe your specific situation..."
                      className="w-full h-40 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-4 text-on-surface focus:outline-none focus:border-primary/50 transition-colors resize-none font-body text-base"
                    />
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button 
                        onClick={() => handleAnswer(customText)}
                        disabled={!customText.trim()}
                        className="flex-grow px-8 py-4 bg-primary text-on-primary font-bold rounded-xl hover:shadow-lg disabled:opacity-50 transition-all"
                      >
                        Submit & Continue
                      </button>
                      <button 
                        onClick={() => { setShowCustomInput(false); setCustomText(""); }}
                        className="px-8 py-4 border border-outline-variant text-on-surface-variant hover:text-on-surface transition-all rounded-xl"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                )}

                {isLoading && (
                  <div className="flex items-center justify-center gap-3 text-on-surface-variant">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    <span className="text-xs font-code tracking-widest uppercase">Syncing Neural Core...</span>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20 space-y-6"
              >
                <div className="w-20 h-20 bg-secondary/10 border border-secondary/30 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="w-10 h-10 text-secondary" />
                </div>
                <h2 className="text-3xl font-bold font-display">Strategic Profiling Complete</h2>
                <p className="text-on-surface-variant max-w-md mx-auto">
                  All strategic parameters have been captured. Moving to the neural analysis engine for ecosystem matching.
                </p>
                <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto mt-8" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-12 flex items-center gap-6 w-full">
            <button 
              onClick={() => step > 0 && setStep(step - 1)}
              disabled={step === 0 || isLoading || isFinishing || showCustomInput}
              className="px-8 py-4 border border-outline-variant hover:border-on-surface transition-all rounded font-semibold text-on-surface flex items-center gap-2 disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm">Previous Question</span>
            </button>
            <div className="flex-grow" />
            <div className="text-[10px] text-on-surface-variant font-code uppercase hidden sm:block">
              Secure Strategic Node: TATA-HQ-01
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <RealTimeAnalysis answers={answers} />
      </main>

      <Footer />
    </div>
  );
}
