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
    showInitialScreenMessage();
  }
});

function showInitialScreenMessage() {
  const messageContainer = document.createElement('div');
  messageContainer.style.position = 'fixed';
  messageContainer.style.top = '50%';
  messageContainer.style.left = '50%';
  messageContainer.style.transform = 'translate(-50%, -50%)';
  messageContainer.style.fontSize = '5rem';
  messageContainer.style.color = 'red';
  messageContainer.style.textShadow = '0 0 20px black';
  messageContainer.style.zIndex = '9999';
  messageContainer.textContent = '최초 화면입니다';

  // 무서운 효과 추가
  messageContainer.style.animation = 'initialScreenAnimation 2s infinite';

  document.body.appendChild(messageContainer);

  setTimeout(function() {
    document.body.removeChild(messageContainer);
  }, 2000); // 5초 후에 메시지 제거
}
function getRandomPosition() {
  const x = Math.random() * (window.innerWidth - 200);
  const y = Math.random() * (window.innerHeight - 200);
  return { x, y };
}

function getRandomSize() {
  const width = Math.random() * 300 + 100; // 100px ~ 400px
  const height = width * 1.25; // 가로세로비 4:3
  return { width, height };
}

function showHandEffect() {
  const handContainer = document.getElementById('hand-container');
  const handImage = document.getElementById('hand-image');

  const { x, y } = getRandomPosition();
  const { width, height } = getRandomSize();

  handContainer.style.display = 'block';
  handContainer.style.opacity = '1'; // 불투명 상태로 시작
  handContainer.style.left = `${x}px`; 
  handContainer.style.top = `${y}px`;
  handImage.style.width = `${width}px`;
  handImage.style.height = `${height}px`;

  setTimeout(function() {
    handContainer.style.opacity = '0'; // 서서히 사라짐
    setTimeout(function() {
      handContainer.style.display = 'none';
const randomDelay = Math.random() * 2000 + 8000; // 8초 ~ 10초 사이 랜덤
      setTimeout(function() {
        showHandEffect();
      }, randomDelay);
    }, 1000);
  }, 2000);
}

 setTimeout(function() {
  showHandEffect();
}, 1000);
const audioFiles = [
  './오디오/공포.mp3',
  './오디오/영혼.mp3',
  './오디오/으스스.mp3',
  './오디오/비명.mp3',
  './오디오/종.mp3',
  './오디오/쿵.mp3',
  './오디오/분위기.mp3',
  './오디오/여자비명.mp3',
  './오디오/지옥.mp3'
];

let playedAudioIndex = -1;
let audioPlayer;

function playRandomAudio() {
  if (audioPlayer) {
    audioPlayer.pause();
    audioPlayer = null;
  }

  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * audioFiles.length);
  } while (randomIndex === playedAudioIndex);

  const randomAudioFile = audioFiles[randomIndex];
  playedAudioIndex = randomIndex;

  audioPlayer = new Audio(randomAudioFile);
  audioPlayer.volume = 0.5;
  audioPlayer.addEventListener('ended', () => {
    audioPlayer = null;
    const randomDelay = Math.floor(Math.random() * 11) + 5; // 5~15초 사이의 랜덤한 시간
    setTimeout(playRandomAudio, randomDelay * 1000);
  });
  audioPlayer.play().catch(err => {
    console.error('오디오 재생 에러:', err);
    const randomDelay = Math.floor(Math.random() * 11) + 5; // 5~15초 사이의 랜덤한 시간
    setTimeout(playRandomAudio, randomDelay * 1000);
  });
}

playRandomAudio();



function initAudio() {
  audio = new Audio('./오디오/tv소리.mp3');
  audio.volume = 0.5;
  audio.loop = true;
  audio.addEventListener('canplaythrough', playAudio);
}

function playAudio() {
  audio.play()
    .catch(err => {
      // 자동재생이 차단된 경우 처리
      console.log('재생 차단:', err);
    });
}

document.addEventListener('click', function() {
  // 사용자 상호작용 이후에 오디오 재생 시도
  if (audio && audio.paused) {
    audio.play();
  }
}, { once: true });

initAudio();
