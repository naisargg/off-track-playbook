/* The Off-Track Playbook — motion layer */
(function () {
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- preloader: percentage counter, then lift ---- */
  var loader = document.getElementById("loader");
  if (loader && !reduced) {
    var count = loader.querySelector(".count");
    var seen = sessionStorage.getItem("otp-loaded");
    var dur = seen ? 350 : 1100;
    var t0 = performance.now();
    var finished = false;
    var finish = function () {
      if (finished) return;
      finished = true;
      if (count) count.textContent = "100";
      loader.classList.add("done");
      sessionStorage.setItem("otp-loaded", "1");
      document.querySelectorAll(".split").forEach(function (el) { el.classList.add("go"); });
    };
    setTimeout(finish, dur + 60); /* guarantees the loader lifts even if rAF is throttled */
    (function tick(now) {
      if (finished) return;
      var p = Math.min(1, (now - t0) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      if (count) count.textContent = String(Math.round(eased * 100)).padStart(3, "0");
      if (p < 1) requestAnimationFrame(tick);
      else finish();
    })(t0);
  } else {
    if (loader) loader.classList.add("done");
    document.querySelectorAll(".split").forEach(function (el) { el.classList.add("go"); });
  }

  /* ---- letter split for serif reveals ---- */
  document.querySelectorAll(".split").forEach(function (el) {
    var delay = 0;
    el.innerHTML = el.textContent.trim().split(/\s+/).map(function (word) {
      var letters = word.split("").map(function (ch) {
        delay += 22;
        return '<span class="l" style="transition-delay:' + delay + 'ms">' + ch + "</span>";
      }).join("");
      return '<span class="w">' + letters + "</span>";
    }).join(" ");
  });

  /* ---- scroll reveals ---- */
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

  /* ---- particle dust field ---- */
  var canvas = document.getElementById("dust");
  if (canvas && !reduced) {
    var ctx = canvas.getContext("2d");
    var pts = [];
    function size() {
      canvas.width = innerWidth * devicePixelRatio;
      canvas.height = innerHeight * devicePixelRatio;
    }
    size();
    addEventListener("resize", size);
    for (var i = 0; i < 70; i++) {
      pts.push({
        x: Math.random(), y: Math.random(),
        r: Math.random() * 1.1 + 0.3,
        vy: (Math.random() * 0.012 + 0.004) / 100,
        a: Math.random() * 0.35 + 0.08
      });
    }
    (function frame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(function (p) {
        p.y -= p.vy;
        if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); }
        ctx.globalAlpha = p.a;
        ctx.fillStyle = "#ece9e2";
        ctx.beginPath();
        ctx.arc(p.x * canvas.width, p.y * canvas.height, p.r * devicePixelRatio, 0, 7);
        ctx.fill();
      });
      requestAnimationFrame(frame);
    })();
  }
})();
