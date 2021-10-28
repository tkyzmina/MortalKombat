import { HIT, ATTACK, logs } from "./data.js";
import getRandom from "./utils.js";
import createReloadButton from "./modules/createReloadButton.js";
import { enemyAttack, playerAttack } from "./modules/attack.js";
import { changeHP, renderHP, elHP } from "./modules/hp.js";
import { playerWins } from "./modules/playerWins.js";
import { createPlayer } from "./modules/createPlayer.js";

const arenas = document.querySelector(".arenas");
const $formFight = document.querySelector(".control");
const $submitButton = $formFight.querySelector(".button");
const $chat = document.querySelector(".chat");

const player1 = {
  player: 1,
  name: "Fighter",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/liukang.gif",
  weapon: ["меч", "арбалет"],
  changeHP,
  elHP,
  renderHP,
};

const player2 = {
  player: 2,
  name: "Swimmer",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
  weapon: ["ласты", "очки", "нож"],
  changeHP,
  elHP,
  renderHP,
};

const generateLogs = (type, player1, player2, value, hp) => {
  let logType = logs[type];
  const date = new Date();
  const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  const text = `${time} - ${logType[getRandom(logType.length)]
    .replace("[playerKick]", player1.name)
    .replace("[playerDefence]", player2.name)} -${value} [${hp}] / 100`;

  const el = `<p>${text}<p>`;
  $chat.insertAdjacentHTML("afterbegin", el);
};

const showStart = (type, player1, player2) => {
  let logType = logs[type];
  const date = new Date();
  const time = `${date.getHours()}:${date.getMinutes()}`;
  let text = "";
  switch (type) {
    case "end":
      console.log(type + " end?");
      text = `${time}  ${logType[getRandom(logType.length)]
        .replace("[playerWins]", player1.name)
        .replace("[playerLose]", player2.name)}`;
      break;
    case "start":
      text = logs[type]
        .replace("[time]", time)
        .replace("[player1]", player1.name)
        .replace("[player2]", player2.name);
      break;
  }

  const el = `<p>${text}<p>`;
  $chat.insertAdjacentHTML("afterbegin", el);
};

const showResult = () => {
  if (player1.hp == 0 || player2.hp == 0) {
    $submitButton.disabled = true;
    createReloadButton();
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    arenas.appendChild(playerWins(player2.name));
    showStart("end", player2, player1);
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    arenas.appendChild(playerWins(player1.name));
    showStart("end", player1, player2);
  } else if (player1.hp === 0 && player2.hp === 0) {
    arenas.appendChild(playerWins());
  }
};

document.onload = showStart("start", player1, player2);

$formFight.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const enemy = enemyAttack();
  const player = playerAttack();

  if (player.hit !== enemy.defence) {
    player2.changeHP(player.value);
    player2.renderHP();
    generateLogs("hit", player1, player2, player.value, `${player2.hp}`);
  }

  if (player.defence !== enemy.hit) {
    player1.changeHP(enemy.value);
    player1.renderHP();
    generateLogs("hit", player2, player1, enemy.value, `${player1.hp}`);
  }

  showResult();
});

arenas.appendChild(createPlayer(player1));
arenas.appendChild(createPlayer(player2));
