import p5 from "p5";

import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  ITEM_RADIUS,
  PLAYER_RADIUS,
} from "./constants";
import { Player } from "./Player";

export class Item {
  x: number;
  y: number;

  constructor(p: p5) {
    this.x = 0;
    this.y = 0;

    this.respawn(p);
  }

  respawn(p: p5): void {
    this.x = p.random(ITEM_RADIUS, CANVAS_WIDTH - ITEM_RADIUS);

    this.y = p.random(ITEM_RADIUS, CANVAS_HEIGHT - ITEM_RADIUS);
  }

  collidesWith(p: p5, player: Player): boolean {
    const distance = p.dist(this.x, this.y, player.x, player.y);

    return distance < ITEM_RADIUS + PLAYER_RADIUS;
  }

  draw(p: p5): void {
    p.fill(240, 190, 40);
    p.circle(this.x, this.y, ITEM_RADIUS * 2);
  }
}
