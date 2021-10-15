const arenas = document.querySelector(".arenas");
const $randomButton = document.querySelector(".button");
const MaxDamage = 20;
const randomNumber = Math.ceil(Math.random() * MaxDamage);

const player1 = {
  player: 1,
  name: "Fighter",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/liukang.gif",
  weapon: ["меч", "арбалет"],
  attack: function () {
    console.log(this.name + " Fight...");
  },
};

const player2 = {
  player: 2,
  name: "Swimmer",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
  weapon: ["ласты", "очки", "нож"],
  attack: function () {
    console.log(this.name + " Fight...");
  },
};

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

function changeHP(player) {
  const $playerLife = document.querySelector(
    ".player" + player.player + " .life"
  );
  player.hp -= randomNumber;
  $playerLife.style.width = player.hp + "%";

  if (player.hp < 0) {
    playerLose(player.name);
    $playerLife.style.width = 0 + "%";
    $randomButton.setAttribute("disabled", "disabled");
  }
}

function playerLose(name) {
  const loseTitle = createElement("div", "loseTitle");
  loseTitle.textContent = name + " lose...";
  arenas.appendChild(loseTitle);
}

$randomButton.addEventListener("click", function () {
  const randomPlayerNumber = Math.ceil(Math.random() * 2);

  if (randomPlayerNumber == 1) {
    changeHP(player1);
  } else {
    changeHP(player2);
  }
});

arenas.appendChild(createPlayer(player1));
arenas.appendChild(createPlayer(player2));
