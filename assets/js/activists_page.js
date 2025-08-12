(function(){
  const grid = document.getElementById('activistGrid');
  const search = document.getElementById('searchActivists');

  function render(list){
    grid.innerHTML = list.map(a => `
      <article class="card">
        <h3>${a.name}</h3>
        <p class="muted">${a.city ? a.city + ', ' : ''}${a.country || ''}</p>
        <div class="links">
          ${a.instagram ? `<a href="${a.instagram}" target="_blank" rel="noopener">Instagram</a>`:''}
          ${a.youtube ? `<a href="${a.youtube}" target="_blank" rel="noopener">YouTube</a>`:''}
          ${a.tiktok ? `<a href="${a.tiktok}" target="_blank" rel="noopener">TikTok</a>`:''}
          ${a.site ? `<a href="${a.site}" target="_blank" rel="noopener">Website</a>`:''}
        </div>
      </article>
    `).join('');
  }

  fetch('assets/data/activists.json').then(r=>r.json()).then(data => {
    render(data);
    if(search){
      search.addEventListener('input', e => {
        const q = e.target.value.toLowerCase();
        const filtered = data.filter(a =>
          (a.name && a.name.toLowerCase().includes(q)) ||
          (a.city && a.city.toLowerCase().includes(q)) ||
          (a.country && a.country.toLowerCase().includes(q))
        );
        render(filtered);
      });
    }
  });
})();