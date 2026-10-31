// Shared script for every page of hemsbansal.in
(function () {
  function store(key, value) {
    try { if (value === undefined) return localStorage.getItem(key); localStorage.setItem(key, value); } catch (e) { return null; }
  }

  // Copy email button
  var copy = document.getElementById('copy-email');
  if (copy) copy.addEventListener('click', function () {
    var el = document.getElementById('email');
    function done(t) { copy.textContent = t; setTimeout(function () { copy.textContent = 'Copy'; }, 1600); }
    function select() { var r = document.createRange(); r.selectNodeContents(el); var s = getSelection(); s.removeAllRanges(); s.addRange(r); done('Selected'); }
    try { navigator.clipboard.writeText(el.textContent).then(function () { done('Copied'); }, select); } catch (e) { select(); }
  });

  // English / Hindi switch (homepage)
  var buttons = document.querySelectorAll('[data-set-lang]');
  function setLang(lang) {
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.lang = lang === 'hi' ? 'hi' : 'en';
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.setLang === lang)); });
    store('lang', lang);
  }
  if (buttons.length) {
    buttons.forEach(function (b) { b.addEventListener('click', function () { setLang(b.dataset.setLang); }); });
    if (store('lang') === 'hi') setLang('hi');
  }

  // Easter egg: click the name three times to hear the robotic voice I spent months replacing
  var toast = document.getElementById('toast');
  document.querySelectorAll('#name, #m-name').forEach(function (name) {
  if (toast) {
    var clicks = 0, timer, hideTimer;
    name.addEventListener('click', function () {
      clicks++;
      clearTimeout(timer);
      timer = setTimeout(function () { clicks = 0; }, 900);
      if (clicks < 3) return;
      clicks = 0;
      try {
        if ('speechSynthesis' in window) {
          speechSynthesis.cancel();
          var u = new SpeechSynthesisUtterance('Hi. I. am. Hemant.');
          u.rate = 0.7; u.pitch = 0.3;
          speechSynthesis.speak(u);
        }
      } catch (e) {}
      toast.textContent = '🤖 "Hi. I. Am. Hemant." This is the robotic voice I spent months replacing.';
      toast.hidden = false;
      clearTimeout(hideTimer);
      hideTimer = setTimeout(function () { toast.hidden = true; }, 5000);
    });
  }
  });

  // A hello for anyone who opens the console
  try {
    console.log('%ch', 'font: italic 48px Georgia, serif; color: #1f6f4a');
    console.log('Hey, fellow developer 👋  Found a bug here? I\'d love it: bansalhemant55@gmail.com');
  } catch (e) {}

  // Installable app + offline support
  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    window.addEventListener('load', function () {
      var root = document.querySelector('link[rel="manifest"]');
      var base = root ? new URL('.', root.href).href : '/';
      navigator.serviceWorker.register(base + 'sw.js').catch(function () {});
    });
  }
})();
