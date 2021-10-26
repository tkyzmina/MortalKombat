import { createElement } from "./createElement.js";

const arenas = document.querySelector(".arenas");

const createReloadButton = () => {
  const divReload = createElement("div", "reloadWrap");
  const btnReload = createElement("button", "button");

  btnReload.innerText = "Restart";

  divReload.appendChild(btnReload);

  btnReload.addEventListener("click", function () {
    window.location.reload();
  });

  arenas.appendChild(divReload);
};

export default createReloadButton;
