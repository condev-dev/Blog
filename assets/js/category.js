(function () {
  var D = document,
    B = D.body,
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

  D.addEventListener("click", function (e) {
    var chip = e.target.closest("[data-term]");
    if (chip) {
      D.querySelectorAll("[data-term]").forEach(function (c) {
        c.setAttribute("aria-pressed", c === chip ? "true" : "false");
      });
      setAll(chip.dataset.term);
      filter(chip.dataset.term);
    }
    if (e.target.closest("[data-clear]")) {
      setAll("");
      filter("");
      D.querySelectorAll("[data-term]").forEach(function (c) {
        c.setAttribute("aria-pressed", c.dataset.term ? "false" : "true");
      });
    }
  });

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
  } else
    rv.forEach(function (el) {
      el.classList.add("in");
    });

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
    emp = D.getElementById("empty");
  function filter(q) {
    var n = nm(q),
      hit = 0;
    items.forEach(function (it) {
      var ok =
        !n || nm(it.dataset.post + " " + it.textContent).indexOf(n) > -1;
      it.hidden = !ok;
      if (ok) hit++;
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
      filter(i.value);
      D.querySelectorAll("[data-term]").forEach(function (c) {
        c.setAttribute("aria-pressed", "false");
      });
    });
  });
  D.addEventListener("submit", function (e) {
    if (e.target.matches("[role=search]")) {
      e.preventDefault();
      var inp = e.target.querySelector("input"),
        v = inp ? inp.value.trim() : "";
      if (!v) {
        notify({
          type: "info",
          title: "چیزی برای جستجو نوشته نشده",
          text: "یک کلمه بنویس، مثلا: قرارداد یا کیف پول.",
        });
        return;
      }
      filter(v);
    }
  });
  var qp = new URLSearchParams(location.search).get("q");
  if (qp) {
    setAll(qp);
    filter(qp);
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
