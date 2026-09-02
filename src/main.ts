import p5 from "p5";
import "./style.css";

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
