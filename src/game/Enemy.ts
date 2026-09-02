import p5 from "p5";

import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  ENEMY_RADIUS,
  ENEMY_SPEED,
  PLAYER_RADIUS,
} from "./constants";
import { Player } from "./Player";

export class Enemy {
  x: number;
  y: number;

  private vx: number;
  private vy: number;

  constructor(p: p5, targetX: number, targetY: number) {
    const edge = Math.floor(p.random(4));

    switch (edge) {
      case 0:
        this.x = p.random(CANVAS_WIDTH);
        this.y = -ENEMY_RADIUS;
        break;

      case 1:
        this.x = CANVAS_WIDTH + ENEMY_RADIUS;
        this.y = p.random(CANVAS_HEIGHT);
        break;

      case 2:
        this.x = p.random(CANVAS_WIDTH);
        this.y = CANVAS_HEIGHT + ENEMY_RADIUS;
        break;

      default:
        this.x = -ENEMY_RADIUS;
        this.y = p.random(CANVAS_HEIGHT);
        break;
    }

    let dx = targetX - this.x;
    let dy = targetY - this.y;

    const length = Math.hypot(dx, dy);

    dx /= length;
    dy /= length;

    this.vx = dx * ENEMY_SPEED;
    this.vy = dy * ENEMY_SPEED;
  }

  update(p: p5): void {
    const dt = p.deltaTime / 1000;

    this.x += this.vx * dt;
    this.y += this.vy * dt;
  }

  draw(p: p5): void {
    p.fill(220, 60, 60);
    p.circle(this.x, this.y, ENEMY_RADIUS * 2);
  }

  collidesWith(p: p5, player: Player): boolean {
    const distance = p.dist(this.x, this.y, player.x, player.y);

    return distance < ENEMY_RADIUS + PLAYER_RADIUS;
  }

  isOffscreen(): boolean {
    const margin = ENEMY_RADIUS * 2;

    return (
      this.x < -margin ||
      this.x > CANVAS_WIDTH + margin ||
      this.y < -margin ||
      this.y > CANVAS_HEIGHT + margin
    );
  }
}
