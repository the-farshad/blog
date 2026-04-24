(function () {
  const params = new URLSearchParams(location.search);
  const path = params.get('p');
  const titleEl = document.getElementById('post-title');
  const metaEl = document.getElementById('post-meta');
  const bodyEl = document.getElementById('post-body');

  if (!path) {
    titleEl.textContent = 'No post specified';
    bodyEl.innerHTML = '<p>Add a <code>?p=&lt;path&gt;.md</code> query parameter, e.g. <code>post.html?p=research/intro.md</code>.</p>';
    return;
  }

  if (!/^[\w\-./]+\.md$/i.test(path) || path.includes('..')) {
    titleEl.textContent = 'Invalid path';
    bodyEl.innerHTML = '<p>Refusing to load suspicious path.</p>';
    return;
  }

  function parseFrontmatter(src) {
    const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    if (!m) return { meta: {}, body: src };
    const meta = {};
    m[1].split(/\r?\n/).forEach(line => {
      const kv = line.match(/^([A-Za-z][\w-]*)\s*:\s*(.*)$/);
      if (kv) meta[kv[1].toLowerCase()] = kv[2].trim().replace(/^["']|["']$/g, '');
    });
    return { meta, body: m[2] };
  }

  fetch(path)
    .then(r => {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.text();
    })
    .then(src => {
      const { meta, body } = parseFrontmatter(src);
      const title = meta.title || path.split('/').pop().replace(/\.md$/i, '');
      const topic = (path.match(/^([^/]+)\//) || [])[1];
      const dateBits = [meta.date, topic].filter(Boolean).join(' · ');

      document.title = title + ' | Farshad Ghorbani';
      titleEl.textContent = title;
      metaEl.textContent = dateBits;
      bodyEl.innerHTML = window.marked.parse(body);
    })
    .catch(err => {
      titleEl.textContent = 'Could not load post';
      bodyEl.innerHTML = '<p>Failed to fetch <code>' + path.replace(/[<>&]/g, '') + '</code>: ' + err.message + '</p>';
    });
})();
