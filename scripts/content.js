// const selector = "#SearchDropdown";
const selector = "[href='/r/popular/']";

let count = 0;
const containerId = 'bagel-container'

const header = document.querySelector('header');

function insert() {
  const popularBtn = document.querySelector(selector);
  const popularBtnContainer = popularBtn?.parentElement;
  if (popularBtnContainer) {
    const badge = document.createElement("a");
    badge.href = "/r/all/"

    badge.className = popularBtn.className;
    badge.style.display = 'flex';
    badge.style.alignItems = 'center';
    badge.textContent = `/ALL`;

    const myContainer = document.createElement("div");
    // myContainer.classList.add(popularBtnContainer.className, "type--div");
    myContainer.style.marginLeft = '8px';
    myContainer.appendChild(badge);
    myContainer.id = containerId;

    (popularBtnContainer).insertAdjacentElement("afterend", myContainer);
  }
}

insert();

if (header) {
  const observer = new MutationObserver(_mutations => {
    try {
      if (document.querySelector(selector) && !document.querySelector("[href='/r/all/']")) {
        console.log('found popular button');
        insert();
        count++;
        if (document.querySelectorAll('#' + containerId).length || count > 50) {
          console.log('dc');
          observer.disconnect();
        }
      }
    } catch (e) {
      console.warn(e);
      observer.disconnect();
    }
  });

  observer.observe(document.querySelector('header'), {
    childList: true,
    subtree: true,
  });
}

