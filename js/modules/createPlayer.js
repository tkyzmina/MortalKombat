import { createElement } from "./createElement.js";

const createPlayer = ({ player, hp, name, img }) => {
  const $player = createElement("div", `player${player}`);
  const $progressbar = createElement("div", "progressbar");
  const $character = createElement("div", "character");
  const $life = createElement("div", "life");
  const $name = createElement("div", "name");
  const $img = createElement("img");

  $life.style.width = hp + "%";
  $name.textContent = name;
  $img.src = img;

  $character.append($img);
  $progressbar.append($life, $name);
  $player.append($progressbar, $character);

  return $player;
};

export { createPlayer };
