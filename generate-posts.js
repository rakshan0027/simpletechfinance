const fs = require("fs");
const path = require("path");

const posts = JSON.parse(fs.readFileSync("posts.json", "utf8"));
const template = fs.readFileSync("post-template.html", "utf8");

posts.forEach(post => {
  const folderPath = path.join("posts", post.slug);
  fs.mkdirSync(folderPath, { recursive: true });

  let html = template
    .replace(/{{title}}/g, post.title)
    .replace(/{{description}}/g, post.summary)
    .replace(/{{slug}}/g, post.slug)
    .replace(/{{date}}/g, post.date)
    .replace(/{{category}}/g, post.category)
    .replace(/{{content}}/g, post.content);

  fs.writeFileSync(path.join(folderPath, "index.html"), html);
});

console.log("✅ All posts generated successfully");
