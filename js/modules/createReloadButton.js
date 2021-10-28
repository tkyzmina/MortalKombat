import { createElement } from "./createElement.js";

const arenas = document.querySelector(".arenas");

const createReloadButton = () => {
  const divReload = createElement("div", "reloadWrap");
  const btnReload = createElement("button", "button");

  btnReload.innerText = "Restart";

  btnReload.addEventListener("click", function () {
    window.location.reload();
  });

  divReload.appendChild(btnReload);
  arenas.appendChild(divReload);
};

export default createReloadButton;
