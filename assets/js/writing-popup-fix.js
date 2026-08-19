(function () {
  "use strict";

  var D = document;
  var popupId = "writing-only-popup";
  var styleId = "writing-only-popup-style";
  var closeTimer;

  function installStyle() {
    if (D.getElementById(styleId)) return;
    var style = D.createElement("style");
    style.id = styleId;
    style.textContent = [
      "#" + popupId + "{position:fixed;right:20px;bottom:20px;width:min(380px,calc(100vw - 40px));display:flex;align-items:flex-start;gap:12px;padding:16px 18px;background:#fffaf5;color:#292524;border:1px solid #f0c9a8;border-right:5px solid #b45309;border-radius:14px;box-shadow:0 18px 50px rgba(41,37,36,.22);font:15px/1.8 Vazirmatn,system-ui,sans-serif;direction:rtl;text-align:right;z-index:2147483647;opacity:1;visibility:visible;transform:translateY(0);transition:opacity .2s ease,transform .2s ease}",
      "#" + popupId + ".is-closing{opacity:0;transform:translateY(10px)}",
      "#" + popupId + " .writing-only-content{flex:1}",
      "#" + popupId + " strong{display:block;color:#92400e;font-size:15px;margin-bottom:3px}",
      "#" + popupId + " p{margin:0;color:#57534e;font-size:13px}",
      "#" + popupId + " button{flex:0 0 auto;width:28px;height:28px;border:0;border-radius:50%;background:#f5e5d6;color:#78350f;font-size:22px;line-height:24px;cursor:pointer;padding:0}",
      "#" + popupId + " button:hover{background:#ead0b8}"
    ].join("");
    (D.head || D.documentElement).appendChild(style);
  }

  function closePopup(popup) {
    if (!popup || !popup.parentNode) return;
    popup.classList.add("is-closing");
    setTimeout(function () { if (popup.parentNode) popup.remove(); }, 220);
  }

  function showPopup() {
    installStyle();
    var old = D.getElementById(popupId);
    if (old) old.remove();
    var popup = D.createElement("div");
    popup.id = popupId;
    popup.setAttribute("role", "status");
    popup.setAttribute("aria-live", "polite");
popup.innerHTML = '<div class="writing-only-content"><strong>ثبت مقاله به‌زودی باز می‌شود</strong><p>فعلاً موضوعت را از صفحه‌ی ارتباط با ما بفرست.</p></div>' + '<button class="toast__x" type="button" aria-label="بستن اعلان" style="display: flex !important; justify-content: center !important; align-items: center !important; padding: 0 !important; width: 24px !important; height: 24px !important; border: none !important; cursor: pointer !important;"> <svg class="ic" aria-hidden="true" style="width: 13px !important; height: 13px !important; display: block !important; margin: auto !important; fill: currentColor !important;"><use href="#i-x" xlink:href="#i-x"></use></svg> </button>';
    D.body.appendChild(popup);
    popup.querySelector("button").addEventListener("click", function () { closePopup(popup); });
    clearTimeout(closeTimer);
    closeTimer = setTimeout(function () { closePopup(popup); }, 4500);
  }

  window.comingSoon = function () {
    showPopup();
    return false;
  };

  D.addEventListener("click", function (event) {
    var target = event.target;
    var trigger = target && target.closest && target.closest("[data-writing], [onclick*='comingSoon']");
    if (!trigger) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    showPopup();
  }, true);
})();
