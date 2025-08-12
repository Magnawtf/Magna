// Magna.WTF — interactivity
(function(){
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');
  const modeToggle = document.getElementById('modeToggle');
  const activistGrid = document.getElementById('activistGrid');
  const searchInput = document.getElementById('searchActivists');

  // Mobile nav
  if(navToggle){
    navToggle.addEventListener('click', () => {
      const open = navList.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Dark mode
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const stored = localStorage.getItem('theme');
  if(stored){
    document.documentElement.setAttribute('data-theme', stored);
    if(modeToggle) modeToggle.setAttribute('aria-pressed', stored === 'dark');
  } else if(prefersDark){
    document.documentElement.setAttribute('data-theme', 'dark');
    if(modeToggle) modeToggle.setAttribute('aria-pressed', true);
  }
  if(modeToggle){
    modeToggle.addEventListener('click', () => {
      const cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light':'dark';
      document.documentElement.setAttribute('data-theme', cur);
      localStorage.setItem('theme', cur);
      modeToggle.setAttribute('aria-pressed', cur === 'dark');
    });
  }

  // Year
  const year = document.getElementById('year');
  if(year){ year.textContent = new Date().getFullYear(); }

  // Activists directory
  async function loadActivists(){
    try{
      const res = await fetch('assets/data/activists.json');
      const data = await res.json();
      renderActivists(data);
      if(searchInput){
        searchInput.addEventListener('input', (e)=>{
          const q = e.target.value.toLowerCase();
          const filtered = data.filter(a => (a.name+a.city+a.country).toLowerCase().includes(q));
          renderActivists(filtered);
        });
      }
    }catch(e){
      activistGrid.innerHTML = '<p class="muted">Add activists by editing <code>assets/data/activists.json</code>.</p>';
    }
  }
  function renderActivists(list){
    activistGrid.innerHTML = list.map(a => `
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
  loadActivists();

  // Media archive
  async function loadMedia(){
    const container = document.querySelector('.media-grid');
    if(!container) return;
    try{
      const res = await fetch('assets/data/media.json');
      const items = await res.json();
      container.innerHTML = items.map(it => `
        <article class="card media-card">
          <div class="tag">${it.type || 'Media'}</div>
          <h3>${it.url ? `<a href="${it.url}" target="_blank" rel="noopener">${it.title}</a>` : it.title}</h3>
          ${it.note ? `<p class="muted small">${it.note}</p>` : ''}
        </article>
      `).join('');
    }catch(e){
      // leave whatever was hardcoded
    }
  }
  loadMedia();

})();