const filterButtons = document.querySelectorAll('[data-filter]');
const projects = document.querySelectorAll('.project');
const resultCount = document.querySelector('#result-count');

for (const button of filterButtons) {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;
    let count = 0;
    for (const project of projects) {
      project.hidden = category !== '전체' && project.dataset.category !== category;
      if (!project.hidden) count++;
    }
    for (const filter of filterButtons) {
      const selected = filter === button;
      filter.classList.toggle('active', selected);
      filter.setAttribute('aria-pressed', String(selected));
    }
    resultCount.textContent = `${category} ${count}편`;
  });
}

const dialog = document.querySelector('#video-dialog');
const player = document.querySelector('#player');
for (const link of document.querySelectorAll('[data-video]')) {
  link.addEventListener('click', (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    if (typeof dialog.showModal !== 'function') return;
    event.preventDefault();
    document.querySelector('#video-title').textContent = link.dataset.title;
    document.querySelector('#youtube-link').href = link.href;
    dialog.classList.toggle('shorts-dialog', link.closest('.project').dataset.category === '쇼츠');
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${link.dataset.video}?autoplay=1&rel=0`;
    iframe.title = link.dataset.title;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allowFullscreen = true;
    player.replaceChildren(iframe);
    dialog.showModal();
  });
}
document.querySelector('.close-button').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});
dialog.addEventListener('close', () => player.replaceChildren());
