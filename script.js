// 祝福语数组
const wishes = [
  '2025 新年快乐！',
  '愿你新的一年万事如意！',
  '好运连连，财源滚滚！',
  '家庭幸福，平安健康！',
  '新的一年，心想事成！',
  '梦想成真，福气满满！'
];

const messageElement = document.getElementById('message');
let currentIndex = 0;
let currentCharIndex = 0;
let typingInterval;

function typeText() {
  if (currentCharIndex < wishes[currentIndex].length) {
    messageElement.textContent += wishes[currentIndex][currentCharIndex];
    messageElement.setAttribute('data-text', messageElement.textContent); // 更新伪元素内容
    currentCharIndex++;
  } else {
    clearInterval(typingInterval);
    setTimeout(() => {
      if (currentIndex < wishes.length - 1) {
        currentIndex++;
        currentCharIndex = 0;
        messageElement.textContent = '';
        typingInterval = setInterval(typeText, 50);
      } else {
        // 当所有祝福语完成后，触发烟花效果
        messageElement.style.display = 'none';
        startFireworks();
      }
    }, 1500);
  }
}

// 开始打字动画
typingInterval = setInterval(typeText, 50);

// 烟花效果
function startFireworks() {
  const canvas = document.getElementById('fireworks');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];

  class Particle {
    constructor(x, y, color, speed, angle) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.speed = speed;
      this.angle = angle;
      this.size = Math.random() * 3 + 1;
      this.opacity = 1;
    }

    update() {
      this.x += this.speed * Math.cos(this.angle);
      this.y += this.speed * Math.sin(this.angle);
      this.opacity -= 0.02;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
      ctx.fill();
    }
  }

  function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;
    const colors = ['255, 99, 71', '144, 238, 144', '135, 206, 250', '238, 130, 238'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    for (let i = 0; i < 50; i++) {
      const speed = Math.random() * 5 + 1;
      const angle = Math.random() * Math.PI * 2;
      particles.push(new Particle(x, y, color, speed, angle));
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle, index) => {
      particle.update();
      particle.draw();
      if (particle.opacity <= 0) particles.splice(index, 1);
    });
    if (Math.random() < 0.05) createFirework();
    requestAnimationFrame(animate);
  }

  animate();
}
