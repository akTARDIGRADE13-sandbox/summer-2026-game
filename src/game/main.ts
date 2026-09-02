import p5 from "p5";
import "../styles/common.css";
import "../styles/game.css";

new p5((p) => {
  p.setup = () => {
    const canvas = p.createCanvas(640, 480);
    canvas.parent("game-container");
  };

  p.draw = () => {
    p.background(240);
    p.circle(p.mouseX, p.mouseY, 50);
  };
});
