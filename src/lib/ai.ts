function parseAIResponse(content: string) {
  try {
    const cleanContent = content.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleanContent);
  } catch (e) {
    console.error("Failed to parse AI response", content);
    return null;
  }
}

export async function getNextQuestion(previousAnswers: any[]) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return null;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://cloud-matchmaker.vercel.app",
        "X-Title": "Cloud Matchmaker",
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-001",
        messages: [
          {
            role: "system",
            content: `You are a Tata Group Strategy Consultant AI. Your job is to ask highly specific, business-relevant questions that progressively narrow down the single best Tata Group offering for this user.

Rules:
- Questions must be concrete and specific (e.g. "What is your annual IT budget range?" not "What is your budget?")
- Each option must be clearly distinct and mutually exclusive — no vague overlaps
- Options must have a specific \`label\` (max 6 words), a \`value\` (snake_case), and a \`desc\` of exactly 15-20 words explaining what choosing this implies about the user's business
- You may return 3, 4, 5, or 6 options depending on what makes sense — do NOT force exactly 4
- Always include one option: { "label": "None of these / Something else", "value": "custom", "desc": "I'll describe my specific situation in my own words." }
- Base the question on the full history of previous answers to avoid repetition and increase precision
- Return ONLY valid JSON: { "question": string, "reasoning": string (max 12 words), "options": [ { "label": string, "value": string, "desc": string } ] }`
          },
          {
            role: "user",
            content: `Previous answers: ${JSON.stringify(previousAnswers)}`
          }
        ],
        response_format: { type: "json_object" }
      }),
    });

    const data = await response.json();
    return parseAIResponse(data.choices[0].message.content);
  } catch (error) {
    console.error("AI Question Error:", error);
    return null;
  }
}

export async function analyzeResults(allAnswers: any) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return null;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-001",
        messages: [
          {
            role: "system",
            content: "You are an expert Tata Group Strategy Consultant. Analyze the following user business requirements and recommend the optimal synergy across the Tata ecosystem. Return ONLY a JSON object with this EXACT structure: { \"primary_recommendation\": { \"name\": string, \"score\": string, \"cost_gain\": string (max 20 chars), \"latency_gain\": string (max 20 chars), \"reasoning\": string (max 40 words), \"link\": string }, \"secondary_recommendations\": [ { \"name\": string, \"score\": string, \"desc\": string (max 20 words), \"icon\": \"BarChart3\" | \"BrainCircuit\", \"color\": \"primary\" | \"tertiary\", \"featured\": string (max 20 chars), \"link\": string } ], \"benchmarks\": [ { \"metric\": string, \"legacy\": string, \"blueprint\": string, \"gain\": string, \"gainColor\": \"text-secondary\" | \"text-tertiary\" } ] }. Ensure reasoning is professional and focuses on Tata's competitive advantages."
          },
          {
            role: "user",
            content: `User requirements: ${JSON.stringify(allAnswers)}`
          }
        ],
        response_format: { type: "json_object" }
      }),
    });

    const data = await response.json();
    return parseAIResponse(data.choices[0].message.content);
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return null;
  }
}
