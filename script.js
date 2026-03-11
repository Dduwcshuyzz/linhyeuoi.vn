// ===== PASSWORD GATE =====
const passwordScreen = document.getElementById("passwordScreen");
const lovePassword = document.getElementById("lovePassword");
const enterLoveBtn = document.getElementById("enterLoveBtn");
const passwordError = document.getElementById("passwordError");

// Đổi mật khẩu tại đây
const CORRECT_PASSWORD = "07042025";

function enterLoveSite() {
  const value = lovePassword.value.trim();

  if (value === CORRECT_PASSWORD) {
    passwordScreen.classList.add("hide");
  } else {
    passwordError.textContent = "Sai mật khẩu rồi nè, thử lại đi bạn 💗";
  }
}

enterLoveBtn.addEventListener("click", enterLoveSite);
lovePassword.addEventListener("keydown", (e) => {
  if (e.key === "Enter") enterLoveSite();
});

// ===== LOADER =====
const loader = document.getElementById("loader");
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("hide");
  }, 2400);
});

// ===== LOVE COUNTER =====
const loveDate = new Date("2025-04-07T00:00:00");

function updateCounter() {
  const now = new Date();
  const diff = now - loveDate;

  const totalSeconds = Math.max(0, Math.floor(diff / 1000));
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

updateCounter();
setInterval(updateCounter, 1000);

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("love-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("love-theme", isDark ? "dark" : "light");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
});

// ===== MUSIC =====
const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");
let isMusicPlaying = false;

musicToggle.addEventListener("click", () => {
  const source = bgMusic.querySelector("source");

  if (!source || !source.src || source.getAttribute("src") === "") {
    alert("Bạn chưa thêm link nhạc vào thẻ audio trong file index.html");
    return;
  }

  if (isMusicPlaying) {
    bgMusic.pause();
    musicToggle.textContent = "🎵";
    isMusicPlaying = false;
  } else {
    bgMusic.play();
    musicToggle.textContent = "🔊";
    isMusicPlaying = true;
  }
});

// ===== FLOATING EFFECTS =====
const floatingHearts = document.getElementById("floatingHearts");
const floatingPetals = document.getElementById("floatingPetals");
const floatingStars = document.getElementById("floatingStars");

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart-item";
  heart.textContent = ["💖","💗","💕","💞","💘"][Math.floor(Math.random() * 5)];
  heart.style.left = random(0, 100) + "vw";
  heart.style.fontSize = random(14, 30) + "px";
  heart.style.animationDuration = random(6, 12) + "s";
  floatingHearts.appendChild(heart);

  setTimeout(() => heart.remove(), 13000);
}

function createPetal() {
  const petal = document.createElement("div");
  petal.className = "petal-item";
  petal.textContent = ["🌸","🎀","🌷"][Math.floor(Math.random() * 3)];
  petal.style.left = random(0, 100) + "vw";
  petal.style.fontSize = random(16, 28) + "px";
  petal.style.animationDuration = random(8, 14) + "s";
  floatingPetals.appendChild(petal);

  setTimeout(() => petal.remove(), 15000);
}

function createStar() {
  const star = document.createElement("div");
  star.className = "star-item";
  star.textContent = ["✨","⭐","🌟"][Math.floor(Math.random() * 3)];
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
  if (window.innerWidth <= 680) return;

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
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.15
});

revealElements.forEach(el => observer.observe(el));

// ===== SLIDER =====
const slides = document.getElementById("slides");
const prevSlide = document.getElementById("prevSlide");
const nextSlide = document.getElementById("nextSlide");
const dotsContainer = document.getElementById("dots");
const slideItems = document.querySelectorAll(".slide");
let currentSlide = 0;

function renderDots() {
  dotsContainer.innerHTML = "";
  slideItems.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "dot" + (index === currentSlide ? " active" : "");
    dot.addEventListener("click", () => {
      currentSlide = index;
      updateSlider();
    });
    dotsContainer.appendChild(dot);
  });
}

function updateSlider() {
  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
  renderDots();
}

prevSlide.addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + slideItems.length) % slideItems.length;
  updateSlider();
});

nextSlide.addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % slideItems.length;
  updateSlider();
});

setInterval(() => {
  currentSlide = (currentSlide + 1) % slideItems.length;
  updateSlider();
}, 5000);

updateSlider();

// ===== LIGHTBOX =====
const lightbox = document.getElementById("lightbox");
const lightboxInner = document.getElementById("lightboxInner");
const closeLightbox = document.getElementById("closeLightbox");
const slideInnerItems = document.querySelectorAll(".slide-inner");

slideInnerItems.forEach(item => {
  item.addEventListener("click", () => {
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

closeLightbox.addEventListener("click", () => {
  lightbox.classList.remove("show");
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove("show");
  }
});

// ===== SCROLL TOP =====
const scrollTopBtn = document.getElementById("scrollTopBtn");

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
