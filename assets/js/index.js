(function () {
  var D = document,
    B = document.body,
    W = window;
  function pd(n) {
    return String(n).replace(/[0-9]/g, function (d) {
      return "۰۱۲۳۴۵۶۷۸۹"[d];
    });
  }
  // اعلان‌ها فقط از header.js می‌آیند تا همه‌ی صفحات رفتار یکسان داشته باشند.
  var notify = function (options) {
    if (typeof W.notify === "function") return W.notify(options);
  };

  var prog = D.getElementById("progress");
  function frame() {
    if (prog) {
      var h = D.documentElement.scrollHeight - W.innerHeight;
      prog.style.transform =
        "scaleX(" + (h > 0 ? Math.min(1, W.scrollY / h) : 0) + ")";
    }
  }
  W.addEventListener(
    "scroll",
    function () {
      requestAnimationFrame(frame);
    },
    { passive: true },
  );
  frame();

  var rv = D.querySelectorAll(".reveal");
  if (W.IntersectionObserver && rv.length) {
    var io = new IntersectionObserver(
      function (es) {
        es.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    rv.forEach(function (el) {
      io.observe(el);
    });
  } else {
    rv.forEach(function (el) {
      el.classList.add("in");
    });
  }

  var FP = "۰۱۲۳۴۵۶۷۸۹",
    FA = "٠١٢٣٤٥٦٧٨٩";
  function nm(s) {
    s = String(s == null ? "" : s)
      .toLowerCase()
      .replace(/\u200c/g, " ")
      .replace(/[يى]/g, "ی")
      .replace(/ك/g, "ک")
      .replace(/[أإآ]/g, "ا")
      .replace(/ۀ/g, "ه")
      .replace(/ـ/g, "");
    s = s.replace(/[۰-۹٠-٩]/g, function (c) {
      var i = FP.indexOf(c);
      return i > -1 ? i : FA.indexOf(c);
    });
    return s
      .replace(/[^\wآ-ی۰-۹\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }
  var items = [].slice.call(D.querySelectorAll("[data-post]")),
    inputs = [].slice.call(D.querySelectorAll("[data-search]")),
    cnt = D.getElementById("count"),
    emp = D.getElementById("empty"),
    hide = [].slice.call(D.querySelectorAll("[data-hide-on-search]"));
  function filter(q) {
    var n = nm(q),
      hit = 0;
    items.forEach(function (it) {
      var ok = !n || nm(it.dataset.post + " " + it.textContent).indexOf(n) > -1;
      it.hidden = !ok;
      if (ok) hit++;
    });
    hide.forEach(function (s) {
      s.hidden = !!n;
    });
    if (emp) emp.classList.toggle("on", !!n && hit === 0);
    if (cnt)
      cnt.textContent = n
        ? hit
          ? pd(hit) + " مقاله با «" + q.trim() + "» جور شد"
          : "چیزی با «" + q.trim() + "» پیدا نشد"
        : "";
  }
  function setAll(v) {
    inputs.forEach(function (i) {
      i.value = v;
    });
  }
  inputs.forEach(function (i) {
    i.addEventListener("input", function () {
      inputs.forEach(function (o) {
        if (o !== i) o.value = i.value;
      });
      if (items.length) filter(i.value);
      D.querySelectorAll("[data-term]").forEach(function (o) {
        o.setAttribute("aria-pressed", "false");
      });
    });
  });
  D.addEventListener("submit", function (e) {
    var f = e.target;
    if (f.matches("[role=search]")) {
      e.preventDefault();
      var inp = f.querySelector("input"),
        v = inp ? inp.value.trim() : "";
      if (!v) {
        notify({
          type: "info",
          title: "چیزی برای جستجو نوشته نشده",
          text: "یک کلمه بنویس، مثلا: کیف پول یا ایندکس.",
        });
        if (inp) inp.focus();
        return;
      }
      if (items.length) filter(v);
      else location.href = "./categories.html?q=" + encodeURIComponent(v);
    }
  });
  var qp = new URLSearchParams(location.search).get("q");
  if (qp) {
    setAll(qp);
    if (items.length) filter(qp);
  }

  var RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
  function clean(fl) {
    if (!fl) return;
    fl.classList.remove("bad");
    var h = fl.querySelector(".hint");
    if (h && h.dataset.o) h.textContent = h.dataset.o;
  }
  function bad(el, msg) {
    var fl = el.closest(".field");
    if (!fl) return;
    fl.classList.add("bad");
    var h = fl.querySelector(".hint");
    if (!h) {
      h = D.createElement("p");
      h.className = "hint";
      fl.appendChild(h);
    }
    if (!h.dataset.o) h.dataset.o = h.textContent;
    h.textContent = msg;
    el.setAttribute("aria-invalid", "true");
  }
  D.addEventListener("submit", function (e) {
    var f = e.target;
    if (!f.matches("[data-validate]")) return;
    e.preventDefault();
    var first = null,
      n = 0;
    [].forEach.call(f.querySelectorAll("[data-req]"), function (el) {
      var fl = el.closest(".field");
      clean(fl);
      el.removeAttribute("aria-invalid");
      var v = (el.value || "").trim(),
        err = "";
      if (!v) err = el.dataset.msg || "این بخش را پر کن.";
      else if (el.type === "email" && !RE.test(v))
        err = "ایمیل درست نیست. مثل: name@mail.com";
      else if (el.dataset.min && v.length < +el.dataset.min)
        err = "کمی بیشتر توضیح بده، دست کم " + pd(el.dataset.min) + " حرف.";
      if (err) {
        n++;
        bad(el, err);
        if (!first) first = el;
      }
    });
    if (n) {
      first.focus();
      notify({
        type: "err",
        title: n === 1 ? "یک مورد کامل نیست" : pd(n) + " مورد کامل نیست",
        text: "همان جاهایی که قرمز شده را درست کن و دوباره بفرست.",
      });
      return;
    }
    var btn = f.querySelector("button[type=submit]"),
      lbl = btn ? btn.textContent : "";
    if (btn) {
      btn.textContent = "در حال فرستادن…";
      btn.disabled = true;
      f.setAttribute("aria-busy", "true");
    }
    setTimeout(function () {
      if (btn) {
        btn.textContent = lbl;
        btn.disabled = false;
        f.removeAttribute("aria-busy");
      }
      notify({
        type: "ok",
        title: f.dataset.okTitle || "فرستاده شد",
        text: f.dataset.ok || "پیامت رسید، زودی جواب می دهم.",
      });
      f.reset();
      [].forEach.call(f.querySelectorAll(".field"), clean);
    }, 800);
  });
  D.addEventListener("input", function (e) {
    if (e.target.closest) clean(e.target.closest(".field.bad"));
  });

  D.addEventListener("click", function (e) {
    var t = e.target;
    var chip = t.closest("[data-term]");
    if (chip) {
      var term = chip.dataset.term;
      D.querySelectorAll("[data-term]").forEach(function (o) {
        o.setAttribute("aria-pressed", o === chip ? "true" : "false");
      });
      setAll(term);
      filter(term);
      if (!items.length && term)
        location.href = "./categories.html?q=" + encodeURIComponent(term);
      return;
    }
    if (t.closest("[data-clear]")) {
      setAll("");
      filter("");
      var fi = inputs[0];
      if (fi) fi.focus();
      D.querySelectorAll("[data-term]").forEach(function (o) {
        o.setAttribute("aria-pressed", "false");
      });
      return;
    }
    var cp = t.closest("[data-copy]");
    if (cp) {
      var pre = cp.closest(".code").querySelector("pre");
      if (navigator.clipboard && pre) {
        navigator.clipboard.writeText(pre.innerText).then(
          function () {
            notify({
              type: "ok",
              title: "کد کپی شد",
              text: "همین حالا می توانی در پروژه ات بچسبانی.",
            });
          },
          function () {
            notify({
              type: "err",
              title: "کپی نشد",
              text: "مرورگر اجازه نداد. کد را دستی انتخاب و کپی کن.",
            });
          },
        );
      } else {
        notify({
          type: "warn",
          title: "کپی در این مرورگر کار نمی کند",
          text: "کد را دستی انتخاب کن و با Ctrl+C بردار.",
        });
      }
      return;
    }
    var rail = D.querySelector("[data-rail]");
    if (
      rail &&
      (t.closest("[data-rail-prev]") || t.closest("[data-rail-next]"))
    ) {
      var step = Math.max(240, rail.clientWidth * 0.8);
      rail.scrollBy({
        left: t.closest("[data-rail-next]") ? -step : step,
        behavior: "smooth",
      });
    }
  });

  var hs = D.querySelectorAll(".prose h2[id]"),
    tl = D.querySelectorAll(".toc a");
  if (hs.length && tl.length && W.IntersectionObserver) {
    var io2 = new IntersectionObserver(
      function (es) {
        es.forEach(function (en) {
          if (en.isIntersecting)
            tl.forEach(function (a) {
              a.classList.toggle(
                "on",
                a.getAttribute("href") === "#" + en.target.id,
              );
            });
        });
      },
      { rootMargin: "-18% 0px -72% 0px" },
    );
    hs.forEach(function (h) {
      io2.observe(h);
    });
  }

  W.addEventListener(
    "error",
    function (e) {
      var t = e.target;
      if (t && t.tagName === "IMG") t.dataset.failed = "1";
    },
    true,
  );
  [].forEach.call(D.images, function (i) {
    if (i.complete && i.naturalWidth === 0) i.dataset.failed = "1";
  });
})();
