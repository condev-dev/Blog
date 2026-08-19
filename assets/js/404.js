      const t = document.getElementById("toast");
      const show = (m) => {
        t.textContent = m;
        t.style.display = "block";
        setTimeout(() => (t.style.display = "none"), 3000);
      };
      document.querySelector("[data-writing]").onclick = () =>
        show("ثبت مقاله هنوز باز نشده.");
