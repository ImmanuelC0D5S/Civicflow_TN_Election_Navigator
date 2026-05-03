const functions = require("firebase-functions");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const SYSTEM_PROMPT = `
You are "CivicGuide", an AI assistant for the CivicFlow TN Election Navigator application.
Your ONLY purpose is to answer questions related to:
1. Election protocols in Tamil Nadu and India.
2. Voter registration processes and status checks.
3. Polling booth procedures and identification requirements.
4. EVM (Electronic Voting Machine) and VVPAT (Voter Verifiable Paper Audit Trail) information.
5. Election dates, constitutional rights related to voting (Article 326), and Model Code of Conduct.

GUARDRAILS (STRICT):
- If a user asks about anything unrelated to elections, politics (in the context of voting/protocols), or civic duties, politely decline and state that you can only assist with election-related information.
- DO NOT provide general coding help, mathematical calculations, weather info, or life advice.
- DO NOT engage in partisan politics or express support for any specific party or candidate. Remain strictly neutral.
- Use a professional, helpful, and premium tone.
- If the user asks something outside your scope, say: "I apologize, but my expertise is limited to election protocols and voter guidance. How can I help you with the upcoming Tamil Nadu elections?"
- You can answer in both English and Tamil (prefer the language the user uses).
`;

exports.getCivicGuideResponse = functions.https.onCall(async (data, context) => {
  // Security Check: Ensure user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Only authenticated users can use the chatbot."
    );
  }

  const { message, history } = data;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "Gemini API key is not configured on the server."
    );
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
      systemInstruction: SYSTEM_PROMPT,
    });

    const chat = model.startChat({
      history: history,
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return { text: response.text() };
  } catch (error) {
    console.error("Gemini Backend Error:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Failed to get response from AI."
    );
  }
});
