import fs from 'fs';

let html = fs.readFileSync('iletisim.html', 'utf8');

// ─── 1. Add data-i18n to nav links ──────────────────────────────────────────
html = html.replace(
  '<a href="index.html#about" class="nav-link">Hakkımızda</a>',
  '<a href="index.html#about" class="nav-link" data-i18n="nav.about">Hakkımızda</a>'
);
html = html.replace(
  '<span class="nav-link dd-tog">Şirketlerimiz <svg',
  '<span class="nav-link dd-tog" data-i18n="nav.companies">Şirketlerimiz <svg'
);
html = html.replace(
  '<a href="iletisim.html" class="nav-link" style="color:rgba(255,255,255,.9)">İletişim</a>',
  '<a href="iletisim.html" class="nav-link" style="color:rgba(255,255,255,.9)" data-i18n="nav.contact">İletişim</a>'
);
html = html.replace(
  '<a href="index.html#about" class="mob-link" onclick="closeMobNav()">Hakkımızda</a>',
  '<a href="index.html#about" class="mob-link" data-i18n="nav.about" onclick="closeMobNav()">Hakkımızda</a>'
);
html = html.replace(
  '<button class="mob-link mob-dd-tog" onclick="toggleMobDd(this)">Şirketlerimiz <span',
  '<button class="mob-link mob-dd-tog" data-i18n="nav.companies" onclick="toggleMobDd(this)">Şirketlerimiz <span'
);
html = html.replace(
  '<a href="iletisim.html" class="mob-link" style="color:#2874B2" onclick="closeMobNav()">İletişim</a>',
  '<a href="iletisim.html" class="mob-link" style="color:#2874B2" data-i18n="nav.contact" onclick="closeMobNav()">İletişim</a>'
);

// ─── 2. Hero ─────────────────────────────────────────────────────────────────
html = html.replace(
  '<div class="hero-eyebrow">// ZYT Global Industry · İletişim</div>',
  '<div class="hero-eyebrow" data-i18n="hero.eyebrow">// ZYT Global Industry · İletişim</div>'
);
html = html.replace(
  '<h1 class="hero-title">Projenizi <span style="color:#2874B2;font-weight:500">konuşalım.</span></h1>',
  '<h1 class="hero-title" data-i18n-html="hero.title">Projenizi <span style="color:#2874B2;font-weight:500">konuşalım.</span></h1>'
);
html = html.replace(
  '<p class="hero-sub">Şirketlerimizden biriyle çalışmak için formu doldurun ya da doğrudan ulaşın — 48 saat içinde uzman ekibimizden yanıt alırsınız.</p>',
  '<p class="hero-sub" data-i18n="hero.sub">Şirketlerimizden biriyle çalışmak için formu doldurun ya da doğrudan ulaşın — 48 saat içinde uzman ekibimizden yanıt alırsınız.</p>'
);

// ─── 3. Quick contact cards ──────────────────────────────────────────────────
html = html.replace(
  '<div class="qc-label">Telefon</div>\n      <div class="qc-val">',
  '<div class="qc-label" data-i18n="qc.phone.label">Telefon</div>\n      <div class="qc-val">'
);
html = html.replace(
  '<div class="qc-sub">Pazartesi – Cuma, 09:00 – 18:00</div>',
  '<div class="qc-sub" data-i18n="qc.phone.sub">Pazartesi – Cuma, 09:00 – 18:00</div>'
);
html = html.replace(
  '<div class="qc-label">E-Posta</div>\n      <div class="qc-val">',
  '<div class="qc-label" data-i18n="qc.email.label">E-Posta</div>\n      <div class="qc-val">'
);
html = html.replace(
  '<div class="qc-sub">48 saat içinde yanıt</div>',
  '<div class="qc-sub" data-i18n="qc.email.sub">48 saat içinde yanıt</div>'
);
html = html.replace(
  '<div class="qc-label">Adres</div>',
  '<div class="qc-label" data-i18n="qc.address.label">Adres</div>'
);
html = html.replace(
  '<div class="qc-val" style="font-size:14px">Ankara, Türkiye</div>\n      <div class="qc-sub">Genel Merkez</div>',
  '<div class="qc-val" style="font-size:14px" data-i18n="qc.address.val">Ankara, Türkiye</div>\n      <div class="qc-sub" data-i18n="qc.address.sub">Genel Merkez</div>'
);

// ─── 4. Left column info section ─────────────────────────────────────────────
html = html.replace(
  '<div class="rv" style="font-family:\'JetBrains Mono Variable\',monospace;font-size:9px;letter-spacing:2.5px;text-transform:uppercase;color:#2874B2;margin-bottom:16px">§ 01 / Bize Ulaşın</div>',
  '<div class="rv" style="font-family:\'JetBrains Mono Variable\',monospace;font-size:9px;letter-spacing:2.5px;text-transform:uppercase;color:#2874B2;margin-bottom:16px" data-i18n="ct.tag">§ 01 / Bize Ulaşın</div>'
);
html = html.replace(
  '<h2 class="rv d1" style="font-family:\'Sora Variable\',Sora,sans-serif;font-size:clamp(1.8rem,3.2vw,2.6rem);font-weight:300;line-height:1.1;letter-spacing:-.03em;color:#0A2540;margin-bottom:12px">Birlikte <span style="color:#2874B2;font-weight:500">büyüyelim.</span></h2>',
  '<h2 class="rv d1" style="font-family:\'Sora Variable\',Sora,sans-serif;font-size:clamp(1.8rem,3.2vw,2.6rem);font-weight:300;line-height:1.1;letter-spacing:-.03em;color:#0A2540;margin-bottom:12px" data-i18n-html="ct.title">Birlikte <span style="color:#2874B2;font-weight:500">büyüyelim.</span></h2>'
);
html = html.replace(
  '<p class="rv d2" style="font-family:\'Manrope Variable\',Manrope,sans-serif;font-size:14px;color:#3A4858;line-height:1.75;margin-bottom:36px;max-width:400px">Beton santrali, galvaniz tesisi, enerji dönüşüm veya tedarik zinciri projeleriniz için doğru ekiple buluşun.</p>',
  '<p class="rv d2" style="font-family:\'Manrope Variable\',Manrope,sans-serif;font-size:14px;color:#3A4858;line-height:1.75;margin-bottom:36px;max-width:400px" data-i18n="ct.sub">Beton santrali, galvaniz tesisi, enerji dönüşüm veya tedarik zinciri projeleriniz için doğru ekiple buluşun.</p>'
);
html = html.replace(
  '<div class="ct-info-label">Telefon</div><div class="ct-info-val">',
  '<div class="ct-info-label" data-i18n="ct.phone.label">Telefon</div><div class="ct-info-val">'
);
html = html.replace(
  '<div class="ct-info-label">E-Posta</div>',
  '<div class="ct-info-label" data-i18n="ct.email.label">E-Posta</div>'
);
html = html.replace(
  '<div class="ct-info-label">Adres</div><div class="ct-info-val">Ankara, Türkiye</div>',
  '<div class="ct-info-label" data-i18n="ct.address.label">Adres</div><div class="ct-info-val" data-i18n="ct.address.val">Ankara, Türkiye</div>'
);

// ─── 5. WhatsApp card ────────────────────────────────────────────────────────
html = html.replace(
  '<div style="font-family:\'JetBrains Mono Variable\',monospace;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#3A4858;margin-bottom:10px">Hızlı İletişim</div>',
  '<div style="font-family:\'JetBrains Mono Variable\',monospace;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#3A4858;margin-bottom:10px" data-i18n="wa.title">Hızlı İletişim</div>'
);
html = html.replace(
  '<p style="font-family:\'Manrope Variable\',Manrope,sans-serif;font-size:13.5px;color:#3A4858;line-height:1.65;margin-bottom:16px">WhatsApp üzerinden anlık mesaj gönderin — ekibimiz en kısa sürede yanıt verir.</p>',
  '<p style="font-family:\'Manrope Variable\',Manrope,sans-serif;font-size:13.5px;color:#3A4858;line-height:1.65;margin-bottom:16px" data-i18n="wa.desc">WhatsApp üzerinden anlık mesaj gönderin — ekibimiz en kısa sürede yanıt verir.</p>'
);
html = html.replace(
  /<a href="https:\/\/wa\.me\/#WHATSAPP_NUMBER#[^"]*" class="wa-btn"[^>]*>\s*<svg[^>]+>[\s\S]*?<\/svg>\s*WhatsApp ile Yaz\s*<\/a>/,
  m => m.replace('WhatsApp ile Yaz', '<span data-i18n="wa.btn">WhatsApp ile Yaz</span>')
);

// ─── 6. Social section title ─────────────────────────────────────────────────
html = html.replace(
  '<div style="font-family:\'JetBrains Mono Variable\',monospace;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#3A4858;margin-bottom:14px">Sosyal Medya</div>',
  '<div style="font-family:\'JetBrains Mono Variable\',monospace;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#3A4858;margin-bottom:14px" data-i18n="soc.title">Sosyal Medya</div>'
);

// ─── 7. Form ──────────────────────────────────────────────────────────────────
html = html.replace(
  '<div style="font-family:\'JetBrains Mono Variable\',monospace;font-size:9px;letter-spacing:2.5px;text-transform:uppercase;color:#2874B2;margin-bottom:8px">§ 02 / Mesaj Gönder</div>',
  '<div style="font-family:\'JetBrains Mono Variable\',monospace;font-size:9px;letter-spacing:2.5px;text-transform:uppercase;color:#2874B2;margin-bottom:8px" data-i18n="form.tag">§ 02 / Mesaj Gönder</div>'
);
html = html.replace(
  '<h3 style="font-family:\'Sora Variable\',Sora,sans-serif;font-size:22px;font-weight:400;color:#0A2540;margin-bottom:28px;letter-spacing:-.02em">Teklif ve proje sorguları</h3>',
  '<h3 style="font-family:\'Sora Variable\',Sora,sans-serif;font-size:22px;font-weight:400;color:#0A2540;margin-bottom:28px;letter-spacing:-.02em" data-i18n="form.title">Teklif ve proje sorguları</h3>'
);
// Form labels
html = html.replace('<label class="f-lbl">Ad Soyad</label>', '<label class="f-lbl" data-i18n="form.name.lbl">Ad Soyad</label>');
html = html.replace('<label class="f-lbl">Şirket</label>', '<label class="f-lbl" data-i18n="form.company.lbl">Şirket</label>');
html = html.replace('<label class="f-lbl">E-Posta</label>', '<label class="f-lbl" data-i18n="form.email.lbl">E-Posta</label>');
html = html.replace('<label class="f-lbl">Telefon</label>', '<label class="f-lbl" data-i18n="form.phone.lbl">Telefon</label>');
html = html.replace('<label class="f-lbl">İlgili Şirket / Sektör</label>', '<label class="f-lbl" data-i18n="form.sector.lbl">İlgili Şirket / Sektör</label>');
html = html.replace('<label class="f-lbl">Konu</label>', '<label class="f-lbl" data-i18n="form.topic.lbl">Konu</label>');
html = html.replace('<label class="f-lbl">Mesajınız</label>', '<label class="f-lbl" data-i18n="form.msg.lbl">Mesajınız</label>');
// Form placeholders — add data-i18n-ph
html = html.replace('placeholder="Adınız Soyadınız"', 'data-i18n-ph="form.name.ph" placeholder="Adınız Soyadınız"');
html = html.replace('placeholder="Şirket Adı"', 'data-i18n-ph="form.company.ph" placeholder="Şirket Adı"');
html = html.replace('placeholder="email@sirket.com"', 'data-i18n-ph="form.email.ph" placeholder="email@sirket.com"');
html = html.replace('placeholder="Projenizi kısaca anlatın', 'data-i18n-ph="form.msg.ph" placeholder="Projenizi kısaca anlatın');
// Submit button
html = html.replace(
  'Gönder <svg width="12"',
  '<span data-i18n="form.submit">Gönder</span> <svg width="12"'
);
// Privacy note
html = html.replace(
  '48 saat içinde yanıt · Bilgileriniz gizli tutulur',
  '<span data-i18n="form.privacy">48 saat içinde yanıt · Bilgileriniz gizli tutulur</span>'
);
// Success message
html = html.replace(
  '✓ Mesajınız alındı — en geç 48 saat içinde dönüş yapılacak.',
  '<span data-i18n="form.success">✓ Mesajınız alındı — en geç 48 saat içinde dönüş yapılacak.</span>'
);

// ─── 8. Footer copyright ─────────────────────────────────────────────────────
html = html.replace(
  '<span style="font-family:\'JetBrains Mono Variable\',monospace;font-size:9px;letter-spacing:1.5px;color:rgba(255,255,255,.18);text-transform:uppercase">© 2026 ZYT Global Industry Grubu — Tüm Hakları Saklıdır</span>',
  '<span style="font-family:\'JetBrains Mono Variable\',monospace;font-size:9px;letter-spacing:1.5px;color:rgba(255,255,255,.18);text-transform:uppercase" data-i18n="foot.copy">© 2026 ZYT Global Industry Grubu — Tüm Hakları Saklıdır</span>'
);

// ─── 9. Replace the broken lang-switcher JS with full setLang implementation ──
const OLD_LANG_JS = `/* Lang switcher */
document.querySelectorAll('[data-lang]').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('[data-lang]').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll(\`[data-lang="\${btn.dataset.lang}"]\`).forEach(b=>b.classList.add('active'));
  });
});`;

const NEW_LANG_JS = `/* i18n */
const T={
  tr:{
    'nav.about':'Hakkımızda','nav.companies':'Şirketlerimiz','nav.contact':'İletişim',
    'hero.eyebrow':'// ZYT Global Industry · İletişim',
    'hero.title':'Projenizi <span style="color:#2874B2;font-weight:500">konuşalım.</span>',
    'hero.sub':'Şirketlerimizden biriyle çalışmak için formu doldurun ya da doğrudan ulaşın — 48 saat içinde uzman ekibimizden yanıt alırsınız.',
    'qc.phone.label':'Telefon','qc.phone.sub':'Pazartesi – Cuma, 09:00 – 18:00',
    'qc.email.label':'E-Posta','qc.email.sub':'48 saat içinde yanıt',
    'qc.address.label':'Adres','qc.address.val':'Ankara, Türkiye','qc.address.sub':'Genel Merkez',
    'ct.tag':'§ 01 / Bize Ulaşın',
    'ct.title':'Birlikte <span style="color:#2874B2;font-weight:500">büyüyelim.</span>',
    'ct.sub':'Beton santrali, galvaniz tesisi, enerji dönüşüm veya tedarik zinciri projeleriniz için doğru ekiple buluşun.',
    'ct.phone.label':'Telefon','ct.email.label':'E-Posta','ct.address.label':'Adres','ct.address.val':'Ankara, Türkiye',
    'wa.title':'Hızlı İletişim',
    'wa.desc':'WhatsApp üzerinden anlık mesaj gönderin — ekibimiz en kısa sürede yanıt verir.',
    'wa.btn':'WhatsApp ile Yaz',
    'soc.title':'Sosyal Medya',
    'form.tag':'§ 02 / Mesaj Gönder','form.title':'Teklif ve proje sorguları',
    'form.name.lbl':'Ad Soyad','form.name.ph':'Adınız Soyadınız',
    'form.company.lbl':'Şirket','form.company.ph':'Şirket Adı',
    'form.email.lbl':'E-Posta','form.email.ph':'email@sirket.com',
    'form.phone.lbl':'Telefon',
    'form.sector.lbl':'İlgili Şirket / Sektör',
    'form.topic.lbl':'Konu',
    'form.msg.lbl':'Mesajınız','form.msg.ph':'Projenizi kısaca anlatın — kapasite, lokasyon, bütçe aralığı veya diğer gereksinimlerinizi belirtin.',
    'form.submit':'Gönder',
    'form.privacy':'48 saat içinde yanıt · Bilgileriniz gizli tutulur',
    'form.success':'✓ Mesajınız alındı — en geç 48 saat içinde dönüş yapılacak.',
    'foot.copy':'© 2026 ZYT Global Industry Grubu — Tüm Hakları Saklıdır'
  },
  en:{
    'nav.about':'About','nav.companies':'Companies','nav.contact':'Contact',
    'hero.eyebrow':'// ZYT Global Industry · Contact',
    'hero.title':"Let\\'s discuss <span style=\\"color:#2874B2;font-weight:500\\">your project.</span>",
    'hero.sub':"Fill out the form or reach us directly — you\\'ll hear from our team within 48 hours.",
    'qc.phone.label':'Phone','qc.phone.sub':'Monday – Friday, 09:00 – 18:00',
    'qc.email.label':'E-Mail','qc.email.sub':'Reply within 48 hours',
    'qc.address.label':'Address','qc.address.val':'Ankara, Turkey','qc.address.sub':'Headquarters',
    'ct.tag':'§ 01 / Get in Touch',
    'ct.title':'Let\\'s grow <span style="color:#2874B2;font-weight:500">together.</span>',
    'ct.sub':'Connect with the right team for your concrete plant, galvanising facility, energy conversion or supply chain project.',
    'ct.phone.label':'Phone','ct.email.label':'E-Mail','ct.address.label':'Address','ct.address.val':'Ankara, Turkey',
    'wa.title':'Quick Contact',
    'wa.desc':'Send an instant message on WhatsApp — our team will reply as soon as possible.',
    'wa.btn':'Write on WhatsApp',
    'soc.title':'Social Media',
    'form.tag':'§ 02 / Send a Message','form.title':'Quote & project enquiries',
    'form.name.lbl':'Full Name','form.name.ph':'Your Name',
    'form.company.lbl':'Company','form.company.ph':'Company Name',
    'form.email.lbl':'E-Mail','form.email.ph':'email@company.com',
    'form.phone.lbl':'Phone',
    'form.sector.lbl':'Relevant Company / Sector',
    'form.topic.lbl':'Subject',
    'form.msg.lbl':'Your Message','form.msg.ph':'Briefly describe your project — capacity, location, budget or other requirements.',
    'form.submit':'Send',
    'form.privacy':'Reply within 48 h · Your information is kept confidential',
    'form.success':'✓ Message received — we will get back to you within 48 hours.',
    'foot.copy':'© 2026 ZYT Global Industry Group — All Rights Reserved'
  },
  ar:{
    'nav.about':'من نحن','nav.companies':'شركاتنا','nav.contact':'اتصل بنا',
    'hero.eyebrow':'// ZYT Global Industry · التواصل',
    'hero.title':'دعنا نتحدث عن <span style="color:#2874B2;font-weight:500">مشروعك.</span>',
    'hero.sub':'أملأ النموذج أو تواصل معنا مباشرةً — سيرد فريقنا خلال 48 ساعة.',
    'qc.phone.label':'هاتف','qc.phone.sub':'الاثنين – الجمعة، 09:00 – 18:00',
    'qc.email.label':'البريد الإلكتروني','qc.email.sub':'رد خلال 48 ساعة',
    'qc.address.label':'العنوان','qc.address.val':'أنقرة، تركيا','qc.address.sub':'المقر الرئيسي',
    'ct.tag':'§ 01 / تواصل معنا',
    'ct.title':'لننمو <span style="color:#2874B2;font-weight:500">معاً.</span>',
    'ct.sub':'تواصل مع الفريق المناسب لمشروع محطة خرسانة أو منشأة جلفنة أو تحويل طاقة أو سلسلة توريد.',
    'ct.phone.label':'هاتف','ct.email.label':'البريد الإلكتروني','ct.address.label':'العنوان','ct.address.val':'أنقرة، تركيا',
    'wa.title':'تواصل سريع',
    'wa.desc':'أرسل رسالة فورية عبر واتساب — سيرد فريقنا في أقرب وقت ممكن.',
    'wa.btn':'اكتب عبر واتساب',
    'soc.title':'وسائل التواصل الاجتماعي',
    'form.tag':'§ 02 / أرسل رسالة','form.title':'استفسارات العروض والمشاريع',
    'form.name.lbl':'الاسم الكامل','form.name.ph':'اسمك الكامل',
    'form.company.lbl':'الشركة','form.company.ph':'اسم الشركة',
    'form.email.lbl':'البريد الإلكتروني','form.email.ph':'email@company.com',
    'form.phone.lbl':'هاتف',
    'form.sector.lbl':'الشركة / القطاع المعني',
    'form.topic.lbl':'الموضوع',
    'form.msg.lbl':'رسالتك','form.msg.ph':'صف مشروعك باختصار — السعة، الموقع، نطاق الميزانية أو المتطلبات الأخرى.',
    'form.submit':'إرسال',
    'form.privacy':'رد خلال 48 ساعة · معلوماتك تُحفظ بسرية',
    'form.success':'✓ تم استلام رسالتك — سنتواصل معك خلال 48 ساعة.',
    'foot.copy':'© 2026 مجموعة ZYT Global Industry — جميع الحقوق محفوظة'
  }
};
function setLang(l){
  const t=T[l];if(!t)return;
  document.documentElement.lang=l;
  document.documentElement.dir=l==='ar'?'rtl':'ltr';
  document.querySelectorAll('[data-i18n]').forEach(e=>{const v=t[e.dataset.i18n];if(v!==undefined)e.textContent=v});
  document.querySelectorAll('[data-i18n-html]').forEach(e=>{const v=t[e.dataset.i18nHtml];if(v!==undefined)e.innerHTML=v});
  document.querySelectorAll('[data-i18n-ph]').forEach(e=>{const v=t[e.dataset.i18nPh];if(v!==undefined)e.placeholder=v});
  document.querySelectorAll('.l-btn,.mob-l-btn').forEach(b=>b.classList.toggle('active',b.dataset.lang===l));
  localStorage.setItem('zyt-lang',l);
}
const _l=localStorage.getItem('zyt-lang')||(navigator.language.startsWith('ar')?'ar':navigator.language.startsWith('tr')?'tr':'en');
setLang(_l);
document.querySelectorAll('.l-btn,.mob-l-btn').forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.lang)));`;

if (html.includes(OLD_LANG_JS)) {
  html = html.replace(OLD_LANG_JS, NEW_LANG_JS);
  console.log('Lang JS replaced');
} else {
  console.log('WARNING: old lang JS not found — check string');
}

fs.writeFileSync('iletisim.html', html, 'utf8');
console.log('iletisim.html i18n done');
