import p5 from "p5";

import { CANVAS_HEIGHT, CANVAS_WIDTH, ENEMY_SPAWN_INTERVAL } from "./constants";
import { Enemy } from "./Enemy";
import { Item } from "./Item";
import { Player } from "./Player";

type GameState = "title" | "playing" | "gameOver";

export class Game {
  private player: Player;
  private item: Item;
  private enemies: Enemy[] = [];

  private enemySpawnTimer = 0;
  private score = 0;
  private state: GameState = "title";

  constructor(private p: p5) {
    this.player = new Player();
    this.item = new Item(p);
  }

  update(): void {
    if (this.state !== "playing") {
      return;
    }

    this.player.update(this.p);

    this.updateItem();
    this.spawnEnemies();
    this.updateEnemies();

    this.enemies = this.enemies.filter((enemy) => !enemy.isOffscreen());
  }

  draw(): void {
    this.p.background(240);

    if (this.state === "title") {
      this.drawTitle();
      return;
    }

    this.drawGame();

    if (this.state === "gameOver") {
      this.drawGameOver();
    }
  }

  keyPressed(): void {
    if (this.state === "title" && this.p.key === " ") {
      this.state = "playing";
      return;
    }

    if (
      this.state === "gameOver" &&
      (this.p.key === "r" || this.p.key === "R")
    ) {
      this.reset();
      this.state = "playing";
    }
  }

  private updateItem(): void {
    if (this.item.collidesWith(this.p, this.player)) {
      this.score += 1;
      this.item.respawn(this.p);
    }
  }

  private spawnEnemies(): void {
    this.enemySpawnTimer += this.p.deltaTime;

    if (this.enemySpawnTimer >= ENEMY_SPAWN_INTERVAL) {
      this.enemies.push(new Enemy(this.p, this.player.x, this.player.y));

      this.enemySpawnTimer = 0;
    }
  }

  private updateEnemies(): void {
    for (const enemy of this.enemies) {
      enemy.update(this.p);

      if (enemy.collidesWith(this.p, this.player)) {
        this.state = "gameOver";
        break;
      }
    }
  }

  private drawGame(): void {
    this.item.draw(this.p);
    this.player.draw(this.p);

    for (const enemy of this.enemies) {
      enemy.draw(this.p);
    }

    this.p.textAlign(this.p.LEFT, this.p.TOP);
    this.p.textSize(24);
    this.p.fill(30);
    this.p.text(`Score: ${this.score}`, 16, 16);
  }

  private drawTitle(): void {
    this.p.textAlign(this.p.CENTER, this.p.CENTER);
    this.p.fill(30);

    this.p.textSize(48);
    this.p.text("DODGE GAME", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 30);

    this.p.textSize(20);
    this.p.text(
      "Press SPACE to start",
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT / 2 + 30,
    );
  }

  private drawGameOver(): void {
    this.p.textAlign(this.p.CENTER, this.p.CENTER);
    this.p.fill(30);

    this.p.textSize(48);
    this.p.text("GAME OVER", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 30);

    this.p.textSize(20);
    this.p.text("Press R to restart", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 30);
  }

  private reset(): void {
    this.player = new Player();
    this.item = new Item(this.p);
    this.enemies = [];

    this.enemySpawnTimer = 0;
    this.score = 0;
  }
}
