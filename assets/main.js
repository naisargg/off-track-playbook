/* The Off-Track Playbook — motion layer */
(function () {
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- scroll reveals (also triggers .wipe line reveals) ---- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  /* ---- stat count-up ---- */
  var nio = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      nio.unobserve(e.target);
      var el = e.target;
      var target = parseFloat(el.getAttribute("data-n"));
      var dec = (el.getAttribute("data-n").split(".")[1] || "").length;
      var prefix = el.getAttribute("data-pre") || "";
      var suffix = el.getAttribute("data-suf") || "";
      var setFinal = function () { el.childNodes[0].textContent = prefix + target.toFixed(dec) + suffix; };
      if (reduced) { setFinal(); return; }
      var t0 = performance.now(), dur = 1400, done = false;
      setTimeout(function () { done = true; setFinal(); }, dur + 60);
      (function tick(now) {
        if (done) return;
        var p = Math.min(1, (now - t0) / dur);
        var eased = 1 - Math.pow(1 - p, 4);
        el.childNodes[0].textContent = prefix + (target * eased).toFixed(dec) + suffix;
        if (p < 1) requestAnimationFrame(tick); else done = true;
      })(t0);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll(".stats .n").forEach(function (el) {
    el.insertBefore(document.createTextNode(""), el.firstChild);
    nio.observe(el);
  });
})();
