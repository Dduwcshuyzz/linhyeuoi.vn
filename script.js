// ===== PASSWORD GATE =====
const passwordScreen = document.getElementById("passwordScreen");
const lovePassword = document.getElementById("lovePassword");
const enterLoveBtn = document.getElementById("enterLoveBtn");
const passwordError = document.getElementById("passwordError");

// Đổi mật khẩu tại đây
const CORRECT_PASSWORD = "07042025";

function onSiteUnlocked() {
  setTimeout(() => {
    showLoveQuestion();
    startIntroFireworks();
  }, 300);
}

function enterLoveSite() {
  const value = lovePassword.value.trim();

  if (value === CORRECT_PASSWORD) {
    passwordError.textContent = "";
    passwordScreen.classList.add("hide");
    onSiteUnlocked();
  } else {
    passwordError.textContent = "Sai mật khẩu rồi nè, thử lại đi bạn 💗";
  }
}

if (enterLoveBtn) {
  enterLoveBtn.addEventListener("click", enterLoveSite);
}

if (lovePassword) {
  lovePassword.addEventListener("keydown", (e) => {
    if (e.key === "Enter") enterLoveSite();
  });
}

// ===== LOADER =====
const loader = document.getElementById("loader");

window.addEventListener("load", () => {
  setTimeout(() => {
    if (loader) loader.classList.add("hide");
  }, 2400);
});

// ===== LOVE COUNTER =====
const loveDate = new Date("2025-04-07T00:00:00");

function updateCounter() {
  const now = new Date();
  const diff = now - loveDate;

  const totalSeconds = Math.max(0, Math.floor(diff / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (daysEl) daysEl.textContent = days;
  if (hoursEl) hoursEl.textContent = hours;
  if (minutesEl) minutesEl.textContent = minutes;
  if (secondsEl) secondsEl.textContent = seconds;
}

updateCounter();
setInterval(updateCounter, 1000);

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("love-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  if (themeToggle) themeToggle.textContent = "☀️";
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("love-theme", isDark ? "dark" : "light");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
  });
}

// ===== MUSIC =====
const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");
let isMusicPlaying = false;

if (musicToggle && bgMusic) {
  musicToggle.addEventListener("click", async () => {
    const source = bgMusic.querySelector("source");

    if (!source || !source.getAttribute("src")) {
      alert("Bạn chưa thêm link nhạc vào thẻ audio trong file index.html");
      return;
    }

    try {
      if (isMusicPlaying) {
        bgMusic.pause();
        musicToggle.textContent = "🎵";
        isMusicPlaying = false;
      } else {
        bgMusic.load();
        await bgMusic.play();
        musicToggle.textContent = "🔊";
        isMusicPlaying = true;
      }
    } catch (error) {
      alert("Trình duyệt đang chặn tự phát nhạc hoặc link nhạc chưa đúng.");
    }
  });
}

// ===== MOBILE HIDE HEADER ON SCROLL =====
const topbar = document.querySelector(".topbar");
let lastScrollY = window.scrollY;
let ticking = false;

function handleHeaderOnScroll() {
  const isMobile = window.innerWidth <= 680;
  const currentScrollY = window.scrollY;

  if (!topbar) return;

  if (!isMobile) {
    topbar.classList.remove("hide-on-scroll");
    lastScrollY = currentScrollY;
    return;
  }

  if (currentScrollY > lastScrollY && currentScrollY > 80) {
    topbar.classList.add("hide-on-scroll");
  } else {
    topbar.classList.remove("hide-on-scroll");
  }

  lastScrollY = currentScrollY;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleHeaderOnScroll();
      ticking = false;
    });
    ticking = true;
  }
});

window.addEventListener("resize", handleHeaderOnScroll);
handleHeaderOnScroll();

// ===== FLOATING EFFECTS =====
const floatingHearts = document.getElementById("floatingHearts");
const floatingPetals = document.getElementById("floatingPetals");
const floatingStars = document.getElementById("floatingStars");

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createHeart() {
  if (!floatingHearts) return;

  const heart = document.createElement("div");
  heart.className = "heart-item";
  heart.textContent = ["💖", "💗", "💕", "💞", "💘"][Math.floor(Math.random() * 5)];
  heart.style.left = random(0, 100) + "vw";
  heart.style.fontSize = random(14, 30) + "px";
  heart.style.animationDuration = random(6, 12) + "s";
  floatingHearts.appendChild(heart);

  setTimeout(() => heart.remove(), 13000);
}

function createPetal() {
  if (!floatingPetals) return;

  const petal = document.createElement("div");
  petal.className = "petal-item";
  petal.textContent = ["🌸", "🎀", "🌷"][Math.floor(Math.random() * 3)];
  petal.style.left = random(0, 100) + "vw";
  petal.style.fontSize = random(16, 28) + "px";
  petal.style.animationDuration = random(8, 14) + "s";
  floatingPetals.appendChild(petal);

  setTimeout(() => petal.remove(), 15000);
}

function createStar() {
  if (!floatingStars) return;

  const star = document.createElement("div");
  star.className = "star-item";
  star.textContent = ["✨", "⭐", "🌟"][Math.floor(Math.random() * 3)];
  star.style.left = random(0, 100) + "vw";
  star.style.fontSize = random(12, 20) + "px";
  star.style.animationDuration = random(7, 13) + "s";
  floatingStars.appendChild(star);

  setTimeout(() => star.remove(), 14000);
}

setInterval(createHeart, 350);
setInterval(createPetal, 850);
setInterval(createStar, 1000);

// ===== CURSOR HEART =====
const cursorHeart = document.getElementById("cursorHeart");

document.addEventListener("mousemove", (e) => {
  if (window.innerWidth <= 680 || !cursorHeart) return;

  cursorHeart.style.left = e.clientX + "px";
  cursorHeart.style.top = e.clientY + "px";

  if (Math.random() < 0.35) {
    const spark = document.createElement("div");
    spark.className = "cursor-spark";
    spark.style.left = e.clientX + "px";
    spark.style.top = e.clientY + "px";
    spark.style.background = ["#ff7db6", "#ffd86d", "#ffffff", "#ffb7d6"][Math.floor(Math.random() * 4)];
    document.body.appendChild(spark);

    setTimeout(() => spark.remove(), 800);
  }
});

// ===== REVEAL ON SCROLL =====
const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.15
});

revealElements.forEach((el) => observer.observe(el));

// ===== SLIDER =====
const slides = document.getElementById("slides");
const prevSlide = document.getElementById("prevSlide");
const nextSlide = document.getElementById("nextSlide");
const dotsContainer = document.getElementById("dots");
const slideItems = document.querySelectorAll(".slide");
let currentSlide = 0;
let autoSlideInterval = null;

function renderDots() {
  if (!dotsContainer) return;

  dotsContainer.innerHTML = "";
  slideItems.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "dot" + (index === currentSlide ? " active" : "");
    dot.addEventListener("click", () => {
      currentSlide = index;
      updateSlider();
      restartAutoSlide();
    });
    dotsContainer.appendChild(dot);
  });
}

function updateSlider() {
  if (!slides) return;
  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
  renderDots();
}

function restartAutoSlide() {
  if (autoSlideInterval) clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(() => {
    if (!slideItems.length) return;
    currentSlide = (currentSlide + 1) % slideItems.length;
    updateSlider();
  }, 5000);
}

if (prevSlide) {
  prevSlide.addEventListener("click", () => {
    if (!slideItems.length) return;
    currentSlide = (currentSlide - 1 + slideItems.length) % slideItems.length;
    updateSlider();
    restartAutoSlide();
  });
}

if (nextSlide) {
  nextSlide.addEventListener("click", () => {
    if (!slideItems.length) return;
    currentSlide = (currentSlide + 1) % slideItems.length;
    updateSlider();
    restartAutoSlide();
  });
}

if (slideItems.length) {
  updateSlider();
  restartAutoSlide();
}

// ===== LIGHTBOX =====
const lightbox = document.getElementById("lightbox");
const lightboxInner = document.getElementById("lightboxInner");
const closeLightbox = document.getElementById("closeLightbox");
const slideInnerItems = document.querySelectorAll(".slide-inner");

slideInnerItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (!lightbox || !lightboxInner) return;

    const emoji = item.querySelector(".slide-emoji")?.textContent || "💗";
    const title = item.querySelector("h3")?.textContent || "Kỷ niệm";
    const desc = item.querySelector("p")?.textContent || "Khoảnh khắc dễ thương";

    lightboxInner.innerHTML = `
      <div class="big-emoji">${emoji}</div>
      <h3>${title}</h3>
      <p>${desc}</p>
    `;
    lightbox.classList.add("show");
  });
});

if (closeLightbox) {
  closeLightbox.addEventListener("click", () => {
    if (lightbox) lightbox.classList.remove("show");
  });
}

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("show");
    }
  });
}

// ===== SCROLL TOP =====
const scrollTopBtn = document.getElementById("scrollTopBtn");

if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// ===== LOVE MODAL =====
const loveModal = document.getElementById("loveModal");
const loveSuccess = document.getElementById("loveSuccess");
const loveYesBtn = document.getElementById("loveYesBtn");
const loveNoBtn = document.getElementById("loveNoBtn");
const closeSuccessBtn = document.getElementById("closeSuccessBtn");
const loveModalActions = document.getElementById("loveModalActions");

function showLoveQuestion() {
  setTimeout(() => {
    if (!passwordScreen || !loveModal) return;
    if (!passwordScreen.classList.contains("hide")) return;
    loveModal.classList.add("show");
  }, 1500);
}

function moveNoButton() {
  if (!loveModalActions || !loveNoBtn) return;

  const card = loveModalActions.getBoundingClientRect();
  const btn = loveNoBtn.getBoundingClientRect();

  const maxX = Math.max(0, card.width - btn.width - 10);
  const maxY = Math.max(0, 80);

  const randomX = Math.random() * maxX - (card.width / 2.8);
  const randomY = Math.random() * maxY - 20;

  loveNoBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

if (loveNoBtn) {
  loveNoBtn.addEventListener("mouseenter", moveNoButton);
  loveNoBtn.addEventListener("click", (e) => {
    e.preventDefault();
    moveNoButton();
  });
  loveNoBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    moveNoButton();
  }, { passive: false });
}

if (loveYesBtn) {
  loveYesBtn.addEventListener("click", () => {
    if (loveModal) loveModal.classList.remove("show");
    if (loveSuccess) loveSuccess.classList.add("show");
    burstHeartsText();
    burstCenterHearts();
    startBigFireworks();
  });
}

if (closeSuccessBtn) {
  closeSuccessBtn.addEventListener("click", () => {
    if (loveSuccess) loveSuccess.classList.remove("show");
  });
}

// ===== LINH HEART TEXT =====
function createNameHeart(text) {
  const el = document.createElement("div");
  el.className = "name-heart";
  el.textContent = text;
  el.style.left = (35 + Math.random() * 30) + "%";
  el.style.top = (50 + Math.random() * 10) + "%";
  document.body.appendChild(el);

  setTimeout(() => {
    el.remove();
  }, 2600);
}

function burstHeartsText() {
  const words = [
    "💖 Linh 💖",
    "🎀 Khánh Linh 🎀",
    "💞 Yêu Linh 💞",
    "👑 Princess Linh 👑",
    "💕 Huy yêu Linh 💕"
  ];

  words.forEach((word, index) => {
    setTimeout(() => createNameHeart(word), index * 260);
  });
}

function burstCenterHearts() {
  for (let i = 0; i < 22; i++) {
    const heart = document.createElement("div");
    heart.className = "name-heart";
    heart.textContent = ["💖", "💗", "💕", "💘", "💞", "🎀"][Math.floor(Math.random() * 6)];
    heart.style.left = "50%";
    heart.style.top = "58%";
    heart.style.fontSize = (22 + Math.random() * 18) + "px";
    heart.style.transform = `translate(-50%, -50%) translate(${(Math.random() - 0.5) * 220}px, ${(Math.random() - 0.5) * 120}px)`;
    heart.style.animationDuration = "2.4s";
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 2500);
  }
}

// ===== FIREWORKS =====
const fireCanvas = document.getElementById("fireworks");
const fireCtx = fireCanvas ? fireCanvas.getContext("2d") : null;

function resizeFireCanvas() {
  if (!fireCanvas) return;
  fireCanvas.width = window.innerWidth;
  fireCanvas.height = window.innerHeight;
}

resizeFireCanvas();
window.addEventListener("resize", resizeFireCanvas);

let fireworks = [];
let particles = [];
let fireAnimId = null;

class Firework {
  constructor(x, y, targetX, targetY, color) {
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.color = color;
    this.speed = 3 + Math.random() * 2;
    this.done = false;
  }

  update() {
    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 8) {
      this.done = true;
      explode(this.targetX, this.targetY, this.color);
      return;
    }

    this.x += (dx / distance) * this.speed;
    this.y += (dy / distance) * this.speed;
  }

  draw() {
    if (!fireCtx) return;
    fireCtx.beginPath();
    fireCtx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    fireCtx.fillStyle = this.color;
    fireCtx.fill();
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.angle = Math.random() * Math.PI * 2;
    this.speed = 1 + Math.random() * 5;
    this.life = 70 + Math.random() * 20;
    this.opacity = 1;
    this.gravity = 0.04 + Math.random() * 0.03;
    this.vx = Math.cos(this.angle) * this.speed;
    this.vy = Math.sin(this.angle) * this.speed;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.life -= 1;
    this.opacity = this.life / 90;
  }

  draw() {
    if (!fireCtx) return;
    fireCtx.globalAlpha = Math.max(this.opacity, 0);
    fireCtx.beginPath();
    fireCtx.arc(this.x, this.y, 2.4, 0, Math.PI * 2);
    fireCtx.fillStyle = this.color;
    fireCtx.fill();
    fireCtx.globalAlpha = 1;
  }
}

function explode(x, y, color) {
  const count = 28 + Math.floor(Math.random() * 18);
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(x, y, color));
  }
}

function launchFirework() {
  if (!fireCanvas) return;

  const colors = ["#ff5c9c", "#ffd86d", "#ffffff", "#ff9dc7", "#ffc2de"];
  const x = Math.random() * fireCanvas.width;
  const y = fireCanvas.height + 10;
  const targetX = 80 + Math.random() * (fireCanvas.width - 160);
  const targetY = 80 + Math.random() * (fireCanvas.height * 0.45);
  const color = colors[Math.floor(Math.random() * colors.length)];

  fireworks.push(new Firework(x, y, targetX, targetY, color));
}

function animateFireworks() {
  if (!fireCtx || !fireCanvas) return;

  fireCtx.clearRect(0, 0, fireCanvas.width, fireCanvas.height);

  fireworks = fireworks.filter((fw) => {
    fw.update();
    fw.draw();
    return !fw.done;
  });

  particles = particles.filter((p) => {
    p.update();
    p.draw();
    return p.life > 0;
  });

  fireAnimId = requestAnimationFrame(animateFireworks);
}

function ensureFireworksRunning() {
  if (!fireAnimId && fireCtx) {
    animateFireworks();
  }
}

function startIntroFireworks() {
  ensureFireworksRunning();

  let count = 0;
  const timer = setInterval(() => {
    launchFirework();
    count++;
    if (count >= 5) clearInterval(timer);
  }, 300);
}

function startBigFireworks() {
  ensureFireworksRunning();

  let count = 0;
  const timer = setInterval(() => {
    launchFirework();
    if (Math.random() < 0.7) launchFirework();
    count++;
    if (count >= 14) clearInterval(timer);
  }, 220);
}