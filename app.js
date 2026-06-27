const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");
const revealElements = document.querySelectorAll(".reveal");
const mediaImages = document.querySelectorAll(".media-card img");
const clickableCards = document.querySelectorAll(".clickable-card");
const detailTabs = document.querySelectorAll(".detail-tab");
const detailPanels = document.querySelectorAll(".detail-panel");

function setActiveLink() {
  let currentSection = "inicio";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;

    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${currentSection}`;
    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function revealOnScroll() {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 80) {
      element.classList.add("visible");
    }
  });
}

function activateDetailTab(tabName) {
  detailTabs.forEach((tab) => {
    const isActive = tab.dataset.tab === tabName;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", isActive ? "true" : "false");
  });

  detailPanels.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.panel === tabName);
  });
}

function scrollToDetailSection() {
  const detailSection = document.getElementById("servicios");

  if (!detailSection) return;

  detailSection.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function pulseCard(card) {
  card.classList.remove("card-pulse");
  // restart the animation even if it was just triggered
  void card.offsetWidth;
  card.classList.add("card-pulse");

  card.addEventListener(
    "animationend",
    () => card.classList.remove("card-pulse"),
    { once: true }
  );
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => {
      item.classList.remove("active");
      item.removeAttribute("aria-current");
    });
    link.classList.add("active");
    link.setAttribute("aria-current", "true");
  });
});

mediaImages.forEach((image) => {
  image.addEventListener("error", () => {
    const parentCard = image.closest(".media-card");

    if (parentCard) {
      parentCard.classList.add("image-error");
    }
  });
});

clickableCards.forEach((card) => {
  card.addEventListener("click", () => {
    const activity = card.dataset.activity;

    if (!activity) return;

    activateDetailTab(activity);
    pulseCard(card);
    scrollToDetailSection();
  });
});

detailTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    activateDetailTab(tab.dataset.tab);
  });
});

// Throttle scroll-driven work to one update per animation frame.
let scrollScheduled = false;

function onScroll() {
  if (scrollScheduled) return;
  scrollScheduled = true;

  requestAnimationFrame(() => {
    setActiveLink();
    revealOnScroll();
    scrollScheduled = false;
  });
}

window.addEventListener("scroll", onScroll, { passive: true });

window.addEventListener("load", () => {
  setActiveLink();
  revealOnScroll();
});
