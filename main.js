const arenas = document.querySelector(".arenas");
const $randomButton = document.querySelector(".button");
const $reloadButton = document.querySelector(".reloadWrap .button");


function getRundom(num) {
  return Math.ceil(Math.random() * num);
}


const player1 = {
  player: 1,
  name: "Fighter",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/liukang.gif",
  weapon: ["меч", "арбалет"],
  attack: function () {
    console.log(this.name + " Fight...");
  },
  changeHP: changeHP,
  elHP: elHP,
  renderHP: renderHP,
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
  changeHP: changeHP,
  elHP: elHP,
  renderHP: renderHP,
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
  const divReload = document.createElement("div");
  const btnReload = document.createElement("button");

  divReload.className = "reloadWrap";
  btnReload.className = "button";
  btnReload.innerText = "Restart";

  divReload.appendChild(btnReload);

  btnReload.addEventListener("click", function () {
    window.location.reload();
  });

  return divReload;
}

$randomButton.addEventListener("click", function () {
  player1.changeHP(getRandom(20));
  player2.changeHP(getRandom(20));

  player1.renderHP();
  player2.renderHP();

  if (player1.hp == 0 || player2.hp == 0) {
    $randomButton.disabled = true;
    arenas.appendChild(createReloadButton());
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
