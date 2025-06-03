// assets/js/menu.js
document.addEventListener('DOMContentLoaded', () => {
  const navModal = document.getElementById('navModal');
  document.querySelector('header button')
          .addEventListener('click', () =>
            navModal.classList.toggle('hidden'));

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') navModal.classList.add('hidden');
  });
});
