/* blog.js: فقط رفتارهای مخصوص صفحه‌ی مقاله */
(function () {
  "use strict";
  var D = document;
  var W = window;

  function notify(options) {
    if (typeof W.notify === "function") return W.notify(options);
  }

  var progress = D.getElementById("progress");
  function updateProgress() {
    if (!progress) return;
    var height = D.documentElement.scrollHeight - W.innerHeight;
    progress.style.transform = "scaleX(" + (height > 0 ? Math.min(1, W.scrollY / height) : 0) + ")";
  }
  W.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  D.addEventListener("click", function (event) {
    var copy = event.target.closest && event.target.closest("[data-copy]");
    if (!copy) return;
    var code = copy.closest(".code");
    var pre = code && code.querySelector("pre");
    if (!pre) return;

    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      notify({ type: "warn", title: "کپی در این مرورگر کار نمی‌کند", text: "کد را دستی انتخاب و کپی کن." });
      return;
    }
    navigator.clipboard.writeText(pre.innerText).then(
      function () {
        notify({ type: "ok", title: "کد کپی شد", text: "الان می‌توانی بچسبانی." });
      },
      function () {
        notify({ type: "err", title: "کپی نشد", text: "دستی کپی کن." });
      },
    );
  });

  var heads = [].slice.call(D.querySelectorAll(".prose h2[id]"));
  var links = [].slice.call(D.querySelectorAll(".toc a"));
  if (heads.length && links.length && W.IntersectionObserver) {
    var tocObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          link.classList.toggle("on", link.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-18% 0px -72% 0px" });
    heads.forEach(function (head) { tocObserver.observe(head); });
  }

  var reveal = [].slice.call(D.querySelectorAll(".reveal"));
  if (W.IntersectionObserver && reveal.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target);
        }
      });
    });
    reveal.forEach(function (element) { revealObserver.observe(element); });
  } else {
    reveal.forEach(function (element) { element.classList.add("in"); });
  }

  D.addEventListener("submit", function (event) {
    var form = event.target;
    if (!form.matches("[data-validate]")) return;
    event.preventDefault();
    var input = form.querySelector("input[type=email], input");
    var value = input ? input.value.trim() : "";
    if (!value || (input && input.type === "email" && !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value))) {
      notify({ type: "err", title: "ایمیل را درست وارد کن", text: "بدون ایمیل چیزی برای فرستادن ندارم." });
      if (input) input.focus();
      return;
    }
    notify({ type: "ok", title: "عضویتت ثبت شد", text: "از این شنبه ایمیل‌ها برایت می‌آید." });
    form.reset();
  });
})();
