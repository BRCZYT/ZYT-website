import fs from 'fs';

// redesign/creative-refresh — layers Lenis + GSAP ScrollTrigger + SplitType,
// card tilt/shimmer, nav hide-on-scroll, active-page indicator and native
// cross-document View Transitions on top of the existing site, without
// touching the existing .rv reveal / counter / prj-pin / i18n systems.

const files = [
  'index.html','beton.html','galvaniz.html','enerji.html','atik-donusum.html',
  'tedarik-zinciri.html','iletisim.html','hakkimizda.html','belgelerimiz.html',
  'referanslar.html','akademi.html'
];

const CSS_MARK = '/* CREATIVE-REFRESH CSS */';
const CREATIVE_CSS = `
${CSS_MARK}
@view-transition{navigation:auto}
::view-transition-old(root){animation:cr-vt-out .5s cubic-bezier(.22,1,.36,1) both}
::view-transition-new(root){animation:cr-vt-in .5s cubic-bezier(.22,1,.36,1) both}
@keyframes cr-vt-out{to{opacity:0;transform:scale(.98) translateY(-8px)}}
@keyframes cr-vt-in{from{opacity:0;transform:scale(1.02) translateY(8px)}}

#nav{transition:transform .4s cubic-bezier(.22,1,.36,1),background .3s,padding .3s}
#nav.cr-nav-hidden{transform:translateY(-100%)}

.nav-link,.dd-tog{position:relative}
.nav-link.cr-active::after,.dd-tog.cr-active::after{content:'';position:absolute;left:0;right:0;bottom:-6px;height:1px;background:#2874B2;box-shadow:0 0 8px rgba(40,116,178,.6)}

.hero-grid-bg,.hero-grid{animation:cr-grid-drift 26s linear infinite}
@keyframes cr-grid-drift{from{background-position:0 0}to{background-position:160px 160px}}

div:has(>.f-inp:focus)>.f-lbl{transform:translateY(-2px);color:#2874B2}
.f-lbl{transition:transform .2s ease,color .2s ease}
.f-inp{background-image:linear-gradient(#2874B2,#2874B2);background-repeat:no-repeat;background-size:0% 2px;background-position:left bottom;transition:background-size .35s cubic-bezier(.22,1,.36,1),border-color .2s,box-shadow .2s}
.f-inp:focus{background-size:100% 2px}

@media(prefers-reduced-motion:reduce){
  html{scroll-behavior:auto !important}
  *,*::before,*::after{animation-duration:.001ms !important;animation-iteration-count:1 !important;transition-duration:.001ms !important}
}
`;

const JS_MARK = '/* CREATIVE-REFRESH JS */';
const CREATIVE_LIBS =
`<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/split-type@0.3.4/umd/index.min.js"></script>
`;

const CREATIVE_JS = `<script>
${JS_MARK}
(function(){
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  var isNarrow = window.innerWidth < 768;
  var heavyOK = !reduceMotion && !isTouch && !isNarrow;

  /* ---- Lenis smooth scroll, wired to GSAP's ticker + ScrollTrigger ---- */
  if(!reduceMotion && !isTouch && window.Lenis && window.gsap && window.ScrollTrigger){
    document.documentElement.style.scrollBehavior = 'auto';
    var lenis = new Lenis({ duration: 1.05, easing: function(t){ return 1 - Math.pow(1-t, 3); } });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function(time){ lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
    window.__lenis = lenis;
  }

  /* ---- Hero heading: split into characters, staggered entrance ---- */
  var heroH1 = document.querySelector('.hero-h1, .hero-title');
  if(heroH1 && !reduceMotion && window.SplitType && window.gsap){
    try{
      var split = new SplitType(heroH1, { types: 'words,chars' });
      gsap.set(split.chars, { opacity: 0, y: 18 });
      gsap.to(split.chars, { opacity: 1, y: 0, duration: .7, stagger: .018, ease: 'power3.out', delay: 1.1 });
    }catch(e){}
  }

  /* ---- Hero: slight scale + fade as it scrolls away (depth parallax) ---- */
  var heroSec = document.querySelector('#hero');
  if(heroSec && heavyOK && window.gsap && window.ScrollTrigger){
    gsap.to(heroSec, {
      scale: .94, opacity: .5, ease: 'none', transformOrigin: 'center top',
      scrollTrigger: { trigger: heroSec, start: 'top top', end: 'bottom top', scrub: .4 }
    });
  }

  /* ---- Card 3D tilt + shimmer sheen (desktop hover only) ---- */
  if(heavyOK){
    var cardSel = '.ind-card-l,.prod-card,.comp-card,.prj-card,.svc-card,.ref-card,.featured-card,.blog-card,.mix-card,.co-card,.tech-card,.cert-card,.pillar';
    document.querySelectorAll(cardSel).forEach(function(card){
      if(getComputedStyle(card).position === 'static') card.style.position = 'relative';
      var sheen = document.createElement('div');
      sheen.setAttribute('aria-hidden','true');
      sheen.style.cssText = 'position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .3s ease;z-index:5;mix-blend-mode:overlay;border-radius:inherit';
      card.appendChild(sheen);
      card.style.transition = (card.style.transition ? card.style.transition + ',' : '') + 'transform .25s cubic-bezier(.22,1,.36,1)';
      card.addEventListener('mousemove', function(e){
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        var rx = (0.5 - py) * 7, ry = (px - 0.5) * 9;
        card.style.transform = 'perspective(900px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateY(-3px)';
        sheen.style.opacity = '1';
        sheen.style.background = 'radial-gradient(circle at ' + (px*100) + '% ' + (py*100) + '%, rgba(255,255,255,.16), transparent 55%)';
      });
      card.addEventListener('mouseleave', function(){
        card.style.transform = '';
        sheen.style.opacity = '0';
      });
    });
  }

  /* ---- Nav: hide on scroll-down, reveal on scroll-up ---- */
  (function(){
    var nav = document.getElementById('nav');
    if(!nav) return;
    var lastY = window.scrollY, ticking = false;
    window.addEventListener('scroll', function(){
      if(ticking) return; ticking = true;
      requestAnimationFrame(function(){
        var y = window.scrollY;
        nav.classList.toggle('cr-nav-hidden', y > lastY && y > 140);
        lastY = y; ticking = false;
      });
    }, { passive: true });
  })();

  /* ---- Nav: underline the link/dropdown matching the current page ---- */
  (function(){
    var page = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link[href], .dd-item[href]').forEach(function(a){
      if(a.getAttribute('href') === page){
        a.classList.add('cr-active');
        var dd = a.closest('.has-dd');
        if(dd){ var tog = dd.querySelector('.dd-tog'); if(tog) tog.classList.add('cr-active'); }
      }
    });
  })();

  window.addEventListener('load', function(){ if(window.ScrollTrigger) ScrollTrigger.refresh(); });
})();
</script>
`;

for(const file of files){
  if(!fs.existsSync(file)){ console.log(`[${file}] NOT FOUND`); continue; }
  let html = fs.readFileSync(file, 'utf8');
  const changed = [];

  if(!html.includes(CSS_MARK)){
    const i = html.indexOf('</style>');
    if(i === -1){ console.log(`[${file}] NO </style> FOUND — skipped CSS`); }
    else{ html = html.slice(0,i) + CREATIVE_CSS + html.slice(i); changed.push('css'); }
  }

  if(!html.includes(JS_MARK)){
    const i = html.indexOf('</body>');
    if(i === -1){ console.log(`[${file}] NO </body> FOUND — skipped JS`); }
    else{ html = html.slice(0,i) + CREATIVE_LIBS + CREATIVE_JS + html.slice(i); changed.push('js+libs'); }
  }

  fs.writeFileSync(file, html, 'utf8');
  console.log(`[${file}] ${changed.join(', ') || 'no-change (already applied)'}`);
}
console.log('\nDone.');
