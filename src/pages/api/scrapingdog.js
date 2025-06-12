import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {  // if the HTTP method not POST, run code below
    return res.status(405).json({ error: "Method not allowed" });
  }
   // destructure the body of the request
  const { color = '', material = '', containerType = '', brand = '' } = req.body;
  // Build a more complete query string
  const query = `${color} ${material} ${containerType} ${brand} ${keyword} organizing bin`.trim();
  console.log('Query sent to Scrapingdog:', query);

  try {  // try to fetch data from Scrapingdog
    const response = await axios.get("https://api.scrapingdog.com/google_shopping", {
      params: {
        api_key: process.env.SCRAPINGDOG_API_KEY,
        query: query,
      },
    });
  
    console.log('Scrapingdog raw response:', JSON.stringify(response.data));
    res.status(200).json(response.data);
  } catch (error) {  // catch any errors
    console.error("Error fetching from Scrapingdog:", error.message);
    res.status(500).json({ error: "Failed to fetch shopping results" });
  }
}
