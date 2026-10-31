// Homepage behaviour: app-style tabs on phones, wallet passes, scripted chat.
(function () {
  var html = document.documentElement;
  var phone = window.matchMedia('(max-width: 760px)');
  var views = ['home', 'route', 'passes', 'chat'];
  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function openTicket(id) {
    var t = document.getElementById(id);
    if (!t) return;
    document.querySelectorAll('.ticket').forEach(function (x) { x.classList.toggle('open', x === t); });
  }

  function show(view, ticket) {
    document.querySelectorAll('.view').forEach(function (v) { v.classList.toggle('active', v.dataset.view === view); });
    document.querySelectorAll('.tabbar a').forEach(function (a) {
      if (a.dataset.tab === view) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    if (ticket) openTicket(ticket);
    window.scrollTo(0, 0);
  }

  function route() {
    if (!html.classList.contains('is-app')) return;
    var h = (location.hash || '#home').slice(1);
    if (h.indexOf('t-') === 0) show('passes', h);
    else show(views.indexOf(h) >= 0 ? h : 'home');
  }

  function mode() {
    html.classList.toggle('is-app', phone.matches);
    route();
  }
  if (phone.addEventListener) phone.addEventListener('change', mode); else phone.addListener(mode);
  window.addEventListener('hashchange', route);
  mode();

  // Desktop: a ticket link like #t-voice just scrolls; highlight it briefly
  window.addEventListener('hashchange', function () {
    if (html.classList.contains('is-app')) return;
    var t = document.getElementById(location.hash.slice(1));
    if (t && t.classList.contains('ticket')) { t.focus({ preventScroll: true }); }
  });

  // Phone: tap a pass to open it
  document.querySelectorAll('.ticket').forEach(function (t) {
    t.addEventListener('click', function (e) {
      if (!html.classList.contains('is-app') || e.target.closest('a')) return;
      openTicket(t.id);
    });
    t.addEventListener('keydown', function (e) {
      if ((e.key === 'Enter' || e.key === ' ') && html.classList.contains('is-app') && !e.target.closest('a')) { e.preventDefault(); openTicket(t.id); }
    });
  });

  // Scripted chat
  var answers = {
    now: 'I lead a team of five across mobile, web and AI. Most of my time goes into voice agents that answer quickly and work across languages.',
    role: 'Thanks! Email me at <a href="mailto:bansalhemant55@gmail.com">bansalhemant55@gmail.com</a> with a line about the role. I\'m open to senior mobile or full-stack roles, in India or remote.',
    stack: 'Mostly TypeScript: React Native on the phone, Node.js with NestJS or Express on the server, PostgreSQL and Redis for data. For voice, the OpenAI Realtime API, ElevenLabs and PlayHT. <a href="uses/index.html">Full list</a>.',
    resume: 'Here it is: <a href="resume/index.html">my resume</a>.'
  };
  var thread = document.getElementById('thread');
  var replies = document.getElementById('replies');
  if (thread && replies) {
    replies.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-q]');
      if (!b || replies.dataset.busy) return;
      replies.dataset.busy = '1';
      var me = document.createElement('div'); me.className = 'msg me'; me.textContent = b.textContent;
      thread.appendChild(me);
      b.remove();
      var typing = document.createElement('div'); typing.className = 'msg typing'; typing.innerHTML = '<i></i><i></i><i></i>';
      thread.appendChild(typing);
      setTimeout(function () {
        typing.remove();
        var a = document.createElement('div'); a.className = 'msg'; a.innerHTML = answers[b.dataset.q];
        thread.appendChild(a);
        delete replies.dataset.busy;
        if (!replies.children.length) replies.remove();
      }, still ? 0 : 700);
    });
  }
})();
