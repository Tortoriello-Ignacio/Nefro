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
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
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
    tab.classList.toggle("active", tab.dataset.tab === tabName);
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

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
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
    scrollToDetailSection();
  });
});

detailTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    activateDetailTab(tab.dataset.tab);
  });
});

window.addEventListener("scroll", () => {
  setActiveLink();
  revealOnScroll();
});

window.addEventListener("load", () => {
  setActiveLink();
  revealOnScroll();
});