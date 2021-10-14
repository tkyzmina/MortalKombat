const player1 = {
  name: "Fighter",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/liukang.gif",
  weapon: ["меч", "арбалет"],
  attack: function () {
    console.log(this.name + " Fight...");
  },
};

const player2 = {
  name: "Swimmer",
  hp: 50,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
  weapon: ["ласты", "очки"],
  attack: function () {
    console.log(this.name + " Fight...");
  },
};

function createPlayer(playerNumber, characterData) {
  const player = document.createElement("div");
  player.className = playerNumber;

  const progressbar = document.createElement("div");
  progressbar.classList.add("progressbar");

  const character = document.createElement("div");
  character.classList.add("character");

  const life = document.createElement("div");
  life.classList.add("life");
  life.style.width = characterData.hp + "%";

  const name = document.createElement("div");
  name.classList.add("name");
  name.textContent = characterData.name;

  const img = document.createElement("img");
  img.src = characterData.img;

  character.append(img);
  progressbar.append(life, name);
  player.append(progressbar, character);

  document.querySelector(".arenas").appendChild(player);
}
createPlayer("player1", player1);
createPlayer("player2", player2);
