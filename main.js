const arenas = document.querySelector(".arenas");
const $reloadButton = document.querySelector(".reloadWrap .button");
const $formFight = document.querySelector(".control");
const $submitButton = $formFight.querySelector(".button");
const $chat = document.querySelector(".chat");

const player1 = {
  player: 1,
  name: "Fighter",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/liukang.gif",
  weapon: ["меч", "арбалет"],
  attack,
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
  attack,
  changeHP,
  elHP,
  renderHP,
};

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

const ATTACK = ["head", "body", "foot"];

const logs = {
  start:
    "Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.",
  end: [
    "Результат удара [playerWins]: [playerLose] - труп",
    "[playerLose] погиб от удара бойца [playerWins]",
    "Результат боя: [playerLose] - жертва, [playerWins] - убийца",
  ],
  hit: [
    "[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.",
    "[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.",
    "[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.",
    "[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.",
    "[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.",
    "[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.",
    "[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.",
    "[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.",
    "[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.",
    "[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.",
    "[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.",
    "[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.",
    "[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.",
    "[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.",
    "[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.",
    "[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.",
    "[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.",
    "[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.",
  ],
  defence: [
    "[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.",
    "[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.",
    "[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.",
    "[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.",
    "[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.",
    "[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.",
    "[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.",
    "[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.",
  ],
  draw: "Ничья - это тоже победа!",
};

function getRandom(num) {
  return Math.ceil(Math.random() * num);
}

function attack() {
  console.log(this.name + " Fight...");
}

function createElement(tag, className) {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }
  return $tag;
}

function createPlayer(playerObj) {
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
}

function changeHP(num) {
  if (this.hp > 0) {
    this.hp -= num;
  } else if (this.hp <= 0) {
    this.hp = 0;
  }
}

function elHP() {
  return document.querySelector(".player" + this.player + " .life");
}

function renderHP() {
  this.elHP().style.width = this.hp + "%";
}

function playerWins(name) {
  const loseTitle = createElement("div", "loseTitle");
  if (name) {
    loseTitle.innerText = name + " wins!";
  } else {
    loseTitle.innerText = " draw";
  }

  return loseTitle;
}

function createReloadButton() {
  const divReload = createElement("div", "reloadWrap");
  const btnReload = createElement("button", "button");

  btnReload.innerText = "Restart";

  divReload.appendChild(btnReload);

  btnReload.addEventListener("click", function () {
    window.location.reload();
  });

  arenas.appendChild(divReload);
}

function enemyAttack() {
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];

  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
  };
}

function playerAttack() {
  const attack = {};

  for (let item of $formFight) {
    if (item.checked && item.name === "hit") {
      attack.value = getRandom(HIT[item.value]);
      attack.hit = item.value;
    }

    if (item.checked && item.name === "defence") {
      attack.defence = item.value;
    }

    item.checked = false;
  }

  return attack;
}

function generateLogs(type, player1, player2, value, hp) {
  let logType = logs[type];
  const date = new Date();
  const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  const text = `${time} - ${logType[getRandom(logType.length)]
    .replace("[playerKick]", player1.name)
    .replace("[playerDefence]", player2.name)} -${value} [${hp}] / 100`;
  console.log(text);

  const el = `<p>${text}<p>`;
  $chat.insertAdjacentHTML("afterbegin", el);
}

function showStart(type, player1, player2) {
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
      console.log(type + "start?");
      text = logs[type]
        .replace("[time]", time)
        .replace("[player1]", player1.name)
        .replace("[player2]", player2.name);
      break;
  }

  const el = `<p>${text}<p>`;
  $chat.insertAdjacentHTML("afterbegin", el);
}
function showResult() {
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
}

document.onload = showStart("start", player1, player2);

$formFight.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const enemy = enemyAttack();
  const player = playerAttack();

  console.log(player);
  console.log(enemy);

  if (player.hit !== enemy.defence) {
    console.log(player2);
    player2.changeHP(player.value);
    player2.renderHP();
    generateLogs("hit", player1, player2, player.value, `${player2.hp}`);
  }

  if (player.defence !== enemy.hit) {
    console.log(player1);
    player1.changeHP(enemy.value);
    player1.renderHP();
    generateLogs("hit", player2, player1, enemy.value, `${player1.hp}`);
  }

  showResult();
});

arenas.appendChild(createPlayer(player1));
arenas.appendChild(createPlayer(player2));
