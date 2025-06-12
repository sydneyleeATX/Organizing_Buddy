// Gemini API proxy route for Next.js
// Usage: POST { messages: [ ... ] } to this endpoint
// DO NOT expose your Gemini API key in client code!
/* 
1) User types a message in your chat UI.
2) Frontend sends the message to /api/gemini (your backend route).
3) /api/gemini adds your API key, sends the message to Gemini, gets the response.
4) /api/gemini returns the AI’s response to your frontend.
5) Frontend displays the reply in the chat window.
*/

export default async function handler(req, res) {
  if (req.method !== 'POST') {  // if the HTTP method not POST, run code below
    res.setHeader('Allow', ['POST']);  // tell client that only POST method is allowed
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY; // Obtain API key from environment variable
  if (!apiKey) {
    return res.status(500).json({ message: 'Gemini API key not configured.' });
  }

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ message: 'Missing or invalid messages array.' });
  }

  // Gemini expects a single prompt string or a conversation array
  // We'll join user/assistant turns into a format Gemini understands
  // For Gemini Pro: https://ai.google.dev/api/rest/v1beta/models/gemini-pro:generateContent
  // Most Google AI Studio API keys support gemini-1.5-flash-latest by default.
  // If you get a model not found error, try switching to gemini-1.5-pro-latest or check your AI Studio dashboard.
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' + apiKey;
  // arrow function that maps over messages array, returns text of user messages
  // checks if sender is user, if so, returns text, otherwise returns empty string
  const prompt = messages.map(m => m.sender === 'user' ? m.text : '').filter(Boolean).join('\n');

  try {
    const geminiRes = await fetch(url, {  // sends an HTTP POST request to the Gemini API, generates response object
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    const data = await geminiRes.json();  // converts response object to JSON
    console.log('[Gemini API] Full response:', JSON.stringify(data, null, 2));
    // Extract the model's reply
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';
    res.status(200).json({ reply });
  } catch (err) {
    res.status(500).json({ message: 'Error communicating with Gemini API.', error: err.message });
  }
}
