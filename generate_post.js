const fs = require("fs");
const fetch = require("node-fetch");

const API_KEY = process.env.GEMINI_API_KEY;

const prompt = `
Generate ONE blog post as JSON only.

Rules:
- Category: "Tech News" or "Finance Basics"
- Beginner friendly
- Simple English
- Include:
  id (number),
  title,
  category,
  date (YYYY-MM-DD),
  summary,
  content (HTML with h2 and p)

Return ONLY JSON object.
`;

async function generatePost() {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    }
  );

  const data = await res.json();
  const text = data.candidates[0].content.parts[0].text;

  const newPost = JSON.parse(text);

  const posts = JSON.parse(fs.readFileSync("posts.json", "utf-8"));

  newPost.id = posts.length + 1;
  posts.unshift(newPost);

  fs.writeFileSync("posts.json", JSON.stringify(posts, null, 2));
}

generatePost().catch(err => {
  console.error("Error generating post:", err);
  process.exit(1);
});
