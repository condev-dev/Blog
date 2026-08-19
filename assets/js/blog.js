(function () {
  var D = document,
    B = D.body,
    W = window,
    box = D.getElementById("toasts");
  function nfy(ti, tx, tp) {
    var map = {
        ok: "#i-check",
        err: "#i-x",
        info: "#i-info",
        warn: "#i-alert",
      },
      el = D.createElement("div");
    el.className = "toast toast--" + (tp || "info");
    el.innerHTML =
      '<span class="toast__ic"><svg class="ic"><use href="' +
      map[tp || "info"] +
      '"></use></svg></span><div><p class="toast__t">' +
      ti +
      "</p>" +
      (tx ? '<p class="toast__d">' + tx + "</p>" : "") +
      '</div><button class="toast__x" aria-label="بستن"><svg class="ic"><use href="#i-x"></use></svg></button>';
    box.appendChild(el);
    el.querySelector("button").onclick = function () {
      el.remove();
    };
    setTimeout(function () {
      el.remove();
    }, 4200);
  }
  var nav = D.getElementById("nav"),
    burger = D.getElementById("burger");
  function setNav(o) {
    B.classList.toggle("nav-open", o);
    burger && burger.setAttribute("aria-expanded", o ? "true" : "false");
  }
  burger &&
    burger.addEventListener("click", function () {
      setNav(!B.classList.contains("nav-open"));
    });
  D.addEventListener("click", function (e) {
    if (e.target.closest("[data-close-nav]")) setNav(false);
    if (e.target.closest("[data-writing]")) {
      e.preventDefault();
      setNav(false);
      nfy(
        "ثبت مقاله به زودی باز می شود",
        "فعلا موضوعت را از صفحه ارتباط با ما بفرست.",
        "info",
      );
    }
    if (e.target.closest("[data-copy]")) {
      var pre = e.target.closest(".code").querySelector("pre");
      navigator.clipboard.writeText(pre.innerText).then(
        function () {
          nfy("کد کپی شد", "الان می توانی بچسبانی.", "ok");
        },
        function () {
          nfy("کپی نشد", "دستی کپی کن.", "err");
        },
      );
    }
  });
  D.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setNav(false);
  });
  var p = D.getElementById("progress");
  W.addEventListener("scroll", function () {
    var h = D.documentElement.scrollHeight - W.innerHeight;
    p.style.transform =
      "scaleX(" + (h > 0 ? Math.min(1, W.scrollY / h) : 0) + ")";
  });
  var heads = [].slice.call(D.querySelectorAll(".prose h2[id]")),
    links = [].slice.call(D.querySelectorAll(".toc a"));
  if (W.IntersectionObserver) {
    var io = new IntersectionObserver(
      function (es) {
        es.forEach(function (en) {
          if (en.isIntersecting)
            links.forEach(function (a) {
              a.classList.toggle(
                "on",
                a.getAttribute("href") === "#" + en.target.id,
              );
            });
        });
      },
      { rootMargin: "-18% 0px -72% 0px" },
    );
    heads.forEach(function (h) {
      io.observe(h);
    });
    var rv = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          rv.unobserve(en.target);
        }
      });
    });
    D.querySelectorAll(".reveal").forEach(function (el) {
      rv.observe(el);
    });
  }
  D.addEventListener("submit", function (e) {
    if (e.target.matches("[data-validate]")) {
      e.preventDefault();
      var inp = e.target.querySelector("input");
      if (!inp.value.trim()) {
        nfy("ایمیلت را بنویس", "بدون ایمیل چیزی برای فرستادن ندارم.", "err");
        inp.focus();
        return;
      }
      nfy("عضویتت ثبت شد", "از این شنبه ایمیل ها برایت می آید.", "ok");
      e.target.reset();
    }
  });
  W.addEventListener("resize", function () {
    if (W.innerWidth >= 1024) setNav(false);
  });
})();
