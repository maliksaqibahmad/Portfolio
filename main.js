document.addEventListener("DOMContentLoaded", function () {
  // Navigation menu functionality
  const navMenu = document.getElementById("nav-menu");
  const navToggle = document.getElementById("nav-toggle");
  const navClose = document.getElementById("nav-close");
  const navLink = document.querySelectorAll(".nav__link");

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.add("show-menu");
    });
  }

  if (navClose) {
    navClose.addEventListener("click", () => {
      navMenu.classList.remove("show-menu");
    });
  }

  const linkAction = () => {
    navMenu.classList.remove("show-menu");
  };
  navLink.forEach((n) => n.addEventListener("click", linkAction));

  // Header shadow on scroll
  const shadowHeader = () => {
    const header = document.getElementById("header");
    if (window.scrollY >= 50) {
      header.classList.add("shadow-header");
    } else {
      header.classList.remove("shadow-header");
    }
  };
  window.addEventListener("scroll", shadowHeader);

  // Contact form functionality
  const contactForm = document.getElementById("contact-form");
  const contactMessage = document.getElementById("contact-message");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_lxev7p8",
        "template_s9cmduo",
        "#contact-form",
        "E4mCxvYZo-gW6zHnT",
      )
      .then(
        () => {
          contactMessage.textContent = "Message sent successfully ✅";
          setTimeout(() => {
            contactMessage.textContent = "";
          }, 5000);
          contactForm.reset();
        },
        () => {
          contactMessage.textContent = "Message not sent (service error) ❌";
        },
      );
  };

  contactForm.addEventListener("submit", sendEmail);

  // Scroll up button functionality
  const scrollUp = () => {
    const scrollUp = document.getElementById("scroll-up");
    if (window.scrollY >= 350) {
      scrollUp.classList.add("show-scroll");
    } else {
      scrollUp.classList.remove("show-scroll");
    }
  };
  window.addEventListener("scroll", scrollUp);

  // Active link state on scroll
  const sections = document.querySelectorAll("section[id]");
  const scrollActive = () => {
    const scrollDown = window.scrollY;
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 58;
      const sectionId = current.getAttribute("id");
      const sectionClass = document.querySelector(
        ".nav__menu a[href*=" + sectionId + "]",
      );
      if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
        sectionClass.classList.add("active-link");
      } else {
        sectionClass.classList.remove("active-link");
      }
    });
  };
  window.addEventListener("scroll", scrollActive);

  // Theme toggle functionality
  const themeButton = document.getElementById("light-button");
  const darkTheme = "dark-theme";
  const iconTheme = "ri-sun-line";

  const selectedTheme = localStorage.getItem("selected-theme");
  const selectedIcon = localStorage.getItem("selected-icon");

  const getCurrentTheme = () =>
    document.body.classList.contains(darkTheme) ? "dark" : "light";
  const getCurrentIcon = () =>
    themeButton.classList.contains(iconTheme) ? "dark-theme" : "ri-sun-line";

  const toggleTheme = () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());
  };

  if (selectedTheme) {
    document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
      darkTheme,
    );
    themeButton.classList[selectedIcon === "dark-theme" ? "add" : "remove"](
      iconTheme,
    );
  }

  themeButton.addEventListener("click", toggleTheme);

  // Loader
  const loaderContainer = document.querySelector(".loader-container");
  if (loaderContainer) {
    loaderContainer.style.display = "none";
  }

  // ScrollReveal initialization
  try {
    const sr = ScrollReveal({
      origin: "top",
      distance: "50px",
      duration: 1250,
      delay: 100,
    });
  
    sr.reveal(".home-section .perfil-container, .about-section .image-container, .contact-section .mail-container", {
      origin: "right",
    });
    sr.reveal(
      ".home-section .name-container, .home-section .info-container, .about-section .container, .section__title-1, .about__info, .contact__social, .contact__data, .section__title-2",
      { origin: "left" },
    );
    sr.reveal(".services__card, .certs__card, .projects__card", {
      origin: "bottom",
    });
    sr.reveal(".skill", { interval: 30 });
  } catch (error) {
    console.error("Error initializing ScrollReveal:", error);
  }

  // Header hide/show on scroll
  let prevScrollPos = window.pageYOffset;
  const header = document.querySelector(".header");

  window.onscroll = function () {
    const currentScrollPos = window.pageYOffset;
    if (prevScrollPos > currentScrollPos) {
      header.style.top = "0";
    } else {
      header.style.top = `-${header.clientHeight}px`;
    }
    prevScrollPos = currentScrollPos;
  };

  // Theme color for mobile browsers
  const metaTag = document.querySelector('meta[name="theme-color"]');
  const defaultColor = "hsl(0, 0%, 95%)";
  const darkModeColor = "hsl(0, 0%, 8%)";
  let isDarkMode = false;

  lightButton.addEventListener("click", () => {
    isDarkMode = !isDarkMode;
    metaTag.setAttribute("content", isDarkMode ? darkModeColor : defaultColor);
  });
});
