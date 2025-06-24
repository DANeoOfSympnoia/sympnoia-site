document.addEventListener('DOMContentLoaded', () => {
  const filterBar = document.getElementById('tag-filter');
  const posts = Array.from(document.querySelectorAll('.blog-post'));

  const tagSet = new Set();
  posts.forEach(p => {
    const tags = p.dataset.tags ? p.dataset.tags.split(',') : [];
    tags.forEach(t => tagSet.add(t));
  });

  const createBtn = (tag, label) => {
    const b = document.createElement('button');
    b.textContent = label || tag;
    b.dataset.tag = tag;
    b.className = 'tag-btn px-3 py-1 rounded-full bg-[#d7c49e] text-[#1e1e1e] text-sm';
    return b;
  };

  const allBtn = createBtn('', 'All');
  allBtn.classList.add('font-semibold');
  filterBar.appendChild(allBtn);

  Array.from(tagSet).sort().forEach(t => filterBar.appendChild(createBtn(t)));

  let active = '';

  function setActive(btn) {
    filterBar.querySelectorAll('button').forEach(b => b.classList.remove('bg-[#e96f1f]','text-white'));
    if (btn) btn.classList.add('bg-[#e96f1f]', 'text-white');
  }

  function showPost(p) {
    p.classList.remove('hidden', 'opacity-0');
    p.classList.add('opacity-100');
  }

  function hidePost(p) {
    p.classList.add('opacity-0');
    setTimeout(() => p.classList.add('hidden'), 300);
  }

  function filterPosts() {
    posts.forEach(p => {
      if (!active || p.dataset.tags.includes(active)) {
        showPost(p);
      } else {
        hidePost(p);
      }
    });
  }

  filterBar.addEventListener('click', e => {
    if (!e.target.dataset.tag) return;
    active = e.target.dataset.tag;
    setActive(e.target);
    filterPosts();
  });

  document.getElementById('post-list').addEventListener('click', e => {
    if (e.target.classList.contains('tag')) {
      active = e.target.dataset.tag;
      const btn = filterBar.querySelector(`button[data-tag="${active}"]`);
      setActive(btn);
      filterPosts();
    }
  });
});
