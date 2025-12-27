import fs from "fs";
import fetch from "node-fetch";

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("❌ GEMINI_API_KEY missing");
  process.exit(1);
}

const POSTS_FILE = "posts.json";

// Read existing posts
const posts = JSON.parse(fs.readFileSync(POSTS_FILE, "utf8"));
const nextId = posts.length ? Math.max(...posts.map(p => p.id)) + 1 : 1;

// Rotate category: Tech → Finance → Tech → Finance
const category = nextId % 2 === 0 ? "Finance Basics" : "Tech News";

const prompt = `
Write a beginner-friendly blog post.

Category: ${category}

Requirements:
- Simple English
- Clear explanations
- SEO friendly
- Include multiple <h2> headings
- Return JSON ONLY in this exact format:

{
  "title": "...",
  "summary": "...",
  "content": "<h2>...</h2><p>...</p>"
}
`;

async function generatePost() {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    }
  );

  const data = await res.json();

  const text =
    data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("Gemini returned empty response");
  }

  const parsed = JSON.parse(text);

  const newPost = {
    id: nextId,
    title: parsed.title,
    category,
    date: new Date().toISOString().split("T")[0],
    summary: parsed.summary,
    content: parsed.content
  };

  posts.unshift(newPost);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));

  console.log("✅ Post generated:", newPost.title);
}

generatePost().catch(err => {
  console.error("❌ Error generating posts:", err.message);
  process.exit(1);
});
