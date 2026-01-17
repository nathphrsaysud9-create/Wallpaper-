const canvas = document.getElementById("fx");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

/* Rain */
const rain = [];
for (let i = 0; i < 300; i++) {
  rain.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    l: Math.random() * 20 + 20,
    s: Math.random() * 6 + 4
  });
}

/* Lightning */
let lightning = [];

function createLightning() {
  if (Math.random() < 0.03) {
    const x = Math.random() * canvas.width;
    let y = 0;
    const path = [];
    while (y < canvas.height * 0.6) {
      path.push({ x, y });
      x + (Math.random() * 40 - 20);
      y += Math.random() * 30;
    }
    lightning.push({ path, life: 6 });
  }
}

/* Animation loop */
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  /* Rain */
  ctx.strokeStyle = "rgba(200,150,255,0.6)";
  ctx.lineWidth = 1;
  rain.forEach(r => {
    ctx.beginPath();
    ctx.moveTo(r.x, r.y);
    ctx.lineTo(r.x - 6, r.y + r.l);
    ctx.stroke();

    r.y += r.s;
    if (r.y > canvas.height) {
      r.y = -20;
      r.x = Math.random() * canvas.width;

      // splash
      ctx.beginPath();
      ctx.arc(r.x, canvas.height - 5, 6, 0, Math.PI * 2);
      ctx.stroke();
    }
  });

  /* Lightning */
  createLightning();
  lightning.forEach((l, i) => {
    ctx.strokeStyle = "rgba(255,255,255,0.9)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    l.path.forEach((p, idx) => {
      if (idx === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x + Math.random()*10, p.y);
    });
    ctx.stroke();
    l.life--;
    if (l.life <= 0) lightning.splice(i, 1);
  });

  requestAnimationFrame(animate);
}

animate();
