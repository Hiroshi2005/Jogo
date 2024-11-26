document.addEventListener('DOMContentLoaded', () => {
  const player = document.getElementById('player');
  const gameContainer = document.querySelector('.game-container');
  const scoreDisplay = document.getElementById('score');
  let score = 0;
  let gameOver = false;

  document.addEventListener('keydown', (event) => {
      const playerPos = player.offsetLeft;
      const containerWidth = gameContainer.offsetWidth;

      if (event.key === 'ArrowLeft' && playerPos > 0) {
          player.style.left = `${playerPos - 20}px`;
      }
      if (event.key === 'ArrowRight' && playerPos < containerWidth - player.offsetWidth) {
          player.style.left = `${playerPos + 20}px`;
      }
  });

  function spawnCrystal() {
      if (gameOver) return;

      const crystal = document.createElement('div');
      crystal.classList.add('crystal');
      crystal.style.left = `${Math.random() * (gameContainer.offsetWidth - 30)}px`;

      gameContainer.appendChild(crystal);

      const fallInterval = setInterval(() => {
          const crystalPos = crystal.getBoundingClientRect();
          const playerPos = player.getBoundingClientRect();

          if (
              crystalPos.bottom >= playerPos.top &&
              crystalPos.left < playerPos.right &&
              crystalPos.right > playerPos.left
          ) {
              score++;
              scoreDisplay.textContent = score;
              crystal.remove();
              clearInterval(fallInterval);
          }

          if (crystalPos.top > gameContainer.offsetHeight) {
              crystal.remove();
              clearInterval(fallInterval);
          }
      }, 50);

      setTimeout(spawnCrystal, 1000);
  }

  function spawnObstacle() {
      if (gameOver) return;

      const obstacle = document.createElement('div');
      obstacle.classList.add('obstacle');
      obstacle.style.left = `${Math.random() * (gameContainer.offsetWidth - 40)}px`;

      gameContainer.appendChild(obstacle);

      const fallInterval = setInterval(() => {
          const obstaclePos = obstacle.getBoundingClientRect();
          const playerPos = player.getBoundingClientRect();

          if (
              obstaclePos.bottom >= playerPos.top &&
              obstaclePos.left < playerPos.right &&
              obstaclePos.right > playerPos.left
          ) {
              alert(`Fim de jogo! Sua pontuação final: ${score}`);
              gameOver = true;
              window.location.reload();
          }

          if (obstaclePos.top > gameContainer.offsetHeight) {
              obstacle.remove();
              clearInterval(fallInterval);
          }
      }, 50);

      setTimeout(spawnObstacle, 2000);
  }

  spawnCrystal();
  spawnObstacle();
});
