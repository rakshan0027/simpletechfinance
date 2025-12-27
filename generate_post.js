const fs = require("fs");
const fetch = require("node-fetch");

const API_KEY = process.env.GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

async function generate(category) {
  const prompt = `
Generate ONE blog post as VALID JSON ONLY.

Category: ${category}

Rules:
- Beginner friendly
- Simple English
- Include fields:
  title,
  category,
  date (YYYY-MM-DD),
  summary,
  content (HTML using h2 and p)

Return ONLY JSON. No markdown. No explanation.
`;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  const data = await res.json();

  if (
    !data.candidates ||
    !data.candidates[0] ||
    !data.candidates[0].content ||
    !data.candidates[0].content.parts ||
    !data.candidates[0].content.parts[0]
  ) {
    throw new Error("Gemini returned empty response");
  }

  return JSON.parse(data.candidates[0].content.parts[0].text);
}

(async () => {
  try {
    const posts = JSON.parse(fs.readFileSync("posts.json", "utf-8"));

    const techPost = await generate("Tech News");
    const financePost = await generate("Finance Basics");

    const today = new Date().toISOString().split("T")[0];

    techPost.id = posts.length + 1;
    techPost.date = today;

    financePost.id = posts.length + 2;
    financePost.date = today;

    posts.unshift(financePost);
    posts.unshift(techPost);

    fs.writeFileSync("posts.json", JSON.stringify(posts, null, 2));
    console.log("✅ 2 posts published successfully");

  } catch (err) {
    console.error("❌ Error generating posts:", err.message);
    process.exit(1);
  }
})();
