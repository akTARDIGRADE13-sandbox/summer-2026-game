import p5 from "p5";

import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  PLAYER_RADIUS,
  PLAYER_SPEED,
} from "./constants";

export class Player {
  x: number;
  y: number;

  constructor() {
    this.x = CANVAS_WIDTH / 2;
    this.y = CANVAS_HEIGHT / 2;
  }

  update(p: p5): void {
    const dt = p.deltaTime / 1000;

    let dx = 0;
    let dy = 0;

    if (p.keyIsDown(p.LEFT_ARROW) || p.keyIsDown(65)) {
      dx -= 1;
    }

    if (p.keyIsDown(p.RIGHT_ARROW) || p.keyIsDown(68)) {
      dx += 1;
    }

    if (p.keyIsDown(p.UP_ARROW) || p.keyIsDown(87)) {
      dy -= 1;
    }

    if (p.keyIsDown(p.DOWN_ARROW) || p.keyIsDown(83)) {
      dy += 1;
    }

    const length = Math.hypot(dx, dy);

    if (length > 0) {
      dx /= length;
      dy /= length;
    }

    this.x += dx * PLAYER_SPEED * dt;
    this.y += dy * PLAYER_SPEED * dt;

    this.x = p.constrain(this.x, PLAYER_RADIUS, CANVAS_WIDTH - PLAYER_RADIUS);

    this.y = p.constrain(this.y, PLAYER_RADIUS, CANVAS_HEIGHT - PLAYER_RADIUS);
  }

  draw(p: p5): void {
    p.fill(50, 100, 220);
    p.circle(this.x, this.y, PLAYER_RADIUS * 2);
  }
}
