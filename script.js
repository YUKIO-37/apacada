// ===== Mobile navigation =====
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

function setMenuOpen(isOpen) {
  navLinks.classList.toggle("is-open", isOpen);
  menuToggle.classList.toggle("is-active", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(!navLinks.classList.contains("is-open"));
});

// Close the menu when a link is chosen or Escape is pressed
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuOpen(false);
});

// ===== Skill bars: animate when they scroll into view =====
const skillFills = document.querySelectorAll(".skill-fill");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

function fillSkill(fill) {
  fill.style.width = fill.dataset.level + "%";
}

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const skillObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fillSkill(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  skillFills.forEach((fill) => skillObserver.observe(fill));
} else {
  // Fallback: show the bars immediately
  skillFills.forEach(fillSkill);
}

// ===== Contact form (demo handler) =====
const contactForm = document.getElementById("contact-form");
const formStatus = contactForm.querySelector(".form-status");
let statusTimer;

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = "Please fill in all fields.";
    return;
  }

  // Replace this block with a real submission (form service or backend)
  formStatus.textContent = `Thanks, ${name}! Your message has been noted.`;
  contactForm.reset();

  clearTimeout(statusTimer);
  statusTimer = setTimeout(() => {
    formStatus.textContent = "";
  }, 5000);
});

// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();