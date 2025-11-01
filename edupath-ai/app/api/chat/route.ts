import { NextRequest, NextResponse } from "next/server";

// System instruction for Google Gemini - focused on subject guidance, career guidance, and mental health in Ghana
const SYSTEM_INSTRUCTION = `You are EduPath AI, a specialized guidance counselor for Junior High School (JHS) students in Ghana. Your expertise focuses on three key areas:

1. SUBJECT GUIDANCE:
   - Help students choose appropriate subjects for Senior High School (SHS)
   - Explain the Ghanaian education system (JHS → SHS → Tertiary)
   - Guide on General Arts, General Science, Business, Visual Arts, Home Economics, Technical, and Agricultural Science tracks
   - Provide advice on subject combinations and their career pathways
   - Understand the WASSCE (West African Senior School Certificate Examination) requirements

2. CAREER GUIDANCE:
   - Provide career advice relevant to the Ghanaian job market
   - Help students understand career paths in technology, healthcare, education, business, engineering, and other fields
   - Explain educational requirements for various careers (SHS → University/Polytechnic/College)
   - Discuss salary ranges in Ghanaian Cedis (GHS)
   - Address career opportunities both within Ghana and abroad
   - Connect subjects to potential careers

3. MENTAL HEALTH SUPPORT (Ghana Context):
   - Provide emotional support and guidance for students facing academic stress
   - Address concerns about career choices, academic pressure, and future uncertainty
   - Offer coping strategies for exam anxiety, especially for BECE (Basic Education Certificate Examination) and WASSCE
   - Discuss mental health resources available in Ghana
   - Be empathetic, supportive, and culturally sensitive
   - For serious mental health issues, encourage seeking professional help from:
     * Mental Health Authority of Ghana
     * School counselors
     * Mental health hotlines in Ghana
     * Community health centers

IMPORTANT GUIDELINES:
- Always respond in a warm, encouraging, and culturally appropriate manner
- Be specific to Ghana's education system and job market
- Use Ghanaian contexts, institutions, and examples when relevant
- If asked about topics outside your expertise, politely redirect to your three focus areas
- For emergency mental health situations, provide appropriate crisis resources
- Keep responses clear, age-appropriate for JHS students, and actionable
- Be positive and empowering while realistic about challenges`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    // Validate that we have messages
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Get API key from environment variables
    const apiKey = process.env.GOOGLE_AI_API_KEY;

    if (!apiKey) {
      console.error("GOOGLE_AI_API_KEY is not set in environment variables");
      return NextResponse.json(
        {
          error: "API configuration error",
          message:
            "The AI service is not properly configured. Please contact support.",
        },
        { status: 500 }
      );
    }

    // Get model from environment or use default
    // Map common model names to working ones
    const modelMap: { [key: string]: string } = {
      "gemini-1.5-flash": "gemini-pro", // Flash not available, fallback to pro
      "gemini-2.5-flash": "gemini-pro", // Flash not available, fallback to pro
      "gemini-2.0-flash-exp": "gemini-pro", // Experimental, fallback to pro
    };

    let preferredModel = process.env.GOOGLE_AI_MODEL || "gemini-pro";
    // If user specified a model that needs mapping, use the mapped version
    if (modelMap[preferredModel]) {
      console.warn(
        `Model "${preferredModel}" is not available. Using "${modelMap[preferredModel]}" instead.`
      );
      preferredModel = modelMap[preferredModel];
    }
    const model = preferredModel;

    // Format messages for Google Gemini API
    // Gemini uses a different format - we need to convert to parts array
    const contents: any[] = [];

    // Convert messages to Gemini format
    for (const msg of messages) {
      if (msg.sender === "user") {
        contents.push({
          role: "user",
          parts: [{ text: msg.text }],
        });
      } else {
        contents.push({
          role: "model",
          parts: [{ text: msg.text }],
        });
      }
    }

    // Call Google Gemini API
    // Try v1 first (works for gemini-pro), then v1beta for newer models
    let apiVersion = "v1";
    // Use v1beta for models that have version numbers (1.5, 2.0, 2.5, etc.)
    if (
      model.includes("1.5") ||
      model.includes("2.0") ||
      model.includes("2.5")
    ) {
      apiVersion = "v1beta";
    }

    const apiUrl = `https://generativelanguage.googleapis.com/${apiVersion}/models/${model}:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        apiVersion === "v1beta"
          ? {
              // v1beta supports systemInstruction
              contents: contents,
              systemInstruction: {
                parts: [{ text: SYSTEM_INSTRUCTION }],
              },
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1000,
              },
              safetySettings: [
                {
                  category: "HARM_CATEGORY_HARASSMENT",
                  threshold: "BLOCK_MEDIUM_AND_ABOVE",
                },
                {
                  category: "HARM_CATEGORY_HATE_SPEECH",
                  threshold: "BLOCK_MEDIUM_AND_ABOVE",
                },
                {
                  category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                  threshold: "BLOCK_MEDIUM_AND_ABOVE",
                },
                {
                  category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                  threshold: "BLOCK_ONLY_HIGH",
                },
              ],
            }
          : {
              // v1 doesn't support systemInstruction, prepend to first message
              contents:
                contents.length > 0
                  ? [
                      {
                        role: "user",
                        parts: [
                          {
                            text: `${SYSTEM_INSTRUCTION}\n\nUser: ${
                              contents[0]?.parts[0]?.text || ""
                            }`,
                          },
                        ],
                      },
                      ...contents.slice(1),
                    ]
                  : [
                      {
                        role: "user",
                        parts: [{ text: SYSTEM_INSTRUCTION }],
                      },
                    ],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1000,
              },
              safetySettings: [
                {
                  category: "HARM_CATEGORY_HARASSMENT",
                  threshold: "BLOCK_MEDIUM_AND_ABOVE",
                },
                {
                  category: "HARM_CATEGORY_HATE_SPEECH",
                  threshold: "BLOCK_MEDIUM_AND_ABOVE",
                },
                {
                  category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                  threshold: "BLOCK_MEDIUM_AND_ABOVE",
                },
                {
                  category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                  threshold: "BLOCK_ONLY_HIGH",
                },
              ],
            }
      ),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Google AI API error:", errorData);

      // Extract more detailed error message
      let errorMessage =
        errorData?.error?.message ||
        errorData?.message ||
        `API returned status ${response.status}`;

      // If model not found (404), suggest fallback models
      if (response.status === 404) {
        errorMessage = `Model "${model}" not found for API version ${apiVersion}. 

Available working models:
- "gemini-pro" (recommended, uses v1 API)
- "gemini-1.5-pro-latest" (uses v1beta API)

To fix this, check your .env.local file and update GOOGLE_AI_MODEL to one of the models above, or remove the variable to use the default "gemini-pro".`;
      }

      return NextResponse.json(
        {
          error: "AI service error",
          message: errorMessage,
          details: errorData,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Extract the assistant's response from Gemini format
    const assistantMessage = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!assistantMessage) {
      console.error("Unexpected API response format:", data);
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}
