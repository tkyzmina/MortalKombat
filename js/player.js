class Player {
  constructor(props) {
    console.log(props);

    this.player = props.player;
    this.name = props.name;
    this.hp = props.hp;
    this.img = props.img;
  }

  changeHP = (num) => {
    this.hp -= num;

    if (this.hp <= 0) {
      this.hp = 0;
    }
  };

  elHP = () => {
    return document.querySelector(`.player${this.player} .life`);
  };

  renderHP = () => {
    this.elHP().style.width = this.hp + "%";
  };
}

const player1 = new Player({
  player: 1,
  name: "Fighter",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
  weapon: ["ласты", "очки", "нож"],
});

const player2 = new Player({
  player: 2,
  name: "Swimmer",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/liukang.gif",
  weapon: ["ласты", "очки", "нож"],
});

export { player1, player2 };
