// hemsbansal.in/phone: the site as a small phone OS.
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var screen = $('#screen'), device = $('#device'), win = $('#window'), body = $('#win-body');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) { return null; } }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* ---------- Icons ---------- */
  var G = {
    person: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
    grid: '<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/>',
    note: '<path d="M6 3h12v18H6z"/><path d="M9 8h6M9 12h6M9 16h4"/>',
    chat: '<path d="M4 6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H10l-5 4v-4a3 3 0 0 1-1-2z"/>',
    doc: '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M10 12h5M10 16h5"/>',
    bug: '<rect x="8" y="7" width="8" height="12" rx="4"/><path d="M12 7V4M8 12H4M20 12h-4M8 17l-3 2M16 17l3 2M9 8 7 5M15 8l2-3"/>',
    wrench: '<path d="M15 5a4 4 0 0 0 4 5l-8 8a2 2 0 1 1-3-3l8-8a4 4 0 0 0-1-2z"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/>',
    gh: '<path d="M9 19c-4 1.3-4-2-6-2.5M15 21v-3.4a3 3 0 0 0-.9-2.3c2.9-.3 6-1.4 6-6.4a5 5 0 0 0-1.4-3.5 4.6 4.6 0 0 0-.1-3.5s-1.1-.3-3.6 1.4a12.4 12.4 0 0 0-6.6 0C5.9 1.6 4.8 1.9 4.8 1.9a4.6 4.6 0 0 0-.1 3.5A5 5 0 0 0 3.3 9c0 5 3 6.1 6 6.4a3 3 0 0 0-.9 2.3V21"/>',
    in: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9z"/>',
    bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 21h4"/>',
    pen: '<path d="M4 20l4-1 11-11-3-3L5 16zM14 6l3 3"/>',
    chev: '<path d="m9 6 6 6-6 6"/>', back: '<path d="m15 6-6 6 6 6"/>', ext: '<path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6"/>'
  };
  function svg(name, cls) { return '<svg viewBox="0 0 24 24"' + (cls ? ' class="' + cls + '"' : '') + ' aria-hidden="true">' + G[name] + '</svg>'; }

  /* ---------- Content ---------- */
  var APPS = [
    { id: 'about', name: 'About', icon: 'person', bg: 'linear-gradient(150deg,#9a9aa2,#5d5d65)', keys: 'hemant contact profile now' },
    { id: 'projects', name: 'Projects', icon: 'grid', bg: 'linear-gradient(150deg,#4b6bff,#2440c8)', keys: 'work apps built portfolio' },
    { id: 'notes', name: 'Notes', icon: 'note', bg: 'linear-gradient(150deg,#ffd84d,#f2a900)', keys: 'writing blog articles' },
    { id: 'messages', name: 'Messages', icon: 'chat', bg: 'linear-gradient(150deg,#4ade80,#16a34a)', keys: 'chat contact hello hire' },
    { id: 'resume', name: 'Resume', icon: 'doc', bg: 'linear-gradient(150deg,#ff7676,#e03131)', keys: 'cv experience education' },
    { id: 'bugs', name: 'Bug log', icon: 'bug', bg: 'linear-gradient(150deg,#ffad4d,#f76707)', keys: 'bugs fixes debugging' },
    { id: 'uses', name: 'Tools', icon: 'wrench', bg: 'linear-gradient(150deg,#6b7280,#374151)', keys: 'uses stack tools setup' },
    { id: 'settings', name: 'Settings', icon: 'gear', bg: 'linear-gradient(150deg,#b4b4bc,#6e6e76)', keys: 'dark light theme wallpaper' },
    { id: 'github', name: 'GitHub', icon: 'gh', bg: 'linear-gradient(150deg,#33333a,#0d0d10)', href: 'https://github.com/hemsbansal', keys: 'code repos' },
    { id: 'linkedin', name: 'LinkedIn', icon: 'in', bg: 'linear-gradient(150deg,#3a8bff,#0a66c2)', href: 'https://linkedin.com/in/hemsbansal', keys: 'profile' },
    { id: 'mail', name: 'Mail', icon: 'mail', bg: 'linear-gradient(150deg,#64b5ff,#1e7cf2)', href: 'mailto:bansalhemant55@gmail.com', keys: 'email contact' },
    { id: 'classic', name: 'Classic', icon: 'globe', bg: 'linear-gradient(150deg,#22c3d6,#0e7c9a)', href: '../', keys: 'website normal page' }
  ];
  var DOCK = ['messages', 'projects', 'notes', 'mail'];
  var byId = {}; APPS.forEach(function (a) { byId[a.id] = a; });

  var NOTES = [
    { slug: 'voice-latency', title: 'From 8 seconds to 1.5', date: 'Oct 2026', mins: 4, preview: 'What it took to make a voice agent feel like a conversation.' },
    { slug: 'bluetooth-null-checks', title: 'Two null checks', date: 'Oct 2026', mins: 3, preview: 'A crash that only happened with Bluetooth audio connected.' },
    { slug: 'do-not-disturb', title: 'Ringing through Do Not Disturb', date: 'Oct 2026', mins: 3, preview: 'Getting an alert heard on a phone that is set to stay quiet.' }
  ];

  var PROJECTS = [
    { id: 'voice', title: 'Voice coaching app', kicker: 'React Native · AI · 2024', icon: 'chat', bg: 'linear-gradient(160deg,#4b6bff,#7a3df5)',
      blurb: 'Real-time voice conversations with an AI coach, in more than one language.',
      body: ['People talk to an AI coach out loud and it answers out loud, on iOS and Android.', 'I built the app from scratch and led the team as it grew. Most of the work went into speed: the first version took about 8 seconds to reply, and streaming every step brought it to about 1.5.'],
      facts: [['Platform', 'iOS, Android'], ['Stack', 'React Native, Node.js'], ['Voice', 'OpenAI Realtime API, ElevenLabs, PlayHT'], ['Reply time', 'about 8s → about 1.5s'], ['My role', 'Built it, then led the team']], note: 'voice-latency' },
    { id: 'oncall', title: 'On-call app', kicker: 'React Native · 2025', icon: 'bell', bg: 'linear-gradient(160deg,#ff5c5c,#c2185b)',
      blurb: 'Critical alerts that ring through Do Not Disturb.',
      body: ['Engineers acknowledge, escalate and resolve incidents from their phone.', 'I built the whole app, including critical alerts that break through silent mode and Do Not Disturb, sign-in with Auth0 and Okta, and background token refresh.'],
      facts: [['Platform', 'iOS, Android'], ['Stack', 'React Native, native modules'], ['Sign-in', 'Auth0, Okta'], ['My role', 'Built the whole app']], note: 'do-not-disturb' },
    { id: 'devices', title: 'Device testing platform', kicker: 'React · Node.js', icon: 'grid', bg: 'linear-gradient(160deg,#10b981,#0e7490)',
      blurb: 'Automated tests on real devices in the cloud.',
      body: ['Upload an APK or IPA, run automated tests on real devices in AWS Device Farm and Firebase Test Lab, and follow the results in one dashboard.', 'I built the backend APIs and the React dashboard.'],
      facts: [['Platform', 'Web'], ['Stack', 'React, Node.js'], ['Devices', 'AWS Device Farm, Firebase Test Lab']] },
    { id: 'skribbl', title: 'Skribbl Arcade', kicker: 'Side project · Socket.IO', icon: 'pen', bg: 'linear-gradient(160deg,#f59e0b,#ea580c)',
      blurb: 'Multiplayer draw-and-guess, retro style.',
      body: ['A multiplayer drawing and guessing game with live emoji reactions, built on Node.js and Socket.IO.'],
      facts: [['Stack', 'Node.js, Express, Socket.IO'], ['Type', 'Side project']], link: ['View on GitHub', 'https://github.com/hemsbansal/skribbl_retro'] }
  ];

  var WALLS = {
    aurora: { name: 'Aurora', css: 'radial-gradient(60% 45% at 18% 22%,#3d63ff 0%,transparent 70%),radial-gradient(55% 40% at 85% 38%,#1fc7a5 0%,transparent 72%),radial-gradient(70% 45% at 40% 88%,#ffb547 0%,transparent 70%),radial-gradient(50% 35% at 90% 90%,#ff5c8a 0%,transparent 70%),#0b1026' },
    sand: { name: 'Sand', css: 'radial-gradient(60% 40% at 20% 20%,#f2c27b 0%,transparent 70%),radial-gradient(60% 45% at 85% 70%,#b9d3c4 0%,transparent 70%),radial-gradient(45% 30% at 30% 85%,#e79a7e 0%,transparent 70%),#efe6d6' },
    ink: { name: 'Ink', css: 'repeating-linear-gradient(115deg,rgba(255,255,255,.035) 0 2px,transparent 2px 14px),radial-gradient(80% 60% at 50% 0%,#2a2d36 0%,#0c0d10 70%)' },
    indigo: { name: 'Indigo', css: 'radial-gradient(circle at 6px 6px,rgba(255,255,255,.18) 1.2px,transparent 1.6px) 0 0/12px 12px,#1b2a7a' }
  };

  var ANSWERS = {
    now: 'I lead a team of five across mobile, web and AI. Most of my time goes into voice agents that answer quickly and work across languages.',
    role: 'Thanks! Email me at <a href="mailto:bansalhemant55@gmail.com">bansalhemant55@gmail.com</a> with a line about the role. I\'m open to senior mobile or full-stack roles, in India or remote.',
    stack: 'Mostly TypeScript: React Native on the phone, Node.js with NestJS or Express on the server, PostgreSQL and Redis for data. For voice, the OpenAI Realtime API, ElevenLabs and PlayHT. <a href="#uses">All my tools</a>.',
    site: 'Plain HTML, CSS and JavaScript. No framework. I wanted my site to feel like the thing I build every day: an app.',
    reach: 'Email is best: <a href="mailto:bansalhemant55@gmail.com">bansalhemant55@gmail.com</a>. I\'m also on <a href="https://linkedin.com/in/hemsbansal" target="_blank" rel="noopener">LinkedIn</a>.'
  };
  var QUESTIONS = [['now', 'What are you working on?'], ['role', 'I have a role for you'], ['stack', 'What\'s your stack?'], ['site', 'How did you build this?'], ['reach', 'How do I reach you?']];
  var chat = { log: [['them', 'Hi, I\'m Hemant 👋'], ['them', 'Ask me something, or email me any time.']], asked: {} };

  /* ---------- Clock (Jaipur time) ---------- */
  var fmtShort = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit', hour12: true });
  var fmtDate = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', weekday: 'long', day: 'numeric', month: 'long' });
  var fmtHour = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: 'numeric', hour12: false });
  function tick() {
    var now = new Date();
    var t = fmtShort.format(now).replace(/\s?[ap]m$/i, '');
    document.querySelectorAll('[data-clock="short"],[data-clock="big"]').forEach(function (el) { el.textContent = t; });
    document.querySelectorAll('[data-clock="date"]').forEach(function (el) { el.textContent = fmtDate.format(now); });
    var h = parseInt(fmtHour.format(now), 10);
    var mood = h < 5 ? 'Night in Jaipur' : h < 12 ? 'Morning in Jaipur' : h < 17 ? 'Afternoon in Jaipur' : h < 21 ? 'Evening in Jaipur' : 'Night in Jaipur';
    $('#mood').textContent = mood;
  }
  tick(); setInterval(tick, 15000);

  /* ---------- Wallpaper + theme ---------- */
  function applyWall(id) {
    if (!WALLS[id]) id = 'aurora';
    document.documentElement.setAttribute('data-wallpaper', id);
    $('.wallpaper').style.background = WALLS[id].css;
  }
  applyWall(store('wallpaper') || 'aurora');
  function setTheme(mode) {
    if (mode === 'auto') { document.documentElement.removeAttribute('data-theme'); store('theme', null); }
    else { document.documentElement.setAttribute('data-theme', mode); store('theme', mode); }
  }

  /* ---------- Fit the device on desktop ---------- */
  function fit() {
    if (window.innerWidth <= 560) { device.style.removeProperty('--s'); return; }
    var s = Math.min(1, (window.innerHeight - 40) / 868, (window.innerWidth - 40) / 414);
    device.style.setProperty('--s', s.toFixed(3));
  }
  fit(); window.addEventListener('resize', fit);

  /* ---------- Home screen ---------- */
  function iconHtml(a, tag) {
    var attrs = a.href ? ' href="' + a.href + '"' + (/^https?:/.test(a.href) ? ' target="_blank" rel="noopener"' : '') : ' href="#' + a.id + '"';
    return '<a class="app-icon" data-app="' + a.id + '"' + attrs + ' aria-label="' + esc(a.name) + '"><span class="tile" style="background:' + a.bg + '">' + svg(a.icon) + '</span><span>' + esc(a.name) + '</span></a>';
  }
  $('#grid').innerHTML = APPS.filter(function (a) { return DOCK.indexOf(a.id) < 0; }).map(iconHtml).join('');
  $('#dock').innerHTML = DOCK.map(function (id) { return iconHtml(byId[id]); }).join('');
  $('.w-now').addEventListener('click', function () { go('about'); });

  /* ---------- Lock screen ---------- */
  var NOTIFS = [
    { app: 'messages', title: 'Hemant', text: 'Hi! Swipe up and look around.', when: 'now', to: 'messages' },
    { app: 'notes', title: 'Notes', text: 'From 8 seconds to 1.5', when: 'Oct', to: 'notes/voice-latency' },
    { app: 'about', title: 'Status', text: 'Open to senior mobile and full-stack roles', when: '', to: 'about' }
  ];
  $('#notifs').innerHTML = NOTIFS.map(function (n) {
    var a = byId[n.app];
    return '<button class="notif" type="button" data-to="' + n.to + '"><span class="ni" style="background:' + a.bg + '">' + svg(a.icon) + '</span><span><b>' + esc(n.title) + '</b><span>' + esc(n.text) + '</span></span><small>' + n.when + '</small></button>';
  }).join('');
  $('#notifs').addEventListener('click', function (e) { var b = e.target.closest('[data-to]'); if (b && !lockDragged) go(b.dataset.to); });

  var lock = $('#lock'), lockDragged = false;
  (function () {
    var y0 = null, dy = 0, moved = false, onNotif = false, pid = null;
    lock.addEventListener('pointerdown', function (e) {
      y0 = e.clientY; dy = 0; moved = false; pid = e.pointerId;
      onNotif = !!e.target.closest('.notif'); lock.style.transition = 'none';
    });
    lock.addEventListener('pointermove', function (e) {
      if (y0 === null) return;
      dy = Math.min(0, e.clientY - y0);
      if (!moved && dy < -8) { moved = true; try { lock.setPointerCapture(pid); } catch (err) {} }
      if (moved) lock.style.transform = 'translateY(' + dy + 'px)';
    });
    function reset() { y0 = null; lock.style.transition = ''; lock.style.transform = ''; }
    lock.addEventListener('pointerup', function () {
      if (y0 === null) return;
      var h = lock.getBoundingClientRect().height, wasMoved = moved, d = dy;
      reset();
      if (wasMoved) { lockDragged = true; setTimeout(function () { lockDragged = false; }, 50); if (d < -h * 0.18) go('home'); }
      else if (!onNotif) go('home');
    });
    lock.addEventListener('pointercancel', reset);
  })();

  /* ---------- Home bar ---------- */
  (function () {
    var bar = $('#home-bar'), y0 = null;
    bar.addEventListener('pointerdown', function (e) { y0 = e.clientY; bar.setPointerCapture(e.pointerId); });
    bar.addEventListener('pointerup', function (e) {
      var dy = y0 === null ? 0 : e.clientY - y0; y0 = null;
      if (screen.dataset.view === 'app' || dy < -20) go('home');
    });
  })();

  /* ---------- App screens ---------- */
  function nav(title, backHref, backLabel) {
    return '<header class="nav">' + (backHref ? '<a class="back" href="#' + backHref + '">' + svg('back') + esc(backLabel) + '</a>' : '<span class="back" aria-hidden="true"></span>') +
      (title ? '<h1>' + esc(title) + '</h1>' : '') + '</header>';
  }
  function cell(o) {
    var tag = o.href ? 'a' : 'button';
    var href = o.href ? ' href="' + o.href + '"' + (/^https?:/.test(o.href) ? ' target="_blank" rel="noopener"' : '') : ' type="button"';
    return '<' + tag + ' class="cell"' + href + (o.data || '') + '>' + (o.icon ? '<span class="mini" style="background:' + o.bg + '">' + svg(o.icon) + '</span>' : '') +
      '<span class="grow">' + o.label + (o.small ? '<small>' + o.small + '</small>' : '') + '</span>' + (o.val ? '<span class="val">' + o.val + '</span>' : '') +
      (o.noChev ? '' : svg(/^https?:/.test(o.href || '') ? 'ext' : 'chev', 'chev')) + '</' + tag + '>';
  }

  var R = {};
  R.about = function () {
    return nav('', 'home', 'Home') + '<div class="page-pad">' +
      '<div class="card-head"><div class="avatar">HB</div><h2>Hemant Bansal</h2><p>Mobile apps &amp; voice AI · Jaipur, India</p></div>' +
      '<div class="actions">' +
        '<a class="action" href="#messages">' + svg('chat') + 'message</a>' +
        '<a class="action" href="mailto:bansalhemant55@gmail.com">' + svg('mail') + 'mail</a>' +
        '<a class="action" href="https://github.com/hemsbansal" target="_blank" rel="noopener">' + svg('gh') + 'github</a>' +
        '<a class="action" href="https://linkedin.com/in/hemsbansal" target="_blank" rel="noopener">' + svg('in') + 'linkedin</a>' +
      '</div>' +
      '<div class="group">' +
        '<div class="field"><small>about</small><p>I build mobile apps and voice AI. I started as an intern in 2021, doing web and full-stack work, and moved to React Native in 2024. Today I lead a small team and spend most of my time making AI voices answer quickly and sound human.</p></div>' +
        '<div class="field"><small>now</small><ul><li>Leading a team of five across mobile, web and AI</li><li>Making voice agents hold up across languages and noisy rooms</li></ul></div>' +
        '<div class="field"><small>open to</small><p>Senior mobile or full-stack roles, in India or remote</p></div>' +
        '<div class="field"><small>location</small><p>Jaipur, India · IST (UTC+5:30)</p></div>' +
        '<div class="field"><small>email</small><p><a href="mailto:bansalhemant55@gmail.com">bansalhemant55@gmail.com</a></p></div>' +
      '</div>' +
      '<div class="group">' + cell({ href: '#resume', label: 'Resume', icon: 'doc', bg: byId.resume.bg }) + cell({ href: '#projects', label: 'Projects', icon: 'grid', bg: byId.projects.bg }) + '</div>' +
    '</div>';
  };
  R.projects = function (sub) {
    if (sub) {
      var p = PROJECTS.filter(function (x) { return x.id === sub; })[0];
      if (!p) return R.projects();
      return nav('', 'projects', 'Projects') +
        '<div class="hero-band" style="background:' + p.bg + '"><small>' + esc(p.kicker) + '</small><h2>' + esc(p.title) + '</h2><div class="chips">' + p.facts.slice(0, 2).map(function (f) { return '<span>' + esc(f[1]) + '</span>'; }).join('') + '</div></div>' +
        '<div class="page-pad" style="margin-top:18px">' + p.body.map(function (t) { return '<p class="prose">' + esc(t) + '</p>'; }).join('') +
        '<div class="group">' + p.facts.map(function (f) { return cell({ label: esc(f[0]), val: esc(f[1]), noChev: true }); }).join('') + '</div>' +
        (p.note ? '<a class="btn" href="#notes/' + p.note + '">Read the story</a>' : '') +
        (p.link ? '<a class="btn" href="' + p.link[1] + '" target="_blank" rel="noopener">' + esc(p.link[0]) + '</a>' : '') + '</div>';
    }
    return nav('Projects', 'home', 'Home') + '<div class="page-pad">' + PROJECTS.map(function (p) {
      return '<a class="store-card" href="#projects/' + p.id + '" style="background:' + p.bg + '"><small>' + esc(p.kicker) + '</small><h3>' + esc(p.title) + '</h3><p>' + esc(p.blurb) + '</p>' + svg(p.icon, 'glyph') + '</a>';
    }).join('') + '</div>';
  };
  R.notes = function (sub) {
    if (sub) {
      var n = NOTES.filter(function (x) { return x.slug === sub; })[0];
      if (!n) return R.notes();
      return { html: nav('', 'notes', 'Notes') + '<div class="doc" id="doc"><p class="loading">Opening…</p></div>', load: ['../notes/' + n.slug + '.html', 'article', false] };
    }
    return nav('Notes', 'home', 'Home') + '<div class="page-pad"><div class="group">' + NOTES.map(function (n) {
      return cell({ href: '#notes/' + n.slug, label: '<b>' + esc(n.title) + '</b>', small: esc(n.date + ' · ' + n.mins + ' min · ' + n.preview) });
    }).join('') + '</div><p class="sub">' + NOTES.length + ' notes</p></div>';
  };
  function docApp(title, url, sel) {
    return function () { return { html: nav(title, 'home', 'Home') + '<div class="doc" id="doc"><p class="loading">Opening…</p></div>', load: [url, sel, true] }; };
  }
  R.resume = docApp('Resume', '../resume/', 'main');
  R.bugs = docApp('Bug log', '../bugs/', 'main');
  R.uses = docApp('Tools', '../uses/', 'main');
  R.messages = function () {
    var q = QUESTIONS.filter(function (x) { return !chat.asked[x[0]]; });
    return nav('', 'home', 'Home') + '<div class="card-head" style="padding-top:0"><div class="avatar" style="width:56px;height:56px;font-size:22px">HB</div><p style="color:var(--app-fg);font-weight:600">Hemant</p></div>' +
      '<div class="thread-wrap" id="thread"><p class="stamp">Today</p>' + chat.log.map(function (m) { return '<div class="bubble' + (m[0] === 'me' ? ' me' : '') + '">' + m[1] + '</div>'; }).join('') + '</div>' +
      '<div class="quick" id="quick">' + q.map(function (x) { return '<button type="button" data-q="' + x[0] + '">' + esc(x[1]) + '</button>'; }).join('') + '</div>';
  };
  R.settings = function () {
    var theme = store('theme') || 'auto', wall = store('wallpaper') || 'aurora';
    var seg = [['light', 'Light'], ['dark', 'Dark'], ['auto', 'Automatic']].map(function (s) { return '<button type="button" data-theme-set="' + s[0] + '" aria-pressed="' + (theme === s[0]) + '">' + s[1] + '</button>'; }).join('');
    var walls = Object.keys(WALLS).map(function (k) { return '<button type="button" class="wall" data-wall="' + k + '" aria-pressed="' + (wall === k) + '" aria-label="' + WALLS[k].name + ' wallpaper"><i style="background:' + WALLS[k].css + '"></i><small>' + WALLS[k].name + '</small></button>'; }).join('');
    return nav('Settings', 'home', 'Home') + '<div class="page-pad">' +
      '<p class="glabel">Appearance</p><div class="group"><div class="seg" role="group" aria-label="Appearance">' + seg + '</div></div>' +
      '<p class="glabel">Wallpaper</p><div class="group"><div class="walls">' + walls + '</div></div>' +
      '<p class="glabel">About this phone</p><div class="group">' +
        cell({ label: 'Owner', val: 'Hemant Bansal', noChev: true }) + cell({ label: 'Built with', val: 'HTML, CSS, JS', noChev: true }) + cell({ label: 'Time zone', val: 'Jaipur (IST)', noChev: true }) +
        cell({ href: '../', label: 'Open the classic site' }) + cell({ label: 'Lock phone', data: ' data-lock="1"' }) +
      '</div></div>';
  };

  function wire(id) {
    if (id === 'messages') {
      var quick = $('#quick'), thread = $('#thread');
      quick && quick.addEventListener('click', function (e) {
        var b = e.target.closest('[data-q]'); if (!b || quick.dataset.busy) return;
        quick.dataset.busy = '1'; chat.asked[b.dataset.q] = true;
        var me = document.createElement('div'); me.className = 'bubble me'; me.textContent = b.textContent; thread.appendChild(me);
        chat.log.push(['me', esc(b.textContent)]); b.remove();
        var typing = document.createElement('div'); typing.className = 'bubble typing'; typing.innerHTML = '<i></i><i></i><i></i>'; thread.appendChild(typing);
        body.scrollTo({ top: body.scrollHeight, behavior: reduced ? 'auto' : 'smooth' });
        setTimeout(function () {
          typing.remove();
          var a = document.createElement('div'); a.className = 'bubble'; a.innerHTML = ANSWERS[b.dataset.q]; thread.appendChild(a);
          chat.log.push(['them', ANSWERS[b.dataset.q]]); delete quick.dataset.busy;
          body.scrollTo({ top: body.scrollHeight, behavior: reduced ? 'auto' : 'smooth' });
        }, reduced ? 0 : 800);
      });
    }
    if (id === 'settings') {
      body.addEventListener('click', function onSet(e) {
        var t = e.target.closest('[data-theme-set]'), w = e.target.closest('[data-wall]'), l = e.target.closest('[data-lock]');
        if (t) { setTheme(t.dataset.themeSet); body.querySelectorAll('[data-theme-set]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === t)); }); }
        if (w) { applyWall(w.dataset.wall); store('wallpaper', w.dataset.wall); body.querySelectorAll('[data-wall]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === w)); }); }
        if (l) { go(''); }
      });
    }
  }

  /* Load a page of the classic site into an app */
  var cache = {};
  function loadDoc(url, sel, dropTitle) {
    var target = $('#doc');
    var p = cache[url] || (cache[url] = fetch(url).then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); }));
    p.then(function (html) {
      if (!document.body.contains(target)) return;
      var d = new DOMParser().parseFromString(html, 'text/html');
      var node = d.querySelector(sel) || d.querySelector('main');
      node.querySelectorAll('script, .back, footer, .theme-btn, .toast').forEach(function (x) { x.remove(); });
      if (dropTitle) { var h1 = node.querySelector('article > h1, h1'); if (h1 && !node.querySelector('.cv-head')) h1.remove(); }
      var base = new URL(url, location.href);
      node.querySelectorAll('a[href]').forEach(function (a) {
        var u = new URL(a.getAttribute('href'), base);
        var m = u.pathname.match(/\/notes\/([\w-]+)\.html$/);
        if (u.protocol === 'mailto:') return;
        if (u.origin === location.origin && m) a.setAttribute('href', '#notes/' + m[1]);
        else if (u.origin === location.origin && /\/bugs\/?$/.test(u.pathname)) a.setAttribute('href', '#bugs');
        else if (u.origin === location.origin && /\/uses\/?$/.test(u.pathname)) a.setAttribute('href', '#uses');
        else if (u.origin === location.origin && /\/resume\/?$/.test(u.pathname)) a.setAttribute('href', '#resume');
        else { a.setAttribute('href', u.href); a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noopener'); }
      });
      target.innerHTML = node.innerHTML;
    }).catch(function () {
      if (document.body.contains(target)) target.innerHTML = '<p class="loading">Couldn\'t open this page. <a href="' + url + '">Open it directly</a>.</p>';
      delete cache[url];
    });
  }

  /* ---------- Router ---------- */
  var current = { view: 'lock', app: null, sub: null }, originEl = null;
  function go(h) { if (('#' + h) === location.hash || (h === '' && !location.hash)) route(); else location.hash = h; }

  function origin(id) {
    var el = document.querySelector('.app-icon[data-app="' + id + '"] .tile');
    if (!el || screen.dataset.view === 'lock') return null;
    var s = screen.getBoundingClientRect(), r = el.getBoundingClientRect(), k = s.width / screen.offsetWidth;
    return ((r.left + r.width / 2 - s.left) / k) + 'px ' + ((r.top + r.height / 2 - s.top) / k) + 'px';
  }

  function openApp(id, sub) {
    var r = R[id](sub);
    var html = typeof r === 'string' ? r : r.html;
    var fresh = current.app !== id || win.hidden;
    var deeper = !fresh && sub && !current.sub, shallower = !fresh && !sub && current.sub;
    body.innerHTML = html;
    if (r.load) loadDoc(r.load[0], r.load[1], r.load[2]);
    wire(id);
    body.scrollTop = 0;
    win.hidden = false;
    screen.dataset.view = 'app';
    if (reduced) return;
    if (fresh) {
      var o = origin(id) || '50% 50%';
      win.style.transformOrigin = o; originEl = o;
      win.animate([{ transform: 'scale(.12)', opacity: 0, borderRadius: '120px' }, { transform: 'scale(1)', opacity: 1, borderRadius: '52px' }], { duration: 420, easing: 'cubic-bezier(.2,.85,.25,1)' });
    } else if (deeper || shallower || current.sub !== sub) {
      body.animate([{ transform: 'translateX(' + (shallower ? '-' : '') + '24%)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 260, easing: 'ease-out' });
    }
  }

  function closeApp(then) {
    if (win.hidden) { then && then(); return; }
    var finish = function () { win.hidden = true; body.innerHTML = ''; then && then(); };
    if (reduced) return finish();
    win.style.transformOrigin = originEl || '50% 50%';
    var a = win.animate([{ transform: 'scale(1)', opacity: 1 }, { transform: 'scale(.12)', opacity: 0, borderRadius: '120px' }], { duration: 300, easing: 'cubic-bezier(.4,0,.6,1)' });
    a.onfinish = finish;
  }

  function route() {
    var h = decodeURIComponent(location.hash.slice(1));
    var parts = h.split('/'), id = parts[0], sub = parts[1] || null;
    closeSpot();
    if (!h) { closeApp(); screen.dataset.view = 'lock'; current = { view: 'lock', app: null, sub: null }; return; }
    if (h === 'home' || !R[id]) { screen.dataset.view = 'home'; closeApp(); current = { view: 'home', app: null, sub: null }; return; }
    if (screen.dataset.view === 'lock') screen.dataset.view = 'home';
    openApp(id, sub);
    current = { view: 'app', app: id, sub: sub };
  }
  window.addEventListener('hashchange', route);

  /* ---------- Spotlight search ---------- */
  var spot = $('#spotlight'), input = $('#sp-input'), list = $('#sp-results'), active = 0, results = [];
  var INDEX = APPS.map(function (a) { return { label: a.name, hint: a.href ? 'Link' : 'App', go: a.href || '#' + a.id, icon: a.icon, bg: a.bg, keys: (a.name + ' ' + a.keys).toLowerCase() }; })
    .concat(NOTES.map(function (n) { return { label: n.title, hint: 'Note', go: '#notes/' + n.slug, icon: 'note', bg: byId.notes.bg, keys: (n.title + ' ' + n.preview + ' note').toLowerCase() }; }))
    .concat(PROJECTS.map(function (p) { return { label: p.title, hint: 'Project', go: '#projects/' + p.id, icon: 'grid', bg: byId.projects.bg, keys: (p.title + ' ' + p.blurb + ' ' + p.kicker + ' project').toLowerCase() }; }));
  function openSpot() { if (screen.dataset.view === 'lock') return; spot.hidden = false; input.value = ''; render(); setTimeout(function () { input.focus(); }, 30); }
  function closeSpot() { if (!spot.hidden) { spot.hidden = true; input.blur(); } }
  function render() {
    var q = input.value.trim().toLowerCase();
    results = INDEX.filter(function (x) { return !q || q.split(/\s+/).every(function (w) { return x.keys.indexOf(w) >= 0; }); }).slice(0, 8);
    active = 0;
    list.innerHTML = results.length ? results.map(function (x, i) {
      return '<li><button type="button" data-i="' + i + '" class="' + (i === 0 ? 'on' : '') + '"><span class="tile" style="background:' + x.bg + '">' + svg(x.icon) + '</span><span><span>' + esc(x.label) + '</span><small>' + x.hint + '</small></span></button></li>';
    }).join('') : '<li style="opacity:.7;padding:8px">No results</li>';
  }
  function pick(i) {
    var x = results[i]; if (!x) return; closeSpot();
    if (x.go.charAt(0) === '#') location.hash = x.go.slice(1);
    else if (/^https?:/.test(x.go)) window.open(x.go, '_blank', 'noopener');
    else location.href = x.go;
  }
  input.addEventListener('input', render);
  list.addEventListener('click', function (e) { var b = e.target.closest('[data-i]'); if (b) pick(+b.dataset.i); });
  $('#sp-cancel').addEventListener('click', closeSpot);
  $('#search-btn').addEventListener('click', openSpot);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); pick(active); }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault(); active = Math.max(0, Math.min(results.length - 1, active + (e.key === 'ArrowDown' ? 1 : -1)));
      list.querySelectorAll('button').forEach(function (b, i) { b.classList.toggle('on', i === active); });
    }
  });

  /* ---------- Keyboard ---------- */
  document.addEventListener('keydown', function (e) {
    var typing = /INPUT|TEXTAREA/.test((document.activeElement || {}).tagName || '');
    if (e.key === 'Escape') { if (!spot.hidden) closeSpot(); else if (current.view === 'app') go(current.sub ? current.app : 'home'); return; }
    if (typing) return;
    if (current.view === 'lock' && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); go('home'); return; }
    if ((e.key === '/' || (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey))) && current.view !== 'lock') { e.preventDefault(); openSpot(); }
  });

  route();
})();
