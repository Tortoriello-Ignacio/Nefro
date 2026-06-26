const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");
const revealElements = document.querySelectorAll(".reveal");

function setActiveLink() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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
    const top = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (top < windowHeight - 80) {
      element.classList.add("visible");
    }
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
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