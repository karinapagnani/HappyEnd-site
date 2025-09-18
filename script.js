 const projectData = [
        {
          title: "Professor Marcos",
          description: "Projetos focados em desenvolver soluções tecnológicas inovadoras que transformam a maneira como interagimos com o mundo digital. Nossos alunos criaram aplicativos, sistemas web e ferramentas que solucionam problemas reais do cotidiano, demonstrando criatividade e domínio técnico."
        },
        {
          title: "Professor Marcelo",
          description: "Iniciativas voltadas para a preservação do meio ambiente e desenvolvimento sustentável. Estes projetos abordam questões como reciclagem, energia renovável e conscientização ambiental, mostrando o comprometimento dos estudantes com um futuro mais verde."
        },
        {
          title: "Professora Susi",
          description: "Projetos desenvolvidos para gerar impacto positivo na sociedade, focando em inclusão, acessibilidade e melhoria da qualidade de vida. Os alunos identificaram necessidades comunitárias e criaram soluções práticas e humanizadas."
        },
        {
          title: "Professor William",
          description: "Soluções avançadas para otimização de processos industriais, utilizando tecnologias de automação, IoT e inteligência artificial. Estes projetos demonstram a capacidade dos estudantes em revolucionar o setor produtivo."
        },
        {
          title: "Professora Nathalia",
          description: "Projetos inovadores na área da saúde, focados em prevenção, diagnóstico e tratamento. Os alunos desenvolveram aplicações que facilitam o acesso aos cuidados médicos e promovem hábitos saudáveis na comunidade."
        }
      ];

      let currentSlide = 0;
      const totalSlides = projectData.length;

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


      // JavaScript para funcionalidades do header
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.getElementById('navMenu');
        
        // Menu mobile
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });
        
        // Fechar menu ao clicar em um link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuBtn.textContent = '☰';
            });
        });


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
        const carouselContainer = document.getElementById("carouselContainer");
        const carouselInfoCard = document.getElementById("carouselInfoCard");

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
        observer.observe(carouselContainer);
        observer.observe(carouselInfoCard);
      }

      // Funções do carrossel
      function updateSlide() {
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.nav-dot');
        const cardTitle = document.getElementById('cardTitle');
        const cardDescription = document.getElementById('cardDescription');

        // Atualizar slides
        slides.forEach((slide, index) => {
          slide.classList.remove('active', 'prev');
          if (index === currentSlide) {
            slide.classList.add('active');
          } else if (index < currentSlide) {
            slide.classList.add('prev');
          }
        });

        // Atualizar dots
        dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === currentSlide);
        });

        // Atualizar card de informações com animação
        const infoCard = document.getElementById('carouselInfoCard');
        infoCard.style.opacity = '0';
        infoCard.style.transform = 'translateY(20px)';

        setTimeout(() => {
          cardTitle.textContent = projectData[currentSlide].title;
          cardDescription.textContent = projectData[currentSlide].description;
          infoCard.style.opacity = '1';
          infoCard.style.transform = 'translateY(0)';
        }, 300);
      }

      function changeSlide(direction) {
        currentSlide += direction;
        if (currentSlide >= totalSlides) {
          currentSlide = 0;
        } else if (currentSlide < 0) {
          currentSlide = totalSlides - 1;
        }
        updateSlide();
      }

      function goToSlide(index) {
        currentSlide = index;
        updateSlide();
      }

      // Auto-play do carrossel
      function startAutoPlay() {
        setInterval(() => {
          if (!document.hidden) {
            changeSlide(1);
          }
        }, 5000);
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

      // Menu mobile
      function initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.getElementById('navMenu');

        if (mobileMenuBtn) {
          mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
          });
        }

        // Fechar menu ao clicar em um link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
          link.addEventListener('click', () => {
            navMenu.classList.remove('active');
          });
        });
      }

      function initializeApp() {
        handleReducedMotion();
        createParticles();
        createSpecialParticles();
        createCursorTrail();
        handleScrollAnimations();
        initMobileMenu();
        startAutoPlay();

        window.addEventListener("resize", handleResize);
      }

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeApp);
      } else {
        initializeApp();
      }