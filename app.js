(function () {
  var C = window.ZPAD_CONFIG || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  // ---- links from config ----
  $$('[data-link]').forEach(function (a) {
    var key = a.getAttribute('data-link');
    var href = (C.links && C.links[key]) || '';
    if (!href) {
      if (key === 'app') { a.setAttribute('aria-disabled', 'true'); a.textContent = 'Launch page opens with $ZPAD'; a.removeAttribute('href'); }
      else { a.hidden = true; }
      return;
    }
    a.href = href;
    if (href.charAt(0) === '#') { a.removeAttribute('target'); a.removeAttribute('rel'); }
  });

  // ---- contract address / launching state ----
  var ca = (C.contractAddress || '').trim();
  var block = $('#ca-block');
  if (ca) {
    block.setAttribute('data-state', 'live');
    $('#ca-text').textContent = ca;
    var buy = C.launchpad === 'pumpfun'
      ? 'https://pump.fun/coin/' + ca
      : 'https://raydium.io/launchpad/token/?mint=' + ca;
    $('#buy-link').href = buy;
    $('#chart-link').href = 'https://dexscreener.com/solana/' + ca;
    $('#copy-ca').addEventListener('click', function () {
      var btn = this;
      try {
        navigator.clipboard.writeText(ca).then(function () { btn.textContent = 'Copied'; setTimeout(function () { btn.textContent = 'Copy'; }, 1500); });
      } catch (e) { btn.textContent = ca; }
    });
    $$('[data-launch-cta]').forEach(function (a) { if (C.links && C.links.app) { a.href = C.links.app; } });
  } else {
    block.setAttribute('data-state', 'launching');
    var t = C.launchTimeUtc ? new Date(C.launchTimeUtc) : null;
    var timeEl = $('#launch-time');
    var cdEl = $('#countdown');
    if (t && !isNaN(t.getTime())) {
      timeEl.setAttribute('datetime', t.toISOString());
      timeEl.textContent = t.toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' });
      var tick = function () {
        var ms = t.getTime() - Date.now();
        if (ms <= 0) { cdEl.textContent = 'now'; return; }
        var s = Math.floor(ms / 1000), d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
        cdEl.textContent = (d ? d + 'd ' : '') + String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
      };
      tick(); setInterval(tick, 1000);
    } else {
      timeEl.textContent = 'soon'; cdEl.textContent = '';
    }
  }

  // ---- fee bar ----
  var bar = $('#fee-bar'), legend = $('#fee-legend');
  (C.feeSplit || []).forEach(function (seg) {
    var d = document.createElement('div');
    d.style.flex = String(seg.pct);
    d.innerHTML = '<span>' + seg.pct + '%</span>';
    d.title = seg.label + ' — ' + seg.pct + '%';
    bar.appendChild(d);
    var li = document.createElement('li');
    li.innerHTML = '<b>' + seg.pct + '% · ' + seg.label + '</b><small>' + (seg.note || '') + '</small>';
    legend.appendChild(li);
  });
  bar.setAttribute('aria-label', 'Fee split: ' + (C.feeSplit || []).map(function (s) { return s.pct + '% ' + s.label; }).join(', '));

  // ---- stats ----
  var fmt = function (v) {
    if (v === null || v === undefined || v === '') return '—';
    if (typeof v === 'number') {
      if (v >= 1e9) return (v / 1e9).toFixed(2) + 'B';
      if (v >= 1e6) return (v / 1e6).toFixed(2) + 'M';
      if (v >= 1e4) return (v / 1e3).toFixed(1) + 'K';
      return v.toLocaleString(undefined, { maximumFractionDigits: 2 });
    }
    return String(v);
  };
  var render = function (st) {
    $$('[data-stat]').forEach(function (el) { el.textContent = fmt(st[el.getAttribute('data-stat')]); });
  };
  render(C.stats || {});
  if (C.statsApi) {
    var pull = function () {
      fetch(C.statsApi, { cache: 'no-store' }).then(function (r) { return r.json(); }).then(function (j) {
        render(j); $('#ledger-note').textContent = 'Updated ' + new Date().toLocaleTimeString() + '. Every payout and burn is a public transaction.';
      }).catch(function () {});
    };
    pull(); setInterval(pull, 30000);
  }

  // ---- verify list ----
  var vl = $('#verify-list');
  (C.verify || []).forEach(function (v) {
    var li = document.createElement('li');
    var addr = (v.address || '').trim();
    li.innerHTML = '<span class="vl-label">' + v.label + '</span>' +
      (addr ? '<code>' + addr + '</code><a href="https://solscan.io/account/' + addr + '" target="_blank" rel="noopener">Solscan</a>'
            : '<span class="vl-empty">published at launch</span><span></span>');
    vl.appendChild(li);
  });

  // ---- launch copy when live ----
  if (ca && C.links && C.links.app) {
    $('#launch-copy').textContent = 'The launch page is open. One free launch per ticker; reusing a ticker costs 1 SOL. No dev allocation, no initial buy.';
  }
})();
