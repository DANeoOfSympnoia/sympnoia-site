function initTagUI({ tags, filtersEl, controlsEl, activeTags, onChange }) {
  activeTags = activeTags || new Set();

  const createBtn = (tag, label) => {
    const b = document.createElement('button');
    b.textContent = label || tag;
    if (tag) b.dataset.tag = tag;
    b.className = 'tag-btn px-3 py-1 rounded-full bg-[#d7c49e] text-[#1e1e1e] text-sm';
    return b;
  };

  const notify = () => {
    if (typeof onChange === 'function') onChange(Array.from(activeTags));
  };

  tags.filter(t => t).sort().forEach(t => filtersEl.appendChild(createBtn(t)));

  const resetBtn = createBtn('', 'Reset');
  resetBtn.classList.add('font-semibold', 'bg-[#d7c49e]');
  const invertBtn = createBtn('', 'Invert');
  invertBtn.classList.add('font-semibold', 'bg-[#d7c49e]');
  controlsEl.appendChild(resetBtn);
  controlsEl.appendChild(invertBtn);

  filtersEl.addEventListener('click', e => {
    if (!e.target.dataset.tag) return;
    const tag = e.target.dataset.tag;
    if (activeTags.has(tag)) {
      activeTags.delete(tag);
      e.target.classList.remove('bg-[#e96f1f]', 'text-white');
    } else {
      activeTags.add(tag);
      e.target.classList.add('bg-[#e96f1f]', 'text-white');
    }
    notify();
  });

  resetBtn.addEventListener('click', () => {
    activeTags.clear();
    filtersEl.querySelectorAll('button[data-tag]').forEach(b =>
      b.classList.remove('bg-[#e96f1f]', 'text-white')
    );
    notify();
  });

  invertBtn.addEventListener('click', () => {
    const newActive = new Set();
    tags.forEach(t => {
      if (!activeTags.has(t)) newActive.add(t);
    });
    activeTags.clear();
    filtersEl.querySelectorAll('button[data-tag]').forEach(b => {
      const tag = b.dataset.tag;
      if (newActive.has(tag)) {
        activeTags.add(tag);
        b.classList.add('bg-[#e96f1f]', 'text-white');
      } else {
        b.classList.remove('bg-[#e96f1f]', 'text-white');
      }
    });
    notify();
  });

  return { activeTags };
}

window.initTagUI = initTagUI;
