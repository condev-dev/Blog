(function () {
  "use strict";

  var D = document;
  var B = D.body;
  var W = window;
  var nav = D.getElementById("nav");
  var burger = D.getElementById("burger") || D.getElementById("menuBtn");
  var mast = D.getElementById("mast") || D.querySelector(".masthead");
  var previousFocus = null;
  var icons = {
    ok: "#i-check",
    err: "#i-x-c",
    warn: "#i-alert",
    info: "#i-info",
  };

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>\"]/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '\"': "&quot;" }[char];
    });
  }

  function setNav(open) {
    B.classList.toggle("nav-open", open);
    if (burger) burger.setAttribute("aria-expanded", open ? "true" : "false");

    if (open) {
      previousFocus = D.activeElement;
      var first = nav && nav.querySelector("a, button, [tabindex]:not([tabindex='-1'])");
      if (first) setTimeout(function () { first.focus(); }, 50);
    } else if (previousFocus && typeof previousFocus.focus === "function") {
      previousFocus.focus();
      previousFocus = null;
    }
  }

  function toastBox() {
    var box = D.getElementById("toasts");
    if (!box) {
      box = D.createElement("div");
      box.id = "toasts";
      box.className = "toasts";
      box.setAttribute("role", "region");
      box.setAttribute("aria-live", "polite");
      box.setAttribute("aria-label", "اعلان‌ها");
      B.appendChild(box);
    }
    return box;
  }

  function notify(options) {
    options = options || {};
    var type = icons[options.type] ? options.type : "info";
    var duration = Number(options.duration) || 5000;
    var box = toastBox();
    var item = D.createElement("div");

    item.className = "toast toast--" + type;
    item.style.setProperty("--d", duration + "ms");
    item.setAttribute("role", "status");
    item.innerHTML =
      '<span class="toast__ic" aria-hidden="true"><svg class="ic"><use href="' + icons[type] + '"></use></svg></span>' +
      '<div class="toast__b"><p class="toast__t">' + escapeHtml(options.title || "اعلان") + "</p>" +
      (options.text ? '<p class="toast__d">' + escapeHtml(options.text) + "</p>" : "") +
      (options.action ? '<a class="toast__a" href="' + escapeHtml(options.action.href || "#") + '">' + escapeHtml(options.action.label || "مشاهده") + '<svg class="ic"><use href="#i-arrow-l"></use></svg></a>' : "") +
      '</div><button class="toast__x" type="button" aria-label="بستن اعلان"><svg class="ic"><use href="#i-x"></use></svg></button>' +
      '<span class="toast__p"><i></i></span>';

    while (box.children.length >= 4) box.firstElementChild.remove();
    box.appendChild(item);

    var removed = false;
    function remove() {
      if (removed) return;
      removed = true;
      item.classList.add("out");
      setTimeout(function () { item.remove(); }, 260);
    }

    var close = item.querySelector(".toast__x");
    var progress = item.querySelector(".toast__p i");
    if (close) close.addEventListener("click", remove);
    if (progress) progress.addEventListener("animationend", remove);
    setTimeout(remove, duration + 1000);
    return item;
  }

  W.notify = notify;
  W.showToast = function (title, text, type, duration) {
    return notify({ title: title, text: text, type: type, duration: duration });
  };
  W.comingSoon = function () {
    notify({
      type: "info",
      title: "ثبت مقاله به‌زودی باز می‌شود",
      text: "فعلاً موضوعت را از صفحه‌ی ارتباط با ما بفرست.",
    });
    return false;
  };

  if (burger) {
    burger.addEventListener("click", function () {
      setNav(!B.classList.contains("nav-open"));
    });
  }

  D.addEventListener("click", function (event) {
    var target = event.target;
    var close = target.closest && target.closest("[data-close-nav], .nav__close");
    if (close) {
      event.preventDefault();
      setNav(false);
      return;
    }

    var link = target.closest && target.closest(".nav a");
    if (link && W.innerWidth < 1024) setNav(false);
  });

  D.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && B.classList.contains("nav-open")) setNav(false);
  });

  W.addEventListener("resize", function () {
    if (W.innerWidth >= 1024 && B.classList.contains("nav-open")) setNav(false);
  });

  function updateMasthead() {
    if (mast) mast.classList.toggle("stuck", W.scrollY > 8);
  }
  W.addEventListener("scroll", updateMasthead, { passive: true });
  updateMasthead();

  D.addEventListener("click", function (event) {
    var target = event.target;
    var writing = target.closest && target.closest("[data-writing], [onclick*='comingSoon']");
    if (!writing) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    setNav(false);
    notify({
      type: "info",
      title: "ثبت مقاله به‌زودی باز می‌شود",
      text: "فعلاً موضوعت را از صفحه‌ی ارتباط با ما بفرست.",
    });
  }, true);
})();
