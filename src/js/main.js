const record = document.getElementById("record");
const shot = document.getElementById("shot");
const hit = document.getElementById("hit");
const dead = document.getElementById("dead");
const enemy = document.getElementById("enemy");
const header = document.querySelector(".header");
const again = document.getElementById("again");

const game = {
  ships: [],
  shipCount: 0,
  xBoardLength: enemy.querySelector("tr").querySelectorAll("td").length,
  yBoardLength: enemy.querySelectorAll("tr").length,

  optionShip: {
    count: [1, 2, 3, 4],
    size: [4, 3, 2, 1]
  },
  collision: new Set(),
  generateShip() {
    for (
      let i = 0, arrayLen = this.optionShip.count.length;
      i < arrayLen;
      i++
    ) {
      for (let j = 0, shipsLen = this.optionShip.count[i]; j < shipsLen; j++) {
        const size = this.optionShip.size[i];
        const ship = this.generateOptionsShip(size);
        this.ships.push(ship);
        this.shipCount++;
      }
    }
  },
  generateOptionsShip(shipSize) {
    const ship = {
      hit: [],
      location: []
    };

    const directions = ["horizontal", "vertical"];
    const direction = directions[Math.floor(Math.random() * directions.length)];

    let x, y;

    if (direction === "vertical") {
      x = Math.floor(Math.random() * game.xBoardLength);
      y = Math.floor(Math.random() * (game.yBoardLength - shipSize));
    } else {
      x = Math.floor(Math.random() * (game.xBoardLength - shipSize));
      y = Math.floor(Math.random() * game.yBoardLength);
    }

    for (let i = 0; i < shipSize; i++) {
      if (direction === "vertical") {
        ship.location.push(y + i + "" + x);
      } else {
        ship.location.push(y + "" + (x + i));
      }
      ship.hit.push("");
    }

    if (this.checkCollision(ship.location)) {
      return this.generateOptionsShip(shipSize);
    }

    this.addCollision(ship.location);

    return ship;
  },
  checkCollision(location) {
    for (const coord of location) {
      if (this.collision.has(coord)) {
        return true;
      }
    }
  },
  addCollision(location) {
    for (let i = 0; i < location.length; i++) {
      const coordX = location[i][1];
      const coordY = location[i][0];

      for (let y = +coordY - 1; y < +coordY + 2; y++) {
        for (let x = +coordX - 1; x < +coordX + 2; x++) {
          if (
            y >= 0 &&
            y < this.yBoardLength &&
            x >= 0 &&
            x < this.xBoardLength
          ) {
            const coord = y + "" + x;
            this.collision.add(coord);
          }
        }
      }
    }
  }
};

const play = {
  record: +localStorage.getItem("seaBattleRecord") || 0,
  shot: 0,
  hit: 0,
  dead: 0,
  set updateData(data) {
    this[data] += 1;
    this.render();
  },
  render() {
    (record.textContent = this.record),
      (shot.textContent = this.shot),
      (hit.textContent = this.hit),
      (dead.textContent = this.dead);
  }
};

const show = {
  hit(elem) {
    this.changeClass(elem, "hit");
  },
  miss(elem) {
    this.changeClass(elem, "miss");
  },
  dead(elem) {
    this.changeClass(elem, "dead");
  },
  changeClass(elem, value) {
    elem.className = value;
  }
};

function fire(event) {
  const target = event.target;
  if (target.tagName !== "TD" || target.className || !game.shipCount) return;
  show.miss(target);
  play.updateData = "shot";

  for (let i = 0, len = game.ships.length; i < len; i++) {
    const ship = game.ships[i];
    const index = ship.location.indexOf(target.id);

    if (index >= 0) {
      show.hit(target);
      play.updateData = "hit";
      ship.hit[index] = "x";
      const life = ship.hit.indexOf("");
      if (life < 0) {
        play.updateData = "dead";
        for (const cell of ship.location) {
          show.dead(document.getElementById(cell));
        }
        game.shipCount -= 1;

        if (!game.shipCount) {
          header.textContent = "Game Over";
          header.style.color = "red";

          if (play.shot < play.record || play.record === 0) {
            localStorage.setItem("seaBattleRecord", play.shot);
            play.record = play.shot;
            play.render();
          }
        }
      }
    }
  }
}

const init = () => {
  enemy.addEventListener("click", fire);
  play.render();
  game.generateShip();

  again.addEventListener("click", () => {
    header.textContent = "SEA BATTLE";
    header.style.color = "black";

    play.shot = 0;
    play.hit = 0;
    play.dead = 0;

    game.ships.length = 0;
    game.shipCount = 0;
    game.collision.clear();

    for (const cell of enemy.querySelectorAll("td")) {
      cell.className = "";
    }

    play.render();
    game.generateShip();
  });
  record.addEventListener("dblclick", () => {
    localStorage.clear();
    play.record = 0;
    play.render();
  });
};

init();
