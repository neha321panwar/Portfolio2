// Typing animation
const typed = new Typed(".text", {
  strings: ["Frontend Developer", "Web Developer"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});

// Theme toggle function
// Theme toggle function
function toggleMode() {
    const body = document.body;
    const themeIcon = document.getElementById("theme-icon");

    // Add a check to ensure themeIcon exists before trying to manipulate its classes
    if (!themeIcon) {
        console.warn("Theme icon element (ID: 'theme-icon') not found in the DOM.");
        return; // Exit the function if the icon isn't found
    }

    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
        localStorage.setItem("theme", "dark");
    } else {
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
        localStorage.setItem("theme", "light");
    }
}

// Everything inside DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector(".nav");
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links li");

  // Initialize saved theme
  const savedTheme = localStorage.getItem("theme") || "light";
  const body = document.body;
  const themeIcon = document.getElementById("theme-icon");

  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  }

  // Stagger animation index
  navItems.forEach((item, index) => {
    item.style.setProperty("--i", index);
  });

  // Hamburger menu click
  hamburger.addEventListener("click", () => {
    const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", !isExpanded);
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
    document.body.style.overflow = isExpanded ? "" : "hidden";
  });

  // Click outside to close
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && navLinks.classList.contains("active")) {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  });

  // Close when clicking nav links
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });

  // Scroll hide/show nav
  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
      nav.classList.add("hidden");
    } else {
      nav.classList.remove("hidden");
    }

    lastScroll = currentScroll;
  });

  // Resize resets nav
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && navLinks.classList.contains("active")) {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  });

  // Read More functionality
  const moreContent = document.getElementById("moreContent");
  const readMoreBtn = document.getElementById("readMoreBtn");

  if (readMoreBtn && moreContent) {
    readMoreBtn.addEventListener("click", function () {
      if (moreContent.style.display === "none" || moreContent.style.display === "") {
        moreContent.style.display = "inline";
        readMoreBtn.textContent = "Read Less";
      } else {
        moreContent.style.display = "none";
        readMoreBtn.textContent = "Read More";
      }
    });
  }
});
