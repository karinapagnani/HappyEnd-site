// Criar partículas douradas
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const getParticleCount = () => {
    const width = window.innerWidth;
    if (width < 480) return 35;
    if (width < 768) return 60;
    return 85;
  };

  const particleCount = getParticleCount();
  particlesContainer.innerHTML = "";

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 8 + "s";
    particle.style.animationDuration = Math.random() * 4 + 2 + "s";
    const size = Math.random() * 3 + 0.5;
    particle.style.width = size + "px";
    particle.style.height = size + "px";

    const animationType = Math.floor(Math.random() * 3);
    switch (animationType) {
      case 0:
        particle.style.animationName = "float";
        break;
      case 1:
        particle.style.animationName = "sparkle";
        break;
      case 2:
        particle.style.animationName = "drift";
        break;
    }

    particle.style.opacity = Math.random() * 0.6 + 0.4;
    particlesContainer.appendChild(particle);
  }
}

// Criar partículas especiais
function createSpecialParticles() {
  const particlesContainer = document.getElementById("particles");
  const specialCount = Math.floor(window.innerWidth < 768 ? 8 : 15);

  for (let i = 0; i < specialCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle special-particle";

    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 10 + "s";
    particle.style.animationDuration = Math.random() * 6 + 4 + "s";
    const size = Math.random() * 2 + 3;
    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.background = "#ffed4e";
    particle.style.boxShadow = "0 0 6px #ffd700, 0 0 12px #ffd700";
    particle.style.animationName = "twinkle";

    particlesContainer.appendChild(particle);
  }
}

// Animações de scroll
function handleScrollAnimations() {
  const introText = document.getElementById("introText");
  const logoTitle = document.getElementById("logoTitle");
  const descriptionBox = document.getElementById("descriptionBox");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: "0px 0px -100px 0px",
    }
  );

  observer.observe(introText);
  observer.observe(logoTitle);
  observer.observe(descriptionBox);
}

// Partículas seguindo o cursor
function createCursorTrail() {
  if (window.innerWidth < 768 || isTouchDevice()) return;

  document.addEventListener("mousemove", (e) => {
    if (Math.random() < 0.3) createTrailParticle(e.clientX, e.clientY);
  });

  function createTrailParticle(x, y) {
    const particle = document.createElement("div");
    particle.className = "trail-particle";
    particle.style.position = "fixed";
    particle.style.left = x + "px";
    particle.style.top = y + "px";
    particle.style.width = "2px";
    particle.style.height = "2px";
    particle.style.background = "#ffd700";
    particle.style.borderRadius = "50%";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "3";
    particle.style.opacity = "1";
    particle.style.transition = "all 1.5s ease-out";

    document.body.appendChild(particle);

    requestAnimationFrame(() => {
      particle.style.opacity = "0";
      particle.style.transform =
        "translate(" +
        (Math.random() - 0.5) * 100 +
        "px, " +
        (Math.random() - 0.5) * 100 +
        "px) scale(0)";
    });

    setTimeout(() => {
      if (particle.parentNode) particle.parentNode.removeChild(particle);
    }, 1500);
  }
}

function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

function supportsReducedMotion() {
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function handleReducedMotion() {
  if (supportsReducedMotion()) {
    document.body.classList.add("reduced-motion");
    const style = document.createElement("style");
    style.textContent = `
      .reduced-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
      .reduced-motion .particle {
        display: none;
      }
    `;
    document.head.appendChild(style);
  }
}

function handleResize() {
  createParticles();
  createSpecialParticles();
}

function initializeApp() {
  handleReducedMotion();
  createParticles();
  createSpecialParticles();
  createCursorTrail();
  handleScrollAnimations();

  window.addEventListener("resize", handleResize);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}