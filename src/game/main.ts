import p5 from "p5";

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

  p.keyPressed = (event) => {
    const handled = game.keyPressed();

    if (!event) {
      return;
    }

    const isMovementKey = [
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
    ].includes(event.key);

    if (handled || (game.isPlaying() && isMovementKey)) {
      event.preventDefault();
    }
  };
});
