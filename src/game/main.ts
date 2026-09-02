import p5 from "p5";

import "../styles/common.css";
import "../styles/game.css";

import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants";
import { Player } from "./Player";

new p5((p) => {
  const player = new Player();

  p.setup = () => {
    const canvas = p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

    canvas.parent("game-container");
  };

  p.draw = () => {
    p.background(240);

    player.update(p);
    player.draw(p);
  };
});
