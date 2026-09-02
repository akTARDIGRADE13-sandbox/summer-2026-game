import p5 from "p5";

import "../styles/common.css";
import "../styles/game.css";

import { CANVAS_HEIGHT, CANVAS_WIDTH, ENEMY_SPAWN_INTERVAL } from "./constants";
import { Enemy } from "./Enemy";
import { Item } from "./Item";
import { Player } from "./Player";

type GameState = "title" | "playing" | "gameOver";

new p5((p) => {
  let player: Player;
  let item: Item;
  let enemies: Enemy[] = [];

  let enemySpawnTimer = 0;
  let score = 0;
  let state: GameState = "title";

  function resetGame(): void {
    player = new Player();
    item = new Item(p);
    enemies = [];

    enemySpawnTimer = 0;
    score = 0;
  }

  p.setup = () => {
    const canvas = p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

    canvas.parent("game-container");

    resetGame();
  };

  p.draw = () => {
    p.background(240);

    if (state === "playing") {
      player.update(p);

      // アイテム取得
      if (item.collidesWith(p, player)) {
        score += 1;
        item.respawn(p);
      }

      // 敵の生成
      enemySpawnTimer += p.deltaTime;

      if (enemySpawnTimer >= ENEMY_SPAWN_INTERVAL) {
        enemies.push(new Enemy(p, player.x, player.y));
        enemySpawnTimer = 0;
      }

      // 敵の更新と衝突判定
      for (const enemy of enemies) {
        enemy.update(p);

        if (enemy.collidesWith(p, player)) {
          state = "gameOver";
          break;
        }
      }

      // 画面外に出た敵を削除
      enemies = enemies.filter((enemy) => !enemy.isOffscreen());
    }

    // ゲーム画面を描画
    item.draw(p);
    player.draw(p);

    for (const enemy of enemies) {
      enemy.draw(p);
    }

    // スコア
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(24);
    p.fill(30);
    p.text(`Score: ${score}`, 16, 16);

    // タイトル画面
    if (state === "title") {
      p.textAlign(p.CENTER, p.CENTER);
      p.fill(30);

      p.textSize(48);
      p.text("DODGE GAME", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 30);

      p.textSize(20);
      p.text("Press SPACE to start", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 30);
    }

    // ゲームオーバー画面
    if (state === "gameOver") {
      p.textAlign(p.CENTER, p.CENTER);
      p.fill(30);

      p.textSize(48);
      p.text("GAME OVER", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 30);

      p.textSize(20);
      p.text("Press R to restart", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 30);
    }
  };

  p.keyPressed = () => {
    if (state === "title" && p.key === " ") {
      state = "playing";
    }

    if (state === "gameOver" && (p.key === "r" || p.key === "R")) {
      resetGame();
      state = "playing";
    }
  };
});
