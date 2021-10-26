import { createElement } from "./createElement.js";

const playerWins = (name) => {
  const loseTitle = createElement("div", "loseTitle");
  if (name) {
    loseTitle.innerText = name + " wins!";
  } else {
    loseTitle.innerText = " draw";
  }

  return loseTitle;
};
export { playerWins };
