// =====================================================
// NISHANT SAINI PORTFOLIO — SCRIPT.JS
// =====================================================

/* ── DOM Ready ── */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initCursor();
  initNavbar();
  initHamburger();
  initTyped();
  initParticles();
  initScrollReveal();
  initSkillBars();
  initActiveNav();
  initContactForm();
});

/* ──────────────── LOADER ──────────────── */
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.classList.remove('no-scroll');
  }, 1800);
  document.body.classList.add('no-scroll');
}

/* ──────────────── CUSTOM CURSOR ──────────────── */
function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover effect on interactive elements
  const hoverEls = document.querySelectorAll('a, button, .tag, .about-card, .project-card');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(2)';
      cursor.style.opacity = '0.5';
      follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.opacity = '1';
      follower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });
}

/* ──────────────── NAVBAR SCROLL ──────────────── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

/* ──────────────── HAMBURGER ──────────────── */
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

/* ──────────────── TYPED TEXT ──────────────── */
function initTyped() {
  const el = document.getElementById('typed');
  if (!el) return;

  const phrases = [
    'Founder @ EdHills',
    'Web Developer',
    'Python Programmer',
    'Student Creator',
    'UI/UX Designer',
    'Tech Enthusiast'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let speed = 80;

  function type() {
    const current = phrases[phraseIndex];
    el.textContent = isDeleting
      ? current.substring(0, charIndex - 1)
      : current.substring(0, charIndex + 1);

    charIndex += isDeleting ? -1 : 1;

    if (!isDeleting && charIndex === current.length) {
      isDeleting = true;
      speed = 60;
      setTimeout(type, 1800);
      return;
    }
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      speed = 80;
    }
    setTimeout(type, isDeleting ? speed / 2 : speed);
  }
  setTimeout(type, 500);
}

/* ──────────────── PARTICLE CANVAS ──────────────── */
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.r = Math.random() * 1.5 + 0.3;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.alpha = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.5 ? '124,58,237' : '6,182,212';
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
      ctx.fill();
    }
  }

  const COUNT = window.innerWidth < 768 ? 40 : 80;
  for (let i = 0; i < COUNT; i++) particles.push(new Particle());

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(124,58,237,${0.08 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(loop);
  }
  loop();
}

/* ──────────────── SCROLL REVEAL ──────────────── */
function initScrollReveal() {
  // Add reveal classes to elements
  const sections = document.querySelectorAll('.about-card, .skill-category, .skill-tags-card, .timeline-card, .project-card, .contact-card, .contact-form');
  sections.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left').forEach(el => observer.observe(el));
}

/* ──────────────── SKILL BARS ──────────────── */
function initSkillBars() {
  const bars = document.querySelectorAll('.bar-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animated');
        }, 200);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
}

/* ──────────────── ACTIVE NAV LINK ──────────────── */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => observer.observe(section));
}

/* ──────────────── CONTACT FORM ──────────────── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('formToast');
  const sendBtn = document.getElementById('sendBtn');
  if (!form || !toast) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simulate sending
    const originalText = sendBtn.innerHTML;
    sendBtn.innerHTML = `
      <svg style="animation:spin 0.8s linear infinite" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-dasharray="60" stroke-dashoffset="20"/>
      </svg>
      Sending...
    `;
    sendBtn.disabled = true;

    setTimeout(() => {
      sendBtn.innerHTML = originalText;
      sendBtn.disabled = false;
      form.reset();
      toast.textContent = '✅ Message sent! I\'ll get back to you soon.';
      toast.className = 'form-toast success';
      setTimeout(() => { toast.className = 'form-toast'; }, 5000);
    }, 2000);
  });
}

/* ── CSS spin animation via JS ── */
const style = document.createElement('style');
style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
document.head.appendChild(style);

/* ──────────────── SMOOTH ANCHOR SCROLL ──────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ──────────────── FLOATING BADGE PARALLAX ──────────────── */
document.addEventListener('mousemove', (e) => {
  const badges = document.querySelectorAll('.floating-badge');
  const mx = (e.clientX / window.innerWidth - 0.5) * 20;
  const my = (e.clientY / window.innerHeight - 0.5) * 20;
  badges.forEach((badge, i) => {
    const factor = (i + 1) * 0.3;
    badge.style.transform = `translateY(-8px) translate(${mx * factor}px, ${my * factor}px)`;
  });
});
