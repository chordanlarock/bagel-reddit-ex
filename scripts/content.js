const popularBtn = document.querySelector("[href='/r/popular/']");
const popularBtnContainer = popularBtn.parentElement;

if (popularBtnContainer) {
const badge = document.createElement("a");
  badge.href="/r/all/"

  badge.classList.add(popularBtn.className, "type--icon");
  badge.style.display = 'flex';
  badge.style.alignItems = 'center';
  badge.textContent = `/ALL`;

  const myContainer = document.createElement("div");
  // myContainer.classList.add(popularBtnContainer.className, "type--div");
  myContainer.style.marginLeft = '8px';
  myContainer.appendChild(badge);

  (popularBtnContainer).insertAdjacentElement("afterend", myContainer);
}