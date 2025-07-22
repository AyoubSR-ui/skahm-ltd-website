// 🧠 Ripple Effect Logic: Mouse Move + Click
const canvas = document.getElementById("ripple-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ripples = [];

const colors = [
  'rgba(255, 100, 255, 0.5)',
  'rgba(100, 255, 255, 0.5)',
  'rgba(255, 255, 100, 0.5)',
  'rgba(100, 100, 255, 0.5)',
  'rgba(255, 100, 100, 0.5)'
];

function drawRipples() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ripples.forEach((ripple, index) => {
    ctx.save(); // Save canvas state for each ripple
    ctx.filter = 'blur(25px)'; // Apply soft blur

    // Inject ripple opacity dynamically
    const fadedColor = ripple.color.replace('0.5', ripple.opacity.toFixed(2));

    // Create glowing gradient
    const gradient = ctx.createRadialGradient(
      ripple.x, ripple.y, 0,
      ripple.x, ripple.y, ripple.radius
    );
    gradient.addColorStop(0, fadedColor);
    gradient.addColorStop(0.4, fadedColor);
    gradient.addColorStop(1, "transparent");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(ripple.x, ripple.y, ripple.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore(); // Restore after drawing each ripple

    ripple.radius += 4;
    ripple.opacity -= 0.01;

    if (ripple.opacity <= 0) {
      ripples.splice(index, 1);
    }
  });

  requestAnimationFrame(drawRipples);
}



  requestAnimationFrame(drawRipples); // ✅ Continuous animation


function createRipple(x, y) {
  const color = colors[Math.floor(Math.random() * colors.length)];
  ripples.push({ x, y, radius: 0, color, opacity: 1 });
}

window.addEventListener("mousemove", (e) => createRipple(e.clientX, e.clientY));
window.addEventListener("click", (e) => createRipple(e.clientX, e.clientY));

drawRipples(); // ✅ Start the animation loop

// 💬 Typing effect logic for headline
const message = "Empowering Your Business with AI";
const typingTarget = document.getElementById("typing-text");
let index = 0;

function typeLoop() {
  if (index <= message.length) {
    typingTarget.innerText = message.slice(0, index++);
    setTimeout(typeLoop, 100); // ✨ Typing speed (ms)
  } else {
    setTimeout(() => {
      index = 0;
      typingTarget.innerText = "";
      typeLoop(); // 🔁 Restart animation
    }, 2000); // Wait before restarting
  }
}

typeLoop(); // 🔁 Start animation on page load






