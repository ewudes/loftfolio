function fitText(el, minFontSize = 10, maxFontSize = 32) {
  const parentWidth = el.parentElement.offsetWidth;
  const style = window.getComputedStyle(el);
  const fontSize = parseFloat(style.fontSize);

  const textWidth = el.scrollWidth;

  const ratio = parentWidth / textWidth;

  let newSize = fontSize * ratio;

  if (newSize < minFontSize) newSize = minFontSize;
  if (newSize > maxFontSize) newSize = maxFontSize;

  el.style.fontSize = newSize + "px";
}

document.addEventListener("DOMContentLoaded", () => {
  const userName = document.querySelector(".user__name");
  if (userName) {
    fitText(userName, 10, 32);
    window.addEventListener("resize", () => fitText(userName, 10, 32));
  }
});
