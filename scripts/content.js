// const selector = "#SearchDropdown";
const selector = "[href='/r/popular/']";

let count = 0;
const containerId = 'bagel-container'

const header = document.querySelector('header');

function insertRALLBtn() {
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

insertRALLBtn();

if (header) {
  const headerObserver = new MutationObserver(_mutations => {
    try {
      if (document.querySelector(selector) && !document.querySelector("[href='/r/all/']")) {
        console.log('found popular button');
        insertRALLBtn();
        count++;
        if (document.querySelectorAll('#' + containerId).length || count > 50) {
          console.log('dc');
          headerObserver.disconnect();
        }
      }
    } catch (e) {
      console.error("BAGEL PLUGIN ERROR: /ALL BTN");
      console.error(e);
      headerObserver.disconnect();
    }
  });

  headerObserver.observe(document.querySelector('header'), {
    childList: true,
    subtree: true,
  });
}


const bodyObserver = new MutationObserver(_mutations => {
  checkImgViewer();
});

bodyObserver.observe(document.documentElement, {
  childList: true,
  subtree: true
});
console.log("OBSERVING");

// const icons = document.querySelectorAll("i.icon.icon-expand");
// icons.forEach(expander => {
//   const expandImgObserver = new MutationObserver(checkImgViewer);
//   expandImgObserver.observe(expander, {
//     childList: false,
//     subtree: false,
//     attributes: true,
//     characterData: false
//   });
// });


function checkImgViewer() {
  try {
    const albumElems = document.querySelectorAll("figure");

    if (albumElems.length) { //albums to be fixed
      console.log(albumElems);

      albumElems.forEach(ae => {
        const imgElem = ae.querySelector("img");
        if (imgElem) {
          const isStyled_DumbCheck = imgElem.style["max-height"] === "100%" && imgElem.style["max-width"] === "100%";
          if (!isStyled_DumbCheck) {
            console.log(imgElem);
            imgElem.style["max-height"] = "100%";
            imgElem.style["max-width"] = "100%";
            const imgContainer = imgElem.parentElement;
            imgContainer.style.height = "inherit";
          }
        }
      });
    }
  } catch (e) {
    console.error("BAGEL PLUGIN ERROR: IMG VIEWER");
    console.error(e);
    expandImgObserver.disconnect();
  }
}
