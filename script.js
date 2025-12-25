fetch('posts.json')
  .then(res => res.json())
  .then(posts => {
    const container = document.getElementById('posts');
    container.innerHTML = '';

    posts.forEach(post => {
      const div = document.createElement('div');
      div.className = 'bg-white p-4 rounded shadow';

      div.innerHTML = `
        <h3 class="text-lg font-bold">${post.title}</h3>
        <p class="text-sm text-gray-500">${post.date} • ${post.category}</p>
        <p class="mt-2">${post.summary}</p>
      `;

      container.appendChild(div);
    });
  })
  .catch(err => {
    document.getElementById('posts').innerHTML = 'Failed to load posts.';
    console.error(err);
  });
