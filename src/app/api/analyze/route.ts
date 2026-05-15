import { NextResponse } from "next/server";
import { analyzeResults } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const { answers } = await req.json();
    
    // Attempt real AI analysis
    const analysis = await analyzeResults(answers);
    
    if (analysis) {
      return NextResponse.json(analysis);
    }

    // Dynamic Fallback Logic (if AI is unavailable)
    // We check the first answer (ID 1) to determine the "vibe"
    const primaryGoal = answers["1"] || "scalability";
    
    let recommendation = {
      primary_recommendation: {
        name: "Google Kubernetes Engine (GKE)",
        score: "98.4%",
        cost_gain: "+22%",
        latency_gain: "-45ms",
        reasoning: "GKE was selected as your core compute engine due to your \"Rapid Global Scaling\" priority. The Autopilot mode aligns with your goal of minimizing operational overhead."
      },
      secondary_recommendations: [
        { name: "BigQuery", score: "94%", desc: "Optimized for your data ingestion requirement." },
        { name: "Vertex AI", score: "89%", desc: "Seamlessly integrates with GKE for training models." }
      ]
    };

    if (primaryGoal === "cost") {
      recommendation.primary_recommendation = {
        name: "Cloud Run",
        score: "96.8%",
        cost_gain: "+42%",
        latency_gain: "-20ms",
        reasoning: "Cloud Run was selected to maximize cost efficiency. Its scale-to-zero capability ensures you only pay for compute during active request handling."
      };
    } else if (primaryGoal === "security") {
      recommendation.primary_recommendation = {
        name: "Confidential Computing",
        score: "99.1%",
        cost_gain: "+12%",
        latency_gain: "-5ms",
        reasoning: "Confidential VMs were selected to ensure data is encrypted even while in use, matching your high-security and compliance requirements."
      };
    } else if (primaryGoal === "productivity") {
      recommendation.primary_recommendation = {
        name: "App Engine",
        score: "95.5%",
        cost_gain: "+18%",
        latency_gain: "-15ms",
        reasoning: "App Engine was selected to prioritize developer velocity. Its fully managed platform allows your team to focus on code without managing infrastructure."
      };
    }

    return NextResponse.json(recommendation);
  } catch (error) {
    console.error("Analysis API Error:", error);
    return NextResponse.json({ error: "Failed to analyze" }, { status: 500 });
  }
}
