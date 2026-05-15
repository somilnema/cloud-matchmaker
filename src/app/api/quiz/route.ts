import { NextResponse } from "next/server";
import { getNextQuestion } from "@/lib/ai";

const FALLBACK_QUESTIONS = [
  {
    question: "What is your estimated annual budget for this strategic initiative?",
    options: [
      { label: "Under ₹10 Crores", value: "budget_low", desc: "Focusing on rapid, high-impact pilot projects and lean digital transformation initiatives across your enterprise." },
      { label: "₹10 - ₹100 Crores", value: "budget_mid", desc: "Scaling mid-to-large business units with dedicated IT frameworks and comprehensive supply chain optimizations." },
      { label: "Above ₹100 Crores", value: "budget_high", desc: "Full-scale global infrastructure overhaul requiring high-level strategic intervention from TCS and Tata Digital teams." },
      { label: "None of these / Something else", value: "custom", desc: "I'll describe my specific situation in my own words." }
    ]
  },
  {
    question: "Which industry vertical best describes your primary operations?",
    options: [
      { label: "Consumer & Retail", value: "vertical_retail", desc: "Optimizing for B2C engagement, customer loyalty, and multi-channel fulfillment through the Tata Neu ecosystem." },
      { label: "Manufacturing & Steel", value: "vertical_manufacturing", desc: "Focusing on industrial IoT, supply chain resilience, and global export excellence with Tata Steel expertise." },
      { label: "Energy & Utilities", value: "vertical_energy", desc: "Transitioning to sustainable power sources and smart grid management with Tata Power strategic solutions." },
      { label: "None of these / Something else", value: "custom", desc: "I'll describe my specific situation in my own words." }
    ]
  },
  {
    question: "What is the current size of your core technical workforce?",
    options: [
      { label: "Under 100 Employees", value: "size_small", desc: "Agile teams requiring low-touch managed services and high-velocity developer productivity tools." },
      { label: "100 - 1,000 Employees", value: "size_mid", desc: "Growing departments needing standardized governance, cloud migration, and centralized security frameworks." },
      { label: "1,000+ Employees", value: "size_large", desc: "Complex global organizations requiring enterprise-wide orchestration and deep consulting support from TCS." },
      { label: "None of these / Something else", value: "custom", desc: "I'll describe my specific situation in my own words." }
    ]
  },
  {
    question: "What is your organization's current digital maturity level?",
    options: [
      { label: "Legacy / Traditional", value: "maturity_legacy", desc: "Focusing on initial cloud migration and de-risking existing technical debt through phased modernization." },
      { label: "Digitally Optimized", value: "maturity_optimized", desc: "Leveraging data analytics and automated workflows to increase operational efficiency and market responsiveness." },
      { label: "Cloud Native / Innovative", value: "maturity_innovative", desc: "Pioneering AI-driven strategies and next-gen customer experiences using the latest Tata technology stacks." },
      { label: "None of these / Something else", value: "custom", desc: "I'll describe my specific situation in my own words." }
    ]
  },
  {
    question: "What is the single biggest pain point in your current operations?",
    options: [
      { label: "Operational Inefficiency", value: "pain_efficiency", desc: "High costs and slow processes that are hindering your ability to compete in a fast-moving market." },
      { label: "Slow Time-to-Market", value: "pain_speed", desc: "Delayed product launches and feature delivery cycles that are causing loss of market share to competitors." },
      { label: "Security & Risk Management", value: "pain_security", desc: "Vulnerability to data breaches and regulatory non-compliance in an increasingly complex global landscape." },
      { label: "None of these / Something else", value: "custom", desc: "I'll describe my specific situation in my own words." }
    ]
  }
];

export async function POST(req: Request) {
  try {
    const { answers } = await req.json();
    const nextQuestion = await getNextQuestion(Object.values(answers));
    
    if (!nextQuestion) {
      const index = Object.keys(answers).length % FALLBACK_QUESTIONS.length;
      return NextResponse.json(FALLBACK_QUESTIONS[index]);
    }

    return NextResponse.json(nextQuestion);
  } catch (error) {
    console.error("Quiz API Error:", error);
    return NextResponse.json({ error: "Failed to fetch question" }, { status: 500 });
  }
}
