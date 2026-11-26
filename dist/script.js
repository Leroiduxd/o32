// Short brand intro. The page remains usable while it plays.
(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const intro = document.createElement('div');
  intro.className = 'o32-intro';
  intro.setAttribute('aria-hidden', 'true');
  intro.innerHTML = '<div class="o32-intro-content"><div class="o32-intro-mark"><span>O’32</span></div><p>Du goût. Tout simplement.</p><div class="o32-intro-line"></div></div>';
  document.body.append(intro);

  const dismiss = () => intro.remove();
  intro.addEventListener('animationend', event => {
    if (event.target === intro) dismiss();
  });
  window.setTimeout(dismiss, 2000);
})();

const search=document.querySelector('#search');const buttons=[...document.querySelectorAll('[data-category]')];const sections=[...document.querySelectorAll('[data-group]')];let category='all';
const normalise=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[’']/g,' ');
function applyFilters(){const terms=normalise(search.value).trim().split(/\s+/).filter(Boolean);let count=0;sections.forEach(section=>{let shown=0;section.querySelectorAll('.menu-item').forEach(row=>{row.hidden=!(category==='all'||category===section.dataset.category)||!terms.every(term=>normalise(row.dataset.search).includes(term));if(!row.hidden)shown++;});section.hidden=shown===0;count+=shown;});document.querySelector('#results').textContent=count+' produits affichés';document.querySelector('#empty').hidden=count!==0;buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.category===category)));}
buttons.forEach(b=>b.addEventListener('click',()=>{category=b.dataset.category;applyFilters();}));search.addEventListener('input',applyFilters);
document.querySelector('#reset').addEventListener('click',()=>{category='all';search.value='';applyFilters();search.focus({preventScroll:true});});
document.querySelectorAll('[data-shortcut]').forEach(link=>link.addEventListener('click',()=>{category=link.dataset.shortcut;search.value='';applyFilters();const active=buttons.find(b=>b.dataset.category===category);active?.scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'});}));
document.querySelector('#print').addEventListener('click',()=>{category='all';search.value='';applyFilters();window.print();});
document.querySelector('[data-controls]').hidden=false;
applyFilters();
