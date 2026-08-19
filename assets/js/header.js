(function () {
  var D = document,
    B = document.body,
    W = window;

  var nav = D.getElementById("nav"),
    burger = D.getElementById("burger"),
    mast = D.getElementById("mast"),
    back = null;

  function navSet(open) {
    B.classList.toggle("nav-open", open);
    if (burger) burger.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) {
      back = D.activeElement;
      var f = nav && nav.querySelector(".nav__l");
      if (f)
        setTimeout(function () {
          f.focus();
        }, 80);
    } else if (back && back.focus) back.focus();
  }

  if (burger)
    burger.addEventListener("click", function () {
      navSet(!B.classList.contains("nav-open"));
    });

  D.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && B.classList.contains("nav-open")) navSet(false);
  });

  W.addEventListener("resize", function () {
    if (W.innerWidth >= 1024 && B.classList.contains("nav-open")) navSet(false);
  });

  function frame() {
    if (mast) mast.classList.toggle("stuck", W.scrollY > 8);
  }

  W.addEventListener(
    "scroll",
    function () {
      requestAnimationFrame(frame);
    },
    { passive: true },
  );
  frame();

  D.addEventListener("click", function (e) {
    var t = e.target;

    if (t.closest("[data-close-nav]")) {
      navSet(false);
      return;
    }

    var link = t.closest(".nav__l");
    if (link && W.innerWidth < 1024 && link.tagName === "A") navSet(false);

    var w = t.closest("[data-writing]");
    if (w) {
      e.preventDefault();
      navSet(false);
      if (typeof W.notify === "function") {
        W.notify({
          type: "info",
          title: "ثبت مقاله به زودی باز می شود",
          text: "فرم ارسال مقاله در حال آماده سازی است. تا آن موقع موضوع و خلاصه ات را از صفحه ارتباط با ما بفرست.",
          action: {
            href: "./contactUs.html",
            label: "فرستادن پیشنهاد مقاله",
          },
        });
      }
    }
  });
})();
