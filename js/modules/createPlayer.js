import { createElement } from "./createElement.js";

const createPlayer = (playerObj) => {
  const player = createElement("div", "player" + playerObj.player);
  const progressbar = createElement("div", "progressbar");
  const character = createElement("div", "character");
  const life = createElement("div", "life");
  const name = createElement("div", "name");
  const img = createElement("img");

  life.style.width = playerObj.hp + "%";
  name.textContent = playerObj.name;
  img.src = playerObj.img;

  character.append(img);
  progressbar.append(life, name);
  player.append(progressbar, character);

  return player;
};
export { createPlayer };
