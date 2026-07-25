// ============================================================
// curriculum-licensing — static site generator
// Emits ecosystem-consistent HTML using aloha-ds.css chrome.
// Run: node build.mjs
// ============================================================
import { writeFileSync } from 'node:fs';

const SITE = 'https://curriculum-licensing.vercel.app';
const EMAIL = 'collins.ra@northeastern.edu';
const ALOHA = 'https://aloha-ai-consulting.vercel.app';
const ALOHA_U = 'https://aloha-ai-consulting.vercel.app/university';

const leaf = (fill) =>
  `<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c3 3.5 4.5 6.5 4.5 9.2 0 3.4-2 5.8-4.5 5.8s-4.5-2.4-4.5-5.8C7.5 8.5 9 5.5 12 2z" fill="${fill}"/><path d="M4 20c3-1.2 5.4-1.8 8-1.8s5 .6 8 1.8" stroke="${fill}" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>`;

const NAV_LINKS = [
  ['/programs', 'Programs'],
  ['/courses', 'Courses'],
  ['/curriculum-development', 'Development'],
  ['/licensing', 'Licensing'],
  ['/method', 'Method'],
  ['/about', 'About'],
];

function head(title, desc, canonical) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="${SITE}${canonical}">
<meta name="theme-color" content="#14201C">
<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${SITE}${canonical}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<script>document.documentElement.className+=' js';</script>
<link rel="stylesheet" href="/aloha-ds.css">
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Service","serviceType":"Academic curriculum development and licensing","provider":{"@type":"Person","name":"RN Collins","jobTitle":"Curriculum architect and academic program developer"},"areaServed":"US","url":"${SITE}${canonical}","description":"${desc}","brand":{"@type":"Organization","name":"Rayven-Nikkita Collins LLC"}}
</script>
<style>
  .hero{position:relative;overflow:hidden;background:var(--grad-hero);color:var(--cream);
    padding-block:clamp(60px,9vw,128px) clamp(48px,6vw,88px);border-bottom:3px solid var(--teal)}
  .hero::before{content:"";position:absolute;inset:0;background-image:radial-gradient(rgba(127,224,196,.05) 1px,transparent 1px);
    background-size:26px 26px;-webkit-mask-image:linear-gradient(180deg,rgba(0,0,0,.6),transparent 70%);mask-image:linear-gradient(180deg,rgba(0,0,0,.6),transparent 70%);pointer-events:none}
  .hero>.wrap{position:relative}
  .hero .display{color:var(--cream);max-width:20ch;margin-bottom:var(--s4)}
  .hero .lead{color:#CFDAD5;max-width:62ch}
  .hero em{color:var(--teal-mint);font-style:normal}
  .hero__cta{display:flex;gap:.7rem;flex-wrap:wrap;margin-top:var(--s5)}
  .hero__meta{margin-top:var(--s5);font-family:var(--mono);font-size:var(--fs-xs);color:#9FB6AE;letter-spacing:.04em;line-height:1.8}
  .hero__meta b{color:var(--cream)}
  .livebadge{display:inline-flex;align-items:center;gap:.5rem;font-family:var(--mono);font-size:var(--fs-xs);
    letter-spacing:.08em;text-transform:uppercase;color:#CDE7DF;border:1px solid #2F4A42;border-radius:var(--r-pill);padding:.34rem .72rem;margin-bottom:var(--s4)}
  .livebadge .dot{width:7px;height:7px;border-radius:50%;background:var(--teal-mint)}
  .sec-head{margin-bottom:var(--s6);max-width:72ch}
  .sec-head .h2{margin-bottom:var(--s3)}
  .pagehead{padding-block:clamp(48px,6vw,84px) clamp(28px,3vw,40px);background:var(--grad-ink);color:var(--cream);border-bottom:3px solid var(--teal)}
  .pagehead .display,.pagehead .h1{color:var(--cream)}
  .pagehead .lead{color:#CFDAD5}
  .card .go{font-family:var(--mono);font-size:var(--fs-xs);color:var(--teal-d);text-transform:uppercase;letter-spacing:.06em;margin-top:.7rem;display:inline-block}
  .card--hover:hover .go{text-decoration:underline}
  .kv{font-family:var(--mono);font-size:var(--fs-xs);letter-spacing:.04em;color:var(--muted);text-transform:uppercase}
  .num-stat{font-family:var(--serif);font-size:2rem;color:var(--teal-d);line-height:1}
  .section--ink .num-stat{color:var(--teal-mint)}
  .clist{list-style:none;margin:0;padding:0}
  .clist li{padding-left:1.4rem;position:relative;margin-bottom:.5rem}
  .clist li::before{content:"";position:absolute;left:0;top:.5em;width:8px;height:8px;border-radius:2px;background:var(--grad-mint-rule)}
  .courserow{display:grid;grid-template-columns:auto 1fr auto;gap:var(--s4);align-items:baseline;padding:var(--s4) 0;border-bottom:1px solid var(--line)}
  .courserow:last-child{border-bottom:0}
  .courserow .code{font-family:var(--mono);font-size:var(--fs-sm);color:var(--teal-d);letter-spacing:.03em}
  .courserow .cr{font-family:var(--mono);font-size:var(--fs-xs);color:var(--muted)}
  @media(max-width:640px){.courserow{grid-template-columns:1fr;gap:var(--s1)}}
  .offergrid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:var(--s5)}
  @media(max-width:820px){.offergrid{grid-template-columns:1fr}}
  .phase{border-left:2px solid var(--line-2);padding:0 0 var(--s5) var(--s5);position:relative;margin-left:.4rem}
  .phase::before{content:"";position:absolute;left:-6px;top:.2rem;width:10px;height:10px;border-radius:50%;background:var(--teal);border:2px solid var(--paper)}
  .phase:last-child{padding-bottom:0}
  .phase .p-num{font-family:var(--mono);font-size:var(--fs-xs);letter-spacing:.1em;color:var(--teal-d);text-transform:uppercase}
</style>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
${nav()}
<main id="main">`;
}

function nav() {
  const links = NAV_LINKS.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('\n');
  return `<header class="nav">
  <div class="nav__in">
    <a class="nav__brand" href="/" aria-label="RN Collins Curriculum home">
      ${leaf('#1B7A68')}
      RN&nbsp;Collins&nbsp;·&nbsp;Curriculum
    </a>
    <button class="nav__burger" id="burger" aria-expanded="false" aria-controls="navlinks" aria-label="Open menu">
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
    </button>
    <nav aria-label="Primary">
      <ul class="nav__links" id="navlinks">
${links}
<li class="nav__cta"><a class="btn btn--primary btn--sm" href="/request">Request a proposal →</a></li>
</ul>
    </nav>
  </div>
</header>`;
}

function footer() {
  return `</main>
<footer class="footer" aria-labelledby="foot-h">
  <div class="wrap">
    <h2 id="foot-h" class="small" style="position:absolute;left:-999px">Site footer</h2>
    <div class="footer__grid">
      <div>
        <a class="nav__brand" href="/" style="color:var(--cream)" aria-label="RN Collins Curriculum home">${leaf('#7FE0C4')} RN&nbsp;Collins&nbsp;·&nbsp;Curriculum</a>
        <p class="small" style="margin-top:var(--s3);max-width:40ch;color:#9FB6AE">Complete, delivery-ready academic programs and courses for institutions — available to license, customize, or commission from scratch.</p>
      </div>
      <div>
        <h3>Curriculum</h3>
        <ul>
          <li><a href="/programs">Programs</a></li>
          <li><a href="/courses">Individual courses</a></li>
          <li><a href="/curriculum-development">Curriculum development</a></li>
          <li><a href="/licensing">Licensing</a></li>
          <li><a href="/method">Method</a></li>
          <li><a href="/services-rendered">Services rendered</a></li>
          <li><a href="/request">Request a proposal</a></li>
        </ul>
      </div>
      <div>
        <h3>Ecosystem</h3>
        <ul>
          <li><a href="${ALOHA}" target="_blank" rel="noopener">Aloha AI →</a></li>
          <li><a href="${ALOHA_U}" target="_blank" rel="noopener">Aloha AI University</a></li>
          <li><a href="/about">About RN Collins</a></li>
          <li><a href="https://www.linkedin.com/in/rn-collins" target="_blank" rel="noopener">LinkedIn</a></li>
          <li><a href="mailto:${EMAIL}?subject=Curriculum%20licensing%20inquiry">${EMAIL}</a></li>
          <li><a href="/privacy">Privacy</a></li>
          <li><a href="/terms">Terms</a></li>
        </ul>
      </div>
    </div>
    <p class="disc small">Institutions are responsible for their own academic approval, faculty assignment, student administration, and any accreditation implications. Certification mappings describe alignment only and do not guarantee that course completion alone confers any external certification.</p>
    <p class="fine">RN Collins Curriculum &amp; Learning Systems · a line of Rayven-Nikkita Collins LLC · Cookieless · privacy-first · © 2026</p>
  </div>
</footer>
${scripts()}
</body>
</html>`;
}

function scripts() {
  return `<script>
  (function(){var b=document.getElementById('burger'),l=document.getElementById('navlinks');
  function set(o){b.setAttribute('aria-expanded',o);l.classList.toggle('open',o);b.setAttribute('aria-label',o?'Close menu':'Open menu');}
  b.addEventListener('click',function(){set(b.getAttribute('aria-expanded')!=='true');});
  l.addEventListener('click',function(e){if(e.target.tagName==='A')set(false);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false);});})();
  document.querySelectorAll('.acc__btn').forEach(function(btn){var p=document.getElementById(btn.getAttribute('aria-controls'));
    btn.addEventListener('click',function(){var o=btn.getAttribute('aria-expanded')==='true';btn.setAttribute('aria-expanded',!o);p.style.maxHeight=o?null:p.scrollHeight+'px';});});
  (function(){var nav=document.querySelector('.nav');if(!nav)return;var on=function(){nav.classList.toggle('is-stuck',window.scrollY>8);};on();window.addEventListener('scroll',on,{passive:true});})();
  (function(){if(matchMedia('(prefers-reduced-motion:reduce)').matches){document.querySelectorAll('.reveal').forEach(function(e){e.classList.add('in');});return;}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(e){io.observe(e);});})();
</script>`;
}

function page(file, title, desc, canonical, body) {
  writeFileSync(new URL('./' + file, import.meta.url), head(title, desc, canonical) + body + footer());
  console.log('wrote', file);
}

// ---- shared content fragments ---------------------------------
const acc = (id, q, a) => `<div class="acc"><button class="acc__btn" id="b-${id}" aria-expanded="false" aria-controls="p-${id}">${q}<span class="acc__ic" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></span></button><div class="acc__panel" id="p-${id}" role="region" aria-labelledby="b-${id}"><div class="acc__panel-inner">${a}</div></div></div>`;

// programs data
const AIML = {
  code: 'BSAIML',
  slug: 'ai-machine-learning',
  title: 'B.S. in Artificial Intelligence and Machine Learning',
  short: 'AI &amp; Machine Learning',
  blurb: 'A 30-credit, ten-course program that moves students from AI foundations and programming through model development, evaluation, responsible AI, deployment, and an integrative capstone.',
  outcomes: [
    'Explain core AI and machine-learning concepts and select appropriate methods for a problem.',
    'Prepare data and engineer features for supervised and unsupervised learning.',
    'Build, train, and evaluate models using industry-standard tools and workflows.',
    'Apply responsible-AI, privacy, and security principles across the model lifecycle.',
    'Deploy and monitor models and communicate results to technical and non-technical audiences.',
    'Produce a professional capstone artifact demonstrating integrated, independent work.',
  ],
  courses: [
    ['AI 1000', 'Foundations of Artificial Intelligence', 'Core', 'The model course: what AI is, its history, capabilities, limits, and the landscape of methods and tools.'],
    ['AI 1100', 'Programming for AI', 'Core', 'Python for data and modeling — environments, libraries, notebooks, and reproducible workflows.'],
    ['AI 1200', 'Data Preparation and Feature Engineering', 'Core', 'Sourcing, cleaning, transforming, and engineering data into model-ready features.'],
    ['AI 2000', 'Machine Learning Concepts and Methods', 'Core', 'Supervised and unsupervised learning, model families, and the bias–variance tradeoff.'],
    ['AI 2100', 'Model Development and Training', 'Core', 'Building and training models, tuning, and managing experiments end to end.'],
    ['AI 2200', 'Model Evaluation and Validation', 'Core', 'Metrics, validation strategy, error analysis, and honest reporting of performance.'],
    ['AI 2300', 'Responsible AI, Ethics, and Privacy', 'Core', 'Fairness, transparency, accountability, privacy, and governance across the lifecycle.'],
    ['AI 3100', 'Deployment and MLOps', 'Core', 'Packaging, serving, monitoring, and maintaining models in production environments.'],
    ['AI 3300', 'Generative AI and Large Language Models', 'Elective', 'Foundation models, prompting, retrieval, evaluation, and safe application patterns.'],
    ['AI 3400', 'Applied AI for Regulated Industries', 'Elective', 'Deploying AI where privacy, security, and regulatory constraints govern the work.'],
    ['AI 3500', 'Human-Centered AI Design', 'Elective', 'Designing AI products around how people understand, trust, and adopt them.'],
    ['AI 4000', 'AI/ML Capstone', 'Capstone', 'An integrative, professional project defended before faculty and documented as a portfolio artifact.'],
  ],
  areas: ['AI foundations', 'Machine learning', 'Data preparation', 'Programming', 'Model development', 'Model evaluation', 'Responsible AI', 'Privacy &amp; security', 'Deployment / MLOps', 'Human-centered design', 'Generative AI', 'Capstone'],
};

const CYB = {
  code: 'BSCYBER',
  slug: 'cybersecurity-critical-infrastructure',
  title: 'B.S. in Cybersecurity and Critical Infrastructure Protection',
  short: 'Cybersecurity &amp; Critical Infrastructure',
  blurb: 'A 30-credit, ten-course program spanning cybersecurity foundations, governance and risk, detection and response, security architecture, offensive security, and the protection of critical infrastructure and industrial control systems.',
  outcomes: [
    'Apply cybersecurity foundations, terminology, and controls across an organization.',
    'Assess risk and align programs to governance, compliance, and regulatory requirements.',
    'Detect, investigate, and respond to threats and incidents, including forensic analysis.',
    'Design and evaluate secure architectures for enterprise and operational-technology environments.',
    'Analyze threats to critical infrastructure, industrial control systems, and supply chains.',
    'Lead security initiatives and produce a professional capstone demonstrating integrated mastery.',
  ],
  courses: [
    ['CYB 1000', 'Cybersecurity Foundations', 'Core', 'Core concepts, the threat landscape, controls, and the vocabulary of the field.'],
    ['CYB 1100', 'Governance, Risk, and Compliance', 'Core', 'Risk frameworks, policy, and aligning security to regulation and standards.'],
    ['CYB 2000', 'Threat Detection and Monitoring', 'Core', 'Telemetry, detection engineering, and security monitoring in practice.'],
    ['CYB 2100', 'Incident Response and Digital Forensics', 'Core', 'Response lifecycle, evidence handling, and forensic investigation.'],
    ['CYB 2200', 'Security Architecture and Engineering', 'Core', 'Designing, hardening, and evaluating secure systems and networks.'],
    ['CYB 3000', 'Offensive Security and Adversary Emulation', 'Core', 'Ethical offensive techniques, testing, and thinking like an adversary.'],
    ['CYB 3100', 'Critical Infrastructure Protection', 'Core', 'Protecting the sectors and systems that society depends on.'],
    ['CYB 3200', 'Industrial Control Systems and OT Security', 'Core', 'Securing ICS/SCADA and operational-technology environments.'],
    ['CYB 3300', 'Cybersecurity Leadership and Program Management', 'Elective', 'Building, running, and communicating a security program.'],
    ['CYB 3400', 'Transportation Systems Security', 'Elective', 'Security across transportation and mobility infrastructure.'],
    ['CYB 3500', 'Supply-Chain Security and Emerging Technology', 'Elective', 'Third-party, supply-chain, and emerging-technology risk.'],
    ['CYB 4000', 'Cybersecurity Capstone', 'Capstone', 'An integrative, professional project defended before faculty and documented as a portfolio artifact.'],
  ],
  areas: ['Cybersecurity foundations', 'Governance &amp; risk', 'Threat detection', 'Incident response', 'Digital forensics', 'Security architecture', 'Offensive security', 'Critical infrastructure', 'Industrial control systems', 'Transportation systems', 'Supply-chain security', 'Regulatory compliance'],
};

const PROGRAMS = [AIML, CYB];

// ================= PAGES ==================

// ---------- HOME ----------
page('index.html',
  'RN Collins Curriculum — License complete academic programs, or commission a curriculum built for your institution',
  'Complete, delivery-ready academic programs and courses for colleges, universities, agencies, and employers — available to license, customize, or commission from scratch. By RN Collins.',
  '/',
  `<section class="hero">
    <div class="wrap">
      <span class="livebadge"><span class="dot"></span> Institutional curriculum · licensing &amp; development</span>
      <p class="eyebrow" style="color:var(--teal-mint)">RN Collins Curriculum &amp; Learning Systems</p>
      <h1 class="display">Complete courses, academic programs, and curriculum-development services.</h1>
      <p class="lead">RN Collins develops and licenses complete academic curricula for colleges, universities, corporations, government agencies, workforce-development organizations, and training providers. <em>License what already exists. Customize it for your institution. Commission something new.</em></p>
      <div class="hero__cta">
        <a class="btn btn--primary" href="/programs">Browse programs →</a>
        <a class="btn btn--ghost" href="/curriculum-development">Commission development</a>
        <a class="btn btn--ghost" href="/request">Request licensing information</a>
      </div>
      <p class="hero__meta">Every curriculum is built as an <b>operational instructional system</b>, not a course outline — program architecture, weekly modules, session plans, labs, assessments, rubrics, faculty &amp; student guides, and implementation documentation.</p>
    </div>
  </section>

  <section class="section section--paper">
    <div class="wrap">
      <div class="sec-head reveal">
        <p class="eyebrow">The offer in one sentence</p>
        <h2 class="h2">License a complete course or academic program, or commission a curriculum built specifically for your institution.</h2>
      </div>
      <div class="offergrid">
        <a class="card card--hover reveal" href="/licensing">
          <div class="card__ic"><svg width="20" height="20" viewBox="0 0 24 24"><path d="M4 4h16v16H4z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></div>
          <h3>License existing curriculum</h3>
          <p class="muted small">For institutions that need a high-quality course or program without starting development from zero. Adopt an existing course, collection, or complete program with defined licensing and customization options.</p>
          <span class="go">See licensing →</span>
        </a>
        <a class="card card--hover reveal" href="/curriculum-development">
          <div class="card__ic"><svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 3v18M3 12h18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></div>
          <h3>Commission development</h3>
          <p class="muted small">For institutions with a new idea, outdated curriculum, specialized audience, or unique delivery requirements. A purpose-built program or course system designed around your goals.</p>
          <span class="go">See development →</span>
        </a>
        <a class="card card--hover reveal" href="/request">
          <div class="card__ic"><svg width="20" height="20" viewBox="0 0 24 24"><path d="M4 4h16v12H7l-3 3z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg></div>
          <h3>License and customize</h3>
          <p class="muted small">Take an existing foundation and adapt it — branding, modality, calendar, LMS, policies, jurisdiction — with implementation and faculty support.</p>
          <span class="go">Request a proposal →</span>
        </a>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="sec-head reveal">
        <p class="eyebrow">Available to license</p>
        <h2 class="h2">Complete degree programs, built to be taught.</h2>
        <p class="lead">Each program is a coordinated system of ten three-credit, seven-week courses — 30 credits toward completion — with weekly modules, assessments, and full instructor and student documentation.</p>
      </div>
      <div class="grid grid-2">
        ${PROGRAMS.map(p => `<a class="card card--hover reveal" href="/programs/${p.slug}">
          <p class="kv">${p.code} · 30 credits · 10 courses · 7-week format</p>
          <h3 style="margin-top:.4rem">${p.title}</h3>
          <p class="muted small">${p.blurb}</p>
          <span class="go">View program →</span>
        </a>`).join('\n')}
      </div>
    </div>
  </section>

  <section class="section section--ink">
    <div class="wrap">
      <div class="grid grid-2" style="align-items:center">
        <div class="reveal">
          <p class="eyebrow">Part of the ecosystem</p>
          <h2 class="h2" style="color:var(--cream)">Looking for applied AI courses instead?</h2>
          <p class="lead">This site licenses <b style="color:var(--teal-mint)">institutional, credit-bearing curriculum</b> to organizations. If you're an individual, team, or organization looking to learn and use AI directly, that's <b style="color:var(--teal-mint)">Aloha AI</b> — a separate practice with its own courses, playbooks, and tools.</p>
          <div class="hero__cta">
            <a class="btn btn--primary" href="${ALOHA}" target="_blank" rel="noopener">Visit Aloha AI →</a>
            <a class="btn btn--ghost" href="${ALOHA_U}" target="_blank" rel="noopener">Aloha AI University</a>
          </div>
        </div>
        <div class="reveal">
          <div class="moat" style="display:grid;grid-template-columns:1fr 1fr;gap:.6rem">
            <div class="m" style="border:1px solid #2F4A42;border-radius:var(--r-sm);padding:.9rem;background:rgba(255,255,255,.03)"><div class="t" style="font-family:var(--serif);color:var(--cream);margin-bottom:.2rem">Institutional curriculum</div><div class="small" style="color:#9FB6AE">Licensed to colleges &amp; agencies. Credit-bearing. Taught by their faculty.</div></div>
            <div class="m" style="border:1px solid #2F4A42;border-radius:var(--r-sm);padding:.9rem;background:rgba(255,255,255,.03)"><div class="t" style="font-family:var(--serif);color:var(--cream);margin-bottom:.2rem">Aloha AI courses</div><div class="small" style="color:#9FB6AE">Direct-to-learner AI education under the Aloha&nbsp;AI brand.</div></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--paper">
    <div class="wrap">
      <div class="sec-head reveal">
        <p class="eyebrow">Why the materials are comprehensive</p>
        <h2 class="h2">A rigorous, documented development method.</h2>
        <p class="lead">Programs are built in a deliberate order — architecture first, then course documentation, then weekly modules, then quality assurance — so the finished portfolio is coherent, teachable, and reviewable.</p>
      </div>
      <div class="grid grid-4 keep-2">
        ${[['01','Architecture','Degree structure, outcomes, sequence, prerequisites, and culminating experience.'],
           ['02','Course documentation','Scope, outcomes, assessments, and weekly progression — approved before weeks are built.'],
           ['03','Weekly modules','Session plans, labs, cases, discussions, assignments, and rubrics for every week.'],
           ['04','Quality assurance','Alignment, links, consistency, and cross-course review before anything circulates.']]
          .map(([n,t,d])=>`<div class="card reveal"><p class="kv" style="color:var(--teal-d)">${n}</p><h3 style="margin:.3rem 0 .4rem;font-size:var(--fs-h3)">${t}</h3><p class="muted small">${d}</p></div>`).join('\n')}
      </div>
      <div style="margin-top:var(--s6)"><a class="btn btn--outline" href="/method">See the full method →</a></div>
    </div>
  </section>

  ${ctaBand()}`
);

// ---------- PROGRAMS INDEX ----------
page('programs.html',
  'Programs — Complete academic programs available for institutional licensing | RN Collins Curriculum',
  'Complete 30-credit, ten-course academic programs available to license or customize: AI & Machine Learning, and Cybersecurity & Critical Infrastructure Protection.',
  '/programs',
  `${pagehead('Programs', 'Complete academic programs available for licensing or customization', 'Each program is a coordinated set of institutional documents and ten three-credit, seven-week courses totaling 30 credits — delivered as an operational instructional system, not a course list.')}
  <section class="section">
    <div class="wrap">
      <div class="grid grid-2">
        ${PROGRAMS.map(p => `<a class="card card--hover reveal" href="/programs/${p.slug}">
          <p class="kv">${p.code} · 30 credits · 10 courses · 7-week format</p>
          <h3 style="margin-top:.4rem">${p.title}</h3>
          <p class="muted small">${p.blurb}</p>
          <span class="go">View program →</span>
        </a>`).join('\n')}
      </div>
      <div class="card reveal" style="margin-top:var(--s6);background:var(--teal-l);border-color:#BADFD6">
        <h3 style="font-size:var(--fs-h3)">Additional programs</h3>
        <p class="muted small" style="margin-bottom:0">Other bachelor's and master's concepts have been discussed within this portfolio. New programs and courses are developed only from documented prior approval — never by inference. To discuss a program not listed here, <a href="/request">request a proposal</a>.</p>
      </div>
    </div>
  </section>
  ${ctaBand()}`
);

// ---------- PROGRAM DETAIL PAGES ----------
for (const p of PROGRAMS) {
  const coreCount = p.courses.filter(c => c[2] === 'Core').length;
  page(`programs/${p.slug}.html`,
    `${p.title} — Available for institutional licensing | RN Collins Curriculum`,
    p.blurb.replace(/&amp;/g, '&'),
    `/programs/${p.slug}`,
    `${pagehead(p.title, `${p.code} · 30 credits · 10 courses · 7-week format`, p.blurb)}
    <section class="section">
      <div class="wrap">
        <div class="grid grid-4 keep-2" style="margin-bottom:var(--s7)">
          ${[['30','Total credits'],['10','Courses to complete'],['3','Credits per course'],['7','Weeks per course']]
            .map(([n,l])=>`<div class="reveal"><div class="num-stat">${n}</div><p class="kv" style="margin-top:.3rem">${l}</p></div>`).join('\n')}
        </div>
        <div class="grid grid-2">
          <div class="reveal">
            <p class="eyebrow">Program learning outcomes</p>
            <h2 class="h2" style="margin-bottom:var(--s4)">What a graduate can do</h2>
            <ul class="clist">${p.outcomes.map(o=>`<li>${o}</li>`).join('')}</ul>
          </div>
          <div class="reveal">
            <p class="eyebrow">Coverage</p>
            <h2 class="h2" style="margin-bottom:var(--s4)">Disciplinary areas</h2>
            <div style="display:flex;flex-wrap:wrap;gap:.5rem">${p.areas.map(a=>`<span class="chip chip--src">${a}</span>`).join('')}</div>
          </div>
        </div>
      </div>
    </section>
    <section class="section section--paper">
      <div class="wrap">
        <div class="sec-head reveal">
          <p class="eyebrow">Curriculum</p>
          <h2 class="h2">Course inventory</h2>
          <p class="lead">${coreCount} core courses plus electives and a capstone. Students complete ten three-credit courses for 30 credits; the approved inventory is larger to support elective choice.</p>
        </div>
        <div class="card reveal" style="padding:0 var(--s5)">
          ${p.courses.map(([code,title,type,desc])=>`<div class="courserow">
            <span class="code">${code}</span>
            <span><b>${title}</b><br><span class="muted small">${desc}</span></span>
            <span class="cr">${type} · 3 cr</span>
          </div>`).join('\n')}
        </div>
        <p class="muted small" style="margin-top:var(--s4)">Each course licenses with complete documentation, seven weekly modules, three-hour synchronous session plans, asynchronous activities, labs or cases, assignments, rubrics, and instructor &amp; student guides. See <a href="/courses">individual courses</a>.</p>
      </div>
    </section>
    <section class="section">
      <div class="wrap">
        <div class="sec-head reveal">
          <p class="eyebrow">Available for licensing and customization</p>
          <h2 class="h2">Adopt it as-is, or adapt it to your institution</h2>
        </div>
        <div class="measure reveal">
          <p>This program is available for institutional licensing. It may be adopted as a complete curriculum or customized for your academic model, students, faculty, delivery schedule, modality, policies, branding, technology environment, accreditation needs, and regional or industry context.</p>
          <p>The licensing package may include the program overview and rationale, program learning outcomes, curriculum structure and maps, required and elective courses with sequencing and prerequisites, complete course documentation, seven-week instructional modules, synchronous session plans, asynchronous activities, laboratories and case studies, assignments and rubrics, instructor and student guidance, certification and career mapping, capstone documentation, and implementation and quality-assurance materials.</p>
        </div>
        <div class="hero__cta" style="margin-top:var(--s5)">
          <a class="btn btn--primary" href="/request?program=${p.code}">Request a private curriculum review →</a>
          <a class="btn btn--outline" href="/licensing">Licensing details</a>
        </div>
      </div>
    </section>
    ${ctaBand()}`
  );
}

// ---------- COURSES ----------
page('courses.html',
  'Individual courses — License separately or assemble a tailored curriculum | RN Collins Curriculum',
  'Individual three-credit, seven-week courses available to license on their own, combined into a collection, or acquired as part of a complete program.',
  '/courses',
  `${pagehead('Individual courses', 'Available individually or as part of a complete program', 'Any course may be licensed on its own, combined with others into a tailored collection, or acquired as part of the complete program — and customized for different audiences, schedules, modalities, industries, or jurisdictions.')}
  <section class="section">
    <div class="wrap">
      <div class="sec-head reveal">
        <p class="eyebrow">What a licensed course includes</p>
        <h2 class="h2">More than a syllabus — a complete instructional unit</h2>
      </div>
      <div class="grid grid-3">
        ${[['Course documentation','Complete syllabus, scope, rationale, prerequisites, and program alignment.'],
           ['Seven weekly modules','Weekly outcomes, three-hour session plans, and asynchronous activities.'],
           ['Labs, workshops, cases','Environment, setup, procedure, expected output, and troubleshooting.'],
           ['Assessments &amp; rubrics','Assignments, projects, discussions, and matching grading rubrics.'],
           ['Instructor &amp; student guides','Preparation, facilitation, grading, and step-by-step student instructions.'],
           ['Alignment &amp; support','Career and certification mapping, technology requirements, and implementation support.']]
          .map(([t,d])=>`<div class="card reveal"><h3 style="font-size:var(--fs-h3)">${t}</h3><p class="muted small" style="margin-bottom:0">${d}</p></div>`).join('\n')}
      </div>
    </div>
  </section>
  ${PROGRAMS.map(p=>`<section class="section section--paper">
    <div class="wrap">
      <div class="sec-head reveal">
        <p class="eyebrow">${p.code}</p>
        <h2 class="h2">${p.title}</h2>
      </div>
      <div class="card reveal" style="padding:0 var(--s5)">
        ${p.courses.map(([code,title,type,desc])=>`<div class="courserow"><span class="code">${code}</span><span><b>${title}</b><br><span class="muted small">${desc}</span></span><span class="cr">${type} · 3 cr</span></div>`).join('\n')}
      </div>
    </div>
  </section>`).join('\n')}
  ${ctaBand()}`
);

// ---------- CURRICULUM DEVELOPMENT ----------
page('curriculum-development.html',
  'Curriculum development — Custom academic and workforce program development | RN Collins Curriculum',
  'Design, redesign, expand, modernize, or quality-control academic and professional-learning programs — from a single course to a full degree portfolio.',
  '/curriculum-development',
  `${pagehead('Curriculum development', 'Custom academic and workforce program development', 'From a broad idea, an incomplete proposal, an outdated catalog, or a new workforce requirement — through research, architecture, sequencing, course development, assessment design, documentation, implementation planning, and quality assurance.')}
  <section class="section">
    <div class="wrap">
      <div class="sec-head reveal"><p class="eyebrow">Services</p><h2 class="h2">What can be commissioned</h2></div>
      <div class="grid grid-3">
        ${['New degree-program development','Certificate-program development','Workforce &amp; professional-training programs','Individual course development','Accelerated-course conversion','Curriculum modernization','Online &amp; hybrid course design','Program &amp; course learning outcomes','Curriculum sequencing &amp; prerequisites','Curriculum &amp; competency mapping','Assessment systems','Laboratory &amp; case-study development','Faculty &amp; student documentation','Certification &amp; career alignment','Capstone design','Accessibility review','Program quality assurance','Implementation &amp; maintenance systems']
          .map(s=>`<div class="card reveal" style="padding:var(--s4)"><p style="margin:0"><b>${s}</b></p></div>`).join('\n')}
      </div>
    </div>
  </section>
  <section class="section section--paper">
    <div class="wrap">
      <div class="sec-head reveal"><p class="eyebrow">Scope</p><h2 class="h2">One course, or an entire portfolio</h2></div>
      <p class="lead measure reveal">Projects may involve a single course, a complete degree, a certificate, an internal academy, a professional-development program, or a larger portfolio of related offerings. Clients may begin with an existing course or program, commission an entirely new curriculum, or combine licensing with customization and implementation.</p>
      <div class="hero__cta" style="margin-top:var(--s5)"><a class="btn btn--primary" href="/request">Request a proposal →</a><a class="btn btn--outline" href="/method">See the method</a></div>
    </div>
  </section>
  ${ctaBand()}`
);

// ---------- LICENSING ----------
page('licensing.html',
  'Licensing — What institutions receive and how licensing works | RN Collins Curriculum',
  'Curriculum available for institutional licensing: what is included, permitted-use models, customization, implementation, and how to request pricing.',
  '/licensing',
  `${pagehead('Licensing', 'Curriculum available for institutional licensing', 'These are not topic lists, syllabus templates, or lightly developed shells. Each offering includes the instructional, assessment, faculty, student, and implementation materials necessary to support delivery.')}
  <section class="section">
    <div class="wrap">
      <div class="sec-head reveal"><p class="eyebrow">Permitted-use models</p><h2 class="h2">Licensing can be structured for</h2></div>
      <div class="grid grid-3">
        ${['One institution','One campus','Multiple campuses','A defined number of cohorts','A fixed license term','Annual renewal','Internal corporate or government training','Customized institutional use','White-label or co-branded delivery','Implementation with ongoing support']
          .map(s=>`<div class="card reveal" style="padding:var(--s4)"><p style="margin:0"><b>${s}</b></p></div>`).join('\n')}
      </div>
      <p class="muted small" style="margin-top:var(--s5)">Final licensing rights, permitted uses, modifications, delivery terms, and support services are defined in the applicable agreement.</p>
    </div>
  </section>
  <section class="section section--paper">
    <div class="wrap">
      <div class="sec-head reveal"><p class="eyebrow">What clients can buy</p><h2 class="h2">Products and services</h2></div>
      <div class="table-wrap reveal">
        <table class="data">
          <thead><tr><th>Product or service</th><th>Available as</th></tr></thead>
          <tbody>
          ${[['Complete academic program','License, purchase, customization, or custom development'],
             ['Individual academic course','License, purchase, customization, or custom development'],
             ['Course bundle','License or tailored collection'],
             ['Certificate curriculum','License or custom development'],
             ['Workforce-training program','License or custom development'],
             ['Faculty guide','Included package or standalone development'],
             ['Student guide','Included package or standalone development'],
             ['Assessment package','Included package or standalone development'],
             ['Laboratory / case-study collection','Included package or standalone development'],
             ['Curriculum / certification / career map','Consulting deliverable'],
             ['Program quality review','Professional service'],
             ['Curriculum modernization','Professional service'],
             ['LMS implementation support','Add-on service'],
             ['Faculty onboarding','Add-on service'],
             ['Annual curriculum maintenance','Ongoing service']]
            .map(([a,b])=>`<tr><td><b>${a}</b></td><td class="muted">${b}</td></tr>`).join('\n')}
          </tbody>
        </table>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="wrap">
      <div class="sec-head reveal"><p class="eyebrow">Questions</p><h2 class="h2">Licensing FAQ</h2></div>
      ${acc('lic1','Can we license a single course rather than a whole program?','Yes. Any course may be licensed individually, combined into a tailored collection, or acquired as part of the complete program.')}
      ${acc('lic2','Can the curriculum be customized for our institution?','Yes. Existing curriculum can be adapted to your academic calendar, students, faculty, LMS, technology environment, policies, brand, modality, and workforce needs — with implementation and faculty support as add-ons.')}
      ${acc('lic3','Do you provide implementation and faculty support?','Yes, as add-on services: LMS implementation support, faculty onboarding, and annual curriculum maintenance.')}
      ${acc('lic4','Does licensing include academic credit or accreditation?','No. Institutions are responsible for their own academic approval, faculty assignment, student administration, and any accreditation implications. Certification mappings describe alignment only.')}
      <div class="hero__cta" style="margin-top:var(--s6)"><a class="btn btn--primary" href="/request">Request licensing information →</a></div>
    </div>
  </section>`
);

// ---------- METHOD ----------
const phases = [
  ['Phase 1','Establish the program architecture','Resolve the problem the program addresses, the intended student, graduate capability, foundational vs. advanced competencies, required vs. elective structure, the culminating experience, target careers and certifications, feasible tools, and what can realistically be taught in seven-week courses — then convert the answers into a sequence.'],
  ['Phase 2','Define the program learning outcomes','Outcomes broad enough to describe graduate capability but specific enough to map to courses and assessments, each appearing meaningfully across the curriculum so nothing is claimed but untaught.'],
  ['Phase 3','Design the course sequence','Dependency analysis for each course — prerequisites, what it introduces, reinforces, and requires independently; which later courses depend on it; which outcomes it supports; and how it feeds the capstone.'],
  ['Phase 4','Create complete course documentation','Scope, outcomes, prerequisites, assessment weights, major assignments, required technologies, grading standards, and weekly progression — approved before any weekly development begins.'],
  ['Phase 5','Build the seven weekly modules','Each week expanded into full instructor and student documentation: weekly outcomes, authoritative resources, minute-by-minute session plan, lab/workshop/case, asynchronous work, assessment, rubric, and alignment checks.'],
  ['Phase 6','Program and course quality assurance','Review at the sentence, activity, week, course, program, operational, and institutional levels before anything circulates.'],
];
page('method.html',
  'Method — How each program and course is developed | RN Collins Curriculum',
  'The deliberate development sequence — architecture, outcomes, sequencing, course documentation, weekly modules, and multi-level quality assurance — that makes the finished materials comprehensive.',
  '/method',
  `${pagehead('Method', 'How each program and course is developed', 'The work follows a deliberate order. Reversing it creates gaps, rework, and inconsistent courses. Course documentation is always completed and approved before weekly development begins.')}
  <section class="section">
    <div class="wrap" style="max-width:820px">
      ${phases.map(([n,t,d])=>`<div class="phase reveal"><p class="p-num">${n}</p><h3 style="font-size:var(--fs-h3);margin:.2rem 0 .4rem">${t}</h3><p class="muted small" style="margin-bottom:0">${d}</p></div>`).join('\n')}
    </div>
  </section>
  <section class="section section--paper">
    <div class="wrap">
      <div class="sec-head reveal"><p class="eyebrow">Quality assurance</p><h2 class="h2">Review at every level</h2></div>
      <div class="grid grid-3">
        ${[['Sentence','Accurate, readable, unambiguous language.'],
           ['Activity','A student or instructor can carry it out from the instructions given.'],
           ['Week','Resources, session, and assessments support the week’s outcomes.'],
           ['Course','All seven weeks produce the course outcomes.'],
           ['Program','Courses collectively produce the program outcomes.'],
           ['Institutional','Consistent enough to be approved, assigned, taught, and maintained.']]
          .map(([t,d])=>`<div class="card reveal"><h3 style="font-size:var(--fs-h3)">${t} level</h3><p class="muted small" style="margin-bottom:0">${d}</p></div>`).join('\n')}
      </div>
    </div>
  </section>
  ${ctaBand()}`
);

// ---------- SERVICES RENDERED ----------
page('services-rendered.html',
  'Services rendered — The scale and rigor of the work | RN Collins Curriculum',
  'Evidence of the intellectual and production labor behind the portfolio — the functions performed, the deliverables produced, and a conservative reconstruction of the effort required.',
  '/services-rendered',
  `${pagehead('Services rendered', 'The scale, complexity, and rigor of the work', 'The visible files are the smaller part. The larger contribution is the architecture connecting them — the decisions, standards, mappings, research, sequencing, assessment logic, and quality controls that let the materials function as complete academic programs.')}
  <section class="section">
    <div class="wrap">
      <div class="grid grid-4 keep-2" style="margin-bottom:var(--s7)">
        ${[['14+','Development functions integrated'],['10','Courses per complete program'],['7','Weekly modules per course'],['1,700–3,200','Est. hours per program']]
          .map(([n,l])=>`<div class="reveal"><div class="num-stat">${n}</div><p class="kv" style="margin-top:.3rem">${l}</p></div>`).join('\n')}
      </div>
      <div class="sec-head reveal"><p class="eyebrow">One team, many roles</p><h2 class="h2">Functions performed in every program</h2></div>
      <div style="display:flex;flex-wrap:wrap;gap:.5rem">
        ${['Academic program architect','Curriculum designer','Instructional designer','Subject-matter researcher','Assessment designer','Faculty-development writer','Student-experience designer','Academic policy analyst','Career &amp; credential analyst','Accessibility reviewer','Documentation engineer','Copy editor','Quality-assurance reviewer','Project manager']
          .map(r=>`<span class="chip">${r}</span>`).join('')}
      </div>
    </div>
  </section>
  <section class="section section--paper">
    <div class="wrap">
      <div class="sec-head reveal"><p class="eyebrow">Conservative effort reconstruction</p><h2 class="h2">Estimated labor for one ten-course program</h2><p class="lead">Planning ranges, not time records. Actual effort varies with subject complexity, lab requirements, and revision volume.</p></div>
      <div class="table-wrap reveal">
        <table class="data">
          <thead><tr><th>Workstream</th><th>Conservative estimate</th></tr></thead>
          <tbody>
          ${[['Program research, rationale &amp; positioning','40–80 hrs'],
             ['Program outcomes &amp; competency architecture','30–60 hrs'],
             ['Curriculum sequencing &amp; prerequisite analysis','30–60 hrs'],
             ['Course inventory &amp; descriptions','20–40 hrs'],
             ['Curriculum, certification &amp; career mapping','40–80 hrs'],
             ['Complete course documentation (10 courses)','350–600 hrs'],
             ['Seven-week instructional development (10 courses)','600–1,100 hrs'],
             ['Assignment &amp; rubric development','150–300 hrs'],
             ['Resource research &amp; hyperlink verification','100–220 hrs'],
             ['Instructor &amp; student operational instructions','120–240 hrs'],
             ['Cross-course alignment &amp; duplication review','50–100 hrs'],
             ['Copy editing, formatting &amp; consistency','60–120 hrs'],
             ['Final quality assurance &amp; correction','50–100 hrs'],
             ['Project management &amp; revision tracking','50–100 hrs']]
            .map(([a,b])=>`<tr><td>${a}</td><td class="cite">${b}</td></tr>`).join('\n')}
          <tr><td><b>Indicative total</b></td><td class="cite"><b>1,700–3,200 hrs</b></td></tr>
          </tbody>
        </table>
      </div>
      <p class="muted small" style="margin-top:var(--s4)">At 160 hours per month, roughly eleven to twenty full-time-equivalent months for one person. Reuse of templates reduces production time but not the course-specific research, instructional design, assessment design, and quality assurance.</p>
    </div>
  </section>
  ${ctaBand()}`
);

// ---------- ABOUT ----------
page('about.html',
  'About RN Collins — Curriculum architect and academic program developer',
  'RN Collins develops and licenses complete academic curricula, integrating program design, subject-matter research, instructional design, assessment, and quality assurance into delivery-ready programs.',
  '/about',
  `${pagehead('About RN Collins', 'Curriculum architect and academic program developer', 'A polymath practice: RN Collins designs, researches, documents, and quality-controls complete academic programs — the kind of work institutions usually distribute across many roles.')}
  <section class="section">
    <div class="wrap" style="max-width:760px">
      <div class="reveal stack">
        <p>RN Collins builds academic programs as operational instructional systems — from degree architecture and program outcomes through course documentation, seven-week modules, assessments, and the faculty and student guidance needed to actually teach and complete the work.</p>
        <p>The work integrates functions institutions normally divide among program architects, curriculum and instructional designers, subject-matter researchers, assessment designers, faculty-development and student-experience writers, accessibility reviewers, documentation engineers, editors, quality-assurance reviewers, and project managers.</p>
        <p>This site is one line of a broader ecosystem. For applied, direct-to-learner AI education, see <a href="${ALOHA}" target="_blank" rel="noopener">Aloha AI</a> and <a href="${ALOHA_U}" target="_blank" rel="noopener">Aloha AI University</a>.</p>
      </div>
      <div class="hero__cta" style="margin-top:var(--s6)">
        <a class="btn btn--primary" href="/request">Request a proposal →</a>
        <a class="btn btn--outline" href="https://www.linkedin.com/in/rn-collins" target="_blank" rel="noopener">LinkedIn</a>
      </div>
    </div>
  </section>`
);

// ---------- REQUEST A PROPOSAL ----------
page('request.html',
  'Request a proposal — License, customize, or commission curriculum | RN Collins Curriculum',
  'Request a licensing proposal, a customized institutional version, or a new curriculum-development engagement.',
  '/request',
  `${pagehead('Request a proposal', 'License, customize, or commission', 'Tell me what you need. Selecting an option below opens an email with a prefilled subject — or write directly to ' + EMAIL + '.')}
  <section class="section">
    <div class="wrap">
      <div class="sec-head reveal"><p class="eyebrow">Choose a starting point</p><h2 class="h2">What would you like to do?</h2></div>
      <div class="grid grid-2">
        ${[['License a complete program','I would like a licensing proposal for a complete program.'],
           ['License individual courses','I would like to license one or more individual courses.'],
           ['Customize an existing curriculum','I would like to adapt an existing course or program to our institution.'],
           ['Commission a new program','I would like to commission a new academic or workforce program.'],
           ['Redesign an existing program','I would like to modernize or redesign an existing curriculum.'],
           ['Curriculum quality assurance','I would like a program or course quality review.'],
           ['Faculty or LMS implementation','I would like implementation, onboarding, or maintenance support.'],
           ['Something else','I have a different request about curriculum licensing or development.']]
          .map(([t,body])=>`<a class="card card--hover reveal" href="mailto:${EMAIL}?subject=${encodeURIComponent('Curriculum inquiry — ' + t)}&body=${encodeURIComponent(body + '\n\nInstitution:\nProgram / course of interest:\nDelivery model (in-person / online / hybrid):\nTimeline:\n')}"><h3 style="font-size:var(--fs-h3)">${t}</h3><span class="go">Start an email →</span></a>`).join('\n')}
      </div>
      <div class="card reveal" style="margin-top:var(--s6);background:var(--teal-l);border-color:#BADFD6">
        <p style="margin:0">Prefer to write directly? <a href="mailto:${EMAIL}?subject=Curriculum%20licensing%20inquiry"><b>${EMAIL}</b></a></p>
      </div>
    </div>
  </section>`
);

// ---------- PRIVACY / TERMS ----------
page('privacy.html', 'Privacy — RN Collins Curriculum', 'Privacy notice for the RN Collins Curriculum site.', '/privacy',
  `${pagehead('Privacy', 'Cookieless and privacy-first', '')}
  <section class="section"><div class="wrap" style="max-width:720px"><div class="stack">
    <p>This site is static and cookieless. It sets no tracking cookies and runs no third-party analytics.</p>
    <p>Links that begin an email (for proposals or inquiries) open your own email client; no data is collected by this site in the process. If you email ${EMAIL}, your message is used only to respond to your inquiry.</p>
    <p>External links (for example to Aloha AI or LinkedIn) are governed by those sites' own policies.</p>
  </div></div></section>`
);
page('terms.html', 'Terms — RN Collins Curriculum', 'Terms for the RN Collins Curriculum site.', '/terms',
  `${pagehead('Terms', 'Terms of use', '')}
  <section class="section"><div class="wrap" style="max-width:720px"><div class="stack">
    <p>This site presents curriculum available for institutional licensing and curriculum-development services. Descriptions are informational; final licensing rights, permitted uses, modifications, delivery terms, and support services are defined in the applicable agreement.</p>
    <p>Institutions are responsible for their own academic approval, faculty assignment, student administration, and any accreditation implications. Certification mappings describe alignment only and do not guarantee that course completion alone confers any external certification.</p>
    <p>© 2026 Rayven-Nikkita Collins LLC. RN Collins Curriculum &amp; Learning Systems.</p>
  </div></div></section>`
);

// ---- shared helpers used above ----
function pagehead(title, kicker, lead) {
  return `<section class="pagehead">
    <div class="wrap">
      <p class="eyebrow" style="color:var(--teal-mint)">${kicker}</p>
      <h1 class="display" style="max-width:22ch">${title}</h1>
      ${lead ? `<p class="lead" style="max-width:64ch">${lead}</p>` : ''}
    </div>
  </section>`;
}
function ctaBand() {
  return `<section class="section section--ink">
    <div class="wrap" style="text-align:center;max-width:760px">
      <h2 class="h2" style="color:var(--cream)">License what already exists. Customize it for your institution. Commission something new.</h2>
      <div class="hero__cta" style="justify-content:center;margin-top:var(--s5)">
        <a class="btn btn--primary" href="/request">Request a proposal →</a>
        <a class="btn btn--ghost" href="/programs">Browse programs</a>
      </div>
    </div>
  </section>`;
}
