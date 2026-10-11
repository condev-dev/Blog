/* the shared toast lives in header.js; resolve it lazily because header.js
   is loaded after this file */
function show(text, ok) {
  if (typeof window.notify !== "function") return;
  window.notify({
    type: ok ? "ok" : "err",
    title: ok ? "انجام شد" : "یک مورد کامل نیست",
    text: text,
  });
}
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const n = name.value.trim(),
    m = mail.value.trim(),
    s = subject.value.trim(),
    g = msg.value.trim();
  [name, mail, subject, msg].forEach((el) => el.classList.remove("bad"));
  if (!n) {
    name.classList.add("bad");
    name.focus();
    return show("نامت را بنویس.");
  }
  if (!m || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m)) {
    mail.classList.add("bad");
    mail.focus();
    return show("ایمیل درست نیست.");
  }
  if (!s) {
    subject.classList.add("bad");
    subject.focus();
    return show("موضوع را انتخاب کن.");
  }
  if (!g) {
    msg.classList.add("bad");
    msg.focus();
    return show("پیامت خالی است.");
  }
  show("پیامت رسید. زودی جواب می دهم.", true);
  e.target.reset();
});
document.getElementById("newsForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const v = document.getElementById("em").value.trim();
  if (!v) return show("ایمیلت را بنویس.");
  show("عضویتت ثبت شد.", true);
  e.target.reset();
});
