const navToggle = document.getElementById("nav-toggle");
const navToggleButton = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav-list a");
const mainNav = document.querySelector(".main-nav");
const pageSections = document.querySelectorAll("main section");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxTriggers = document.querySelectorAll(".lightbox-trigger");
const contactForm = document.querySelector(".contact-form");
const currentYearElement = document.getElementById("current-year");

function setMenuState(isOpen) {
  if (!navToggle) {
    return;
  }

  navToggle.checked = isOpen;
  navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

function toggleMenu() {
  if (!navToggle) {
    return;
  }

  setMenuState(!navToggle.checked);
  console.info("[menu] toggled", { open: navToggle.checked });
}

function closeMenuOnSmallScreens() {
  if (window.innerWidth <= 768) {
    setMenuState(false);
  }
}

function setupMenuToggle() {
  if (!navToggle || !navToggleButton) {
    return;
  }

  navToggleButton.addEventListener("click", (event) => {
    event.preventDefault();
    toggleMenu();
  });

  navToggleButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleMenu();
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenuOnSmallScreens);
  });

  setMenuState(false);
}

function setupSmoothScroll() {
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || !targetId.startsWith("#")) {
        return;
      }

      const targetSection = document.querySelector(targetId);
      if (!targetSection) {
        return;
      }

      event.preventDefault();
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", targetId);
    });
  });
}

function setupActiveSectionHighlight() {
  const sectionById = new Map();
  pageSections.forEach((section) => {
    sectionById.set(`#${section.id}`, section);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const activeId = `#${entry.target.id}`;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === activeId);
        });
      });
    },
    {
      root: null,
      threshold: 0.45,
    }
  );

  sectionById.forEach((section) => observer.observe(section));
}

function filterProjects(category) {
  projectCards.forEach((card) => {
    const cardCategory = card.dataset.category;
    const shouldShow = category === "all" || cardCategory === category;
    card.hidden = !shouldShow;
  });

  console.info("[projects] filter applied", { category });
}

function setupProjectFilters() {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.filter || "all";

      filterButtons.forEach((btn) => {
        btn.classList.remove("is-active");
      });

      button.classList.add("is-active");
      filterProjects(category);
    });
  });
}

function setupSectionReveal() {
  if (!pageSections.length) {
    return;
  }

  pageSections.forEach((section) => {
    section.classList.add("reveal");
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      root: null,
      threshold: 0.2,
    }
  );

  pageSections.forEach((section) => revealObserver.observe(section));
}

function setupScrolledNavEffect() {
  if (!mainNav) {
    return;
  }

  const updateScrolledState = () => {
    mainNav.classList.toggle("is-scrolled", window.scrollY > 18);
  };

  updateScrolledState();
  window.addEventListener("scroll", updateScrolledState, { passive: true });
}

function openLightbox(image) {
  if (!lightbox || !lightboxImage || !lightboxCaption) {
    return;
  }

  const caption = image.closest("figure")?.querySelector("figcaption")?.textContent || "Project image";

  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = caption;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) {
    return;
  }

  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

function setupLightbox() {
  lightboxTriggers.forEach((image) => {
    image.addEventListener("click", () => openLightbox(image));

    image.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(image);
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function setFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorFieldMap = {
    "full-name": "name-error",
    "email-address": "email-error",
    "user-message": "message-error",
  };
  const errorField = document.getElementById(errorFieldMap[fieldId]);

  if (!field || !errorField) {
    return;
  }

  errorField.textContent = message;
  field.classList.toggle("is-invalid", Boolean(message));
}

function setupCurrentYear() {
  if (!currentYearElement) {
    return;
  }

  currentYearElement.textContent = String(new Date().getFullYear());
}

function validateField(field) {
  const value = field.value.trim();

  if (field.id === "full-name") {
    if (!value) {
      setFieldError(field.id, "Please enter your name.");
      return false;
    }
    setFieldError(field.id, "");
    return true;
  }

  if (field.id === "email-address") {
    if (!value) {
      setFieldError(field.id, "Please enter your email address.");
      return false;
    }
    if (!isValidEmail(value)) {
      setFieldError(field.id, "Please enter a valid email address.");
      return false;
    }
    setFieldError(field.id, "");
    return true;
  }

  if (field.id === "user-message") {
    if (!value) {
      setFieldError(field.id, "Please enter your message.");
      return false;
    }
    if (value.length < 10) {
      setFieldError(field.id, "Message should be at least 10 characters.");
      return false;
    }
    setFieldError(field.id, "");
    return true;
  }

  return true;
}

function setupFormValidation() {
  if (!contactForm) {
    return;
  }

  const status = document.getElementById("form-status");
  const fields = ["full-name", "email-address", "user-message"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  fields.forEach((field) => {
    field.addEventListener("input", () => {
      validateField(field);
      if (status) {
        status.textContent = "";
        status.className = "form-status";
      }
    });
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const allValid = fields.every((field) => validateField(field));

    if (!status) {
      return;
    }

    if (allValid) {
      status.textContent = "Message looks good. Form is ready to submit.";
      status.className = "form-status success";
      console.info("[form] validation passed");
      contactForm.reset();
      fields.forEach((field) => setFieldError(field.id, ""));
      return;
    }

    status.textContent = "Please fix the highlighted fields before submitting.";
    status.className = "form-status error";
    console.warn("[form] validation failed");
  });
}

function runDebugChecks() {
  console.info("[debug] initialized features", {
    navToggle: Boolean(navToggle),
    navLinks: navLinks.length,
    filterButtons: filterButtons.length,
    projectCards: projectCards.length,
    lightboxTriggers: lightboxTriggers.length,
    hasContactForm: Boolean(contactForm),
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupCurrentYear();
  setupMenuToggle();
  setupSmoothScroll();
  setupActiveSectionHighlight();
  setupScrolledNavEffect();
  setupProjectFilters();
  setupLightbox();
  setupFormValidation();
  setupSectionReveal();
  runDebugChecks();
});

window.toggleMenu = toggleMenu;
window.filterProjects = filterProjects;
