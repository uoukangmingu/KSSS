const canvas = document.getElementById('glowCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
function drawGlow() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const maxRadius = Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2;

  const radius = maxRadius * (0.6 + 0.4 * Math.random());
const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
gradient.addColorStop(0, 'rgba(7, 0, 108, 0.05)'); // 더 연한 파란색
gradient.addColorStop(0.5, 'rgba(7, 0, 108, 0.02)'); // 더 연한 파란색
gradient.addColorStop(1, 'rgba(7, 0, 108, 0)');


  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function animate() {
  drawGlow();
  requestAnimationFrame(animate);
}

animate();
const container = document.querySelector('.container');

function flickerAnimation() {
  container.style.opacity = Math.random() * 0.4 + 0.8; // 0.8 ~ 1.2 범위
  requestAnimationFrame(flickerAnimation);
}

flickerAnimation();

function triggerRandomAnimation() {
  const container = document.querySelector('.container');
  container.classList.add('shake');
  setTimeout(() => {
    container.classList.remove('shake');
  }, 400);
}

function applyRandomAnimation() {
  triggerRandomAnimation();
  setTimeout(applyRandomAnimation, Math.random() * 10000 + 5000);
}

applyRandomAnimation();

function adjustContainerHeight() {
  const desiredAspectRatio = 16 / 9;
  const newWidth = window.innerWidth;
  const newHeight = newWidth / desiredAspectRatio;
  document.querySelector('.container').style.height = `${newHeight}px`;
}

window.addEventListener('load', adjustContainerHeight);
window.addEventListener('resize', adjustContainerHeight);

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    goToPreviousPage();
  }
});

function goToPreviousPage() {
  document.body.classList.add('page-transition');
  setTimeout(function() {
    window.history.back();
  }, 500); // 0.5초 후에 이전 페이지로 이동
}
