let allPosts = [];

fetch('posts.json')
  .then(res => res.json())
  .then(posts => {
    allPosts = posts;
    renderPosts(posts);
  });

function renderPosts(posts) {
  const container = document.getElementById('posts');
  if (!container) return;

  container.innerHTML = '';

  posts.forEach(post => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-xl shadow p-6';

    const color =
      post.category === 'Tech News'
        ? 'bg-blue-100 text-blue-600'
        : 'bg-green-100 text-green-600';

    card.innerHTML = `
      <span class="text-xs px-3 py-1 rounded-full ${color}">
        ${post.category}
      </span>
      <h3 class="text-xl font-bold mt-4 mb-2">${post.title}</h3>
      <p class="text-gray-600 mb-4">${post.summary}</p>
      <a href="post.html?id=${post.id}" class="text-blue-600 font-medium">
        Read Post →
      </a>
    `;

    container.appendChild(card);
  });
}

const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', e => {
    const query = e.target.value.toLowerCase();

    const filtered = allPosts.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.summary.toLowerCase().includes(query) ||
      (post.content && post.content.toLowerCase().includes(query))
    );

    renderPosts(filtered);
  });
}
