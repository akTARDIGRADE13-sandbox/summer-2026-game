import p5 from "p5";

import "../styles/common.css";
import "../styles/game.css";

import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants";
import { Game } from "./Game";

new p5((p) => {
  let game: Game;

  p.setup = () => {
    const canvas = p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

    canvas.parent("game-container");

    game = new Game(p);
  };

  p.draw = () => {
    game.update();
    game.draw();
  };

  p.keyPressed = () => {
    game.keyPressed();
  };
});
