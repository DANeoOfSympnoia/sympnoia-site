// Multi-select tag filtering for blog posts with reset and invert controls

document.addEventListener('DOMContentLoaded', () => {
  const filterBar = document.getElementById('tag-filter');
  const controlBar = document.getElementById('tag-controls');
  const posts = Array.from(document.querySelectorAll('.blog-post'));

  const tagSet = new Set();
  posts.forEach(p => {
    const tags = p.dataset.tags ? p.dataset.tags.split(',') : [];
    tags.forEach(t => tagSet.add(t));
  });

  const createBtn = (tag, label, extra) => {
    const b = document.createElement('button');
    b.textContent = label || tag;
    if (tag) b.dataset.tag = tag;
    b.className = extra || 'tag-btn px-3 py-1 rounded-full bg-[#d7c49e] text-[#1e1e1e] text-sm';
    return b;
  };

  const resetBtn = createBtn('', 'Reset', 'px-3 py-1 rounded-full bg-[#b8a06f] text-[#1e1e1e] text-sm font-semibold');
  const invertBtn = createBtn('', 'Invert', 'px-3 py-1 rounded-full bg-[#b8a06f] text-[#1e1e1e] text-sm font-semibold');
  if (controlBar) {
    controlBar.appendChild(resetBtn);
    controlBar.appendChild(invertBtn);
  }

  Array.from(tagSet).sort().forEach(t => filterBar.appendChild(createBtn(t)));

  const activeTags = new Set();

  function updateButtons() {
    filterBar.querySelectorAll('button[data-tag]').forEach(btn => {
      if (activeTags.has(btn.dataset.tag)) {
        btn.classList.add('bg-[#e96f1f]', 'text-white');
      } else {
        btn.classList.remove('bg-[#e96f1f]', 'text-white');
      }
    });
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
    const active = Array.from(activeTags);
    posts.forEach(p => {
      const tags = p.dataset.tags ? p.dataset.tags.split(',') : [];
      const match = active.length === 0 || active.some(t => tags.includes(t));
      if (match) {
        showPost(p);
      } else {
        hidePost(p);
      }
    });
  }

  filterBar.addEventListener('click', e => {
    if (!e.target.dataset.tag) return;
    const tag = e.target.dataset.tag;
    if (activeTags.has(tag)) {
      activeTags.delete(tag);
    } else {
      activeTags.add(tag);
    }
    updateButtons();
    filterPosts();
  });

  document.getElementById('post-list').addEventListener('click', e => {
    if (e.target.classList.contains('tag')) {
      const tag = e.target.dataset.tag;
      if (activeTags.has(tag)) {
        activeTags.delete(tag);
      } else {
        activeTags.add(tag);
      }
      updateButtons();
      filterPosts();
    }
  });

  resetBtn.addEventListener('click', () => {
    activeTags.clear();
    updateButtons();
    filterPosts();
  });

  invertBtn.addEventListener('click', () => {
    const newActive = new Set();
    tagSet.forEach(t => {
      if (!activeTags.has(t)) newActive.add(t);
    });
    activeTags.clear();
    newActive.forEach(t => activeTags.add(t));
    updateButtons();
    filterPosts();
  });
});
