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

  /* ---- interactive boxes: [data-go] jumps to its evidence, opening tabs on the way ---- */
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-go]");
    if (!el) return;
    var target = document.querySelector(el.getAttribute("data-go"));
    if (!target) return;
    var tp = target.classList.contains("tabpanel") ? target : target.closest(".tabpanel");
    if (tp) {
      var btn = document.querySelector('.tabs [data-tab="' + tp.id + '"]');
      if (btn) btn.click();
    }
    if (el.hasAttribute("data-gaps")) {
      document.querySelectorAll("#rights details").forEach(function (d) {
        if (d.querySelector(".dot.off, .dot.half")) d.open = true;
      });
    }
    var fold = target.closest ? target.closest("details") : null;
    if (target.tagName === "DETAILS") target.open = true;
    while (fold) { fold.open = true; fold = fold.parentElement.closest("details"); }
    target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  });

  /* in-page anchors (citations) that point inside a closed fold: open it first */
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var target = document.querySelector(a.getAttribute("href"));
    if (!target) return;
    var fold = target.closest("details");
    while (fold) { fold.open = true; fold = fold.parentElement.closest("details"); }
  });

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
