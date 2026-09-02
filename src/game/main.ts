import p5 from "p5";

import "../styles/common.css";
import "../styles/game.css";

import { CANVAS_HEIGHT, CANVAS_WIDTH, ENEMY_SPAWN_INTERVAL } from "./constants";
import { Enemy } from "./Enemy";
import { Player } from "./Player";

new p5((p) => {
  const player = new Player();
  let enemies: Enemy[] = [];

  let enemySpawnTimer = 0;

  p.setup = () => {
    const canvas = p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

    canvas.parent("game-container");

    enemies.push(new Enemy(p, player.x, player.y));
  };

  p.draw = () => {
    p.background(240);

    player.update(p);

    enemySpawnTimer += p.deltaTime;

    if (enemySpawnTimer >= ENEMY_SPAWN_INTERVAL) {
      enemies.push(new Enemy(p, player.x, player.y));
      enemySpawnTimer = 0;
    }

    for (const enemy of enemies) {
      enemy.update(p);
    }

    enemies = enemies.filter((enemy) => !enemy.isOffscreen());

    player.draw(p);

    for (const enemy of enemies) {
      enemy.draw(p);
    }
  };
});
