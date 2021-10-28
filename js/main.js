import { getRandom, getTime } from "./utils.js";
import createReloadButton from "./modules/createReloadButton.js";
import { enemyAttack, playerAttack } from "./modules/attack.js";
import { playerWins } from "./modules/playerWins.js";
import { createPlayer } from "./modules/createPlayer.js";
import { getTextLog } from "./modules/getTextLog.js";
import { player1, player2 } from "./player.js";

const arenas = document.querySelector(".arenas");
const $formFight = document.querySelector(".control");
const $submitButton = $formFight.querySelector(".button");
const $chat = document.querySelector(".chat");

const generateLogs = (
  type,
  { name } = {},
  { name: playerName2, hp } = {},
  value
) => {
  let text = getTextLog(type, name, playerName2);

  switch (type) {
    case "hit":
      text = `${getTime()} ${text} -${value} [${hp}] / 100`;
      break;
    case "defence":
    case "end":
    case "draw":
      text = `${getTime()} ${text}`;
  }

  const el = `<p>${text}<p>`;
  $chat.insertAdjacentHTML("afterbegin", el);
};

const showResult = () => {
  if (player1.hp === 0 || player2.hp === 0) {
    $submitButton.disabled = true;
    createReloadButton();
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    arenas.appendChild(playerWins(player2.name));
    generateLogs("end", player2, player1);
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    arenas.appendChild(playerWins(player1.name));
    generateLogs("end", player1, player2);
  } else if (player1.hp === 0 && player2.hp === 0) {
    arenas.appendChild(playerWins());
    generateLogs("draw");
  }
};

document.onload = generateLogs("start", player1, player2);

$formFight.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const {
    hit: hitEnemy,
    defence: defenceEnemy,
    value: valueEnemy,
  } = enemyAttack();

  const { hit, defence, value } = playerAttack();

  if (defence !== hitEnemy) {
    player1.changeHP(valueEnemy);
    player1.renderHP();
    generateLogs("hit", player2, player1, valueEnemy);
  } else {
    generateLogs("defence", player2, player1);
  }

  if (hit !== defenceEnemy) {
    player2.changeHP(value);
    player2.renderHP();
    generateLogs("hit", player1, player2, value);
  } else {
    generateLogs("defence", player1, player2);
  }

  showResult();
});

arenas.appendChild(createPlayer(player1));
arenas.appendChild(createPlayer(player2));
