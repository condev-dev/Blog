/* aboutUs.js: فقط رفتار خبرنامه‌ی صفحه‌ی درباره */
(function () {
  "use strict";
  var form = document.querySelector(".newsletter form, form[data-newsletter]");
  var notify = window.notify;
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var input = form.querySelector('input[type="email"], input');
    var value = input ? input.value.trim() : "";
    if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      if (input) input.classList.add("bad");
      if (input) input.focus();
      if (typeof notify === "function") notify({ type: "err", title: "ایمیل درست نیست", text: "یک ایمیل معتبر وارد کن." });
      return;
    }
    if (input) input.classList.remove("bad");
    if (typeof notify === "function") notify({ type: "ok", title: "عضویتت ثبت شد", text: "از این شنبه ایمیل‌ها برایت می‌آید." });
    form.reset();
  });
})();
