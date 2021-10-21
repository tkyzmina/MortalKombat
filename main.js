const arenas = document.querySelector(".arenas");
const $reloadButton = document.querySelector(".reloadWrap .button");
const $formFight = document.querySelector(".control");
const $submitButton = $formFight.querySelector(".button");

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

$formFight.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const enemy = enemyAttack();
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

  console.log("attack ", attack);
  console.log("enemy ", enemy);

  if (attack.hit != enemy.defence) {
    player2.changeHP(attack.value);
  } else if (attack.defence != enemy.hit) {
    player1.changeHP(enemy.value);
  }

  player1.renderHP();
  player2.renderHP();

  if (player1.hp == 0 || player2.hp == 0) {
    $submitButton.disabled = true;
    createReloadButton();
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    arenas.appendChild(playerWins(player2.name));
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    arenas.appendChild(playerWins(player1.name));
  } else if (player1.hp === 0 && player2.hp === 0) {
    arenas.appendChild(playerWins());
  }
});

arenas.appendChild(createPlayer(player1));
arenas.appendChild(createPlayer(player2));
