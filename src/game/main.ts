import p5 from "p5";

import "../styles/common.css";
import "../styles/game.css";

import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants";
import { Enemy } from "./Enemy";
import { Player } from "./Player";

new p5((p) => {
  const player = new Player();
  let enemy: Enemy;

  p.setup = () => {
    const canvas = p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

    canvas.parent("game-container");

    enemy = new Enemy(p, player.x, player.y);
  };

  p.draw = () => {
    p.background(240);

    player.update(p);
    enemy.update(p);

    player.draw(p);
    enemy.draw(p);
  };
});
