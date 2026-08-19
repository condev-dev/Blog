const t = document.getElementById("toast");
function show(msg) {
  t.textContent = msg;
  t.style.display = "block";
  setTimeout(() => (t.style.display = "none"), 3200);
}
document.querySelector("[data-writing]").onclick = () =>
  show("ثبت مقاله هنوز باز نشده. فعلا از صفحه ارتباط با ما بفرست.");
document.getElementById("newsForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const v = document.getElementById("em").value.trim();
  if (!v) return show("ایمیلت را بنویس.");
  show("عضویتت ثبت شد.");
  e.target.reset();
});
