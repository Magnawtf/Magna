(function(){
  const listEl = document.getElementById('mediaList');
  const typeSel = document.getElementById('typeFilter');
  const yearSel = document.getElementById('yearFilter');
  const searchEl = document.getElementById('mediaSearch');

  function domainFrom(url){
    try { return new URL(url).hostname.replace('www.',''); } catch(e){ return ''; }
  }

  function render(items){
    listEl.innerHTML = items.map(it => `
      <article class="card media-card">
        <div class="tag">${it.type || 'Media'}</div>
        <h3>${it.url ? `<a href="${it.url}" target="_blank" rel="noopener">${it.title}</a>` : it.title}</h3>
        <p class="muted small">${domainFrom(it.url)}${it.year && it.year!=='Unknown' ? ' • ' + it.year : ''}${it.note ? ' • ' + it.note : ''}</p>
      </article>
    `).join('');
  }

  fetch('assets/data/media.json').then(r=>r.json()).then(data =>{
    // Normalize: ensure year field exists
    data.forEach(d => { if(!('year' in d)) d.year = 'Unknown'; });

    // Build filter options
    const types = Array.from(new Set(['All', ...data.map(d=>d.type || 'Media')])).sort((a,b)=> a==='All' ? -1 : a.localeCompare(b));
    const years = Array.from(new Set(['All', ...data.map(d=>d.year || 'Unknown')])).sort((a,b)=>{
      if(a==='All') return -1;
      if(a==='Unknown') return 1;
      if(b==='Unknown') return -1;
      return String(b).localeCompare(String(a)); // desc
    });

    types.forEach(t => {
      const opt = document.createElement('option'); opt.value = t; opt.textContent = t; typeSel.appendChild(opt);
    });
    years.forEach(y => {
      const opt = document.createElement('option'); opt.value = y; opt.textContent = y; yearSel.appendChild(opt);
    });

    // Filter function
    function apply(){
      const q = (searchEl.value || '').toLowerCase();
      const t = typeSel.value;
      const y = yearSel.value;
      const out = data.filter(d => {
        const matchesQ = !q || (d.title && d.title.toLowerCase().includes(q)) || (d.url && d.url.toLowerCase().includes(q));
        const matchesT = (t==='All') || ((d.type || 'Media')===t);
        const matchesY = (y==='All') || ((d.year || 'Unknown')===y);
        return matchesQ && matchesT && matchesY;
      });
      render(out);
    }

    searchEl.addEventListener('input', apply);
    typeSel.addEventListener('change', apply);
    yearSel.addEventListener('change', apply);

    render(data);
  });
})();