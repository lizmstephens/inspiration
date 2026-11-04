// Daily Hummingbird collaborators: render approved public data only.
(() => {
  const grid = document.getElementById('collaborators-list');
  if (!grid) return;
  const safeUrl = (value) => {
    try {
      const url = new URL(String(value || ''), window.location.href);
      return ['https:', 'http:'].includes(url.protocol) ? url.href : '';
    } catch { return ''; }
  };
  const add = (parent, tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    parent.appendChild(node);
    return node;
  };
  const card = (person) => {
    if (!person || !person.name) return null;
    const article = document.createElement('article');
    article.className = 'collaborator-card collaborator-profile';
    const photo = safeUrl(person.image);
    if (photo) {
      const img = add(article, 'img', 'collaborator-avatar');
      img.src = photo;
      img.alt = 'Portrait of ' + person.name;
      img.loading = 'lazy';
      img.onerror = () => {
        const fallback = addInitials(person);
        img.replaceWith(fallback);
      };
    } else {
      article.appendChild(addInitials(person));
    }
    const info = add(article, 'div', 'collaborator-info');
    const role = person.curator ? 'Curator & Collaborator' : 'Collaborator';
    add(info, 'p', 'collaborator-note', role + (person.country ? ' · ' + person.country : ''));
    const heading = add(info, 'h3');
    const link = safeUrl(person.linkedin);
    if (link) {
      const a = add(heading, 'a', '', person.name);
      a.href = link;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    } else {
      heading.textContent = person.name;
    }
    if (person.background) {
      add(info, 'p', '', person.background.split(',').map(s => s.trim()).filter(Boolean).join(', '));
    }
    return article;
  };
  const addInitials = (person) => {
    const initials = document.createElement('span');
    initials.className = 'collaborator-avatar collaborator-initials';
    initials.setAttribute('aria-hidden', 'true');
    initials.textContent = person.name.trim().split(/\s+/).slice(0, 2).map(s => s.charAt(0)).join('').toUpperCase();
    return initials;
  };
  fetch('collaborators.json', {cache:'no-store'})
    .then(r => {if (!r.ok) throw Error('Could not load collaborator list'); return r.json();})
    .then(people => {
      if (!Array.isArray(people)) throw Error('Unexpected collaborator data');
      const fragment = document.createDocumentFragment();
      people.map(card).filter(Boolean).forEach(c => fragment.appendChild(c));
      grid.replaceChildren(fragment);
    })
    .catch(error => console.warn('Using existing collaborator cards:', error));
})();
