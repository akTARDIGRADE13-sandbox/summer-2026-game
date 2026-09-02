import p5 from "p5";

import "../styles/common.css";
import "../styles/game.css";

import { CANVAS_HEIGHT, CANVAS_WIDTH, ENEMY_SPAWN_INTERVAL } from "./constants";
import { Enemy } from "./Enemy";
import { Item } from "./Item";
import { Player } from "./Player";

type GameState = "playing" | "gameOver";

new p5((p) => {
  const player = new Player();
  let item: Item;
  let enemies: Enemy[] = [];

  let enemySpawnTimer = 0;
  let score = 0;
  let state: GameState = "playing";

  p.setup = () => {
    const canvas = p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

    canvas.parent("game-container");

    item = new Item(p);
    enemies.push(new Enemy(p, player.x, player.y));
  };

  p.draw = () => {
    p.background(240);

    if (state === "playing") {
      player.update(p);

      if (item.collidesWith(p, player)) {
        score += 1;
        item.respawn(p);
      }

      enemySpawnTimer += p.deltaTime;

      if (enemySpawnTimer >= ENEMY_SPAWN_INTERVAL) {
        enemies.push(new Enemy(p, player.x, player.y));
        enemySpawnTimer = 0;
      }

      for (const enemy of enemies) {
        enemy.update(p);

        if (enemy.collidesWith(p, player)) {
          state = "gameOver";
        }
      }

      enemies = enemies.filter((enemy) => !enemy.isOffscreen());
    }

    item.draw(p);
    player.draw(p);

    for (const enemy of enemies) {
      enemy.draw(p);
    }

    p.textAlign(p.LEFT, p.TOP);
    p.textSize(24);
    p.fill(30);
    p.text(`Score: ${score}`, 16, 16);

    if (state === "gameOver") {
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(48);
      p.fill(30);
      p.text("GAME OVER", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    }
  };
});
