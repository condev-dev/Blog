
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
  show("پیامت رسید. زودی جواب می دهم.");
  e.target.reset();
});
document.getElementById("newsForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const v = document.getElementById("em").value.trim();
  if (!v) return show("ایمیلت را بنویس.");
  show("عضویتت ثبت شد.");
  e.target.reset();
});
