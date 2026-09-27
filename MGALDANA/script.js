/* =========================================================
   M.G. ALDANA DENTAL CLINIC
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* =======================================================
     ELEMENTS
  ======================================================= */

  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");
  const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
  const currentYear = document.getElementById("currentYear");


  /* =======================================================
     CURRENT YEAR
  ======================================================= */

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  function openMenu() {
    if (!navMenu || !menuToggle) return;

    navMenu.classList.add("open");

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");

    menuToggle.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  }


  function closeMenu() {
    if (!navMenu || !menuToggle) return;

    navMenu.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");

    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  }


  function toggleMenu() {
    if (!navMenu) return;

    if (navMenu.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  }


  if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenu);
  }


  /* =======================================================
     CLOSE MOBILE MENU WHEN NAV LINK IS CLICKED
  ======================================================= */

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      closeMenu();
    });
  });


  /* =======================================================
     CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
  ======================================================= */

  document.addEventListener("click", function (event) {

    if (!navMenu || !menuToggle) return;

    const clickedInsideMenu = navMenu.contains(event.target);
    const clickedMenuButton = menuToggle.contains(event.target);

    if (
      navMenu.classList.contains("open") &&
      !clickedInsideMenu &&
      !clickedMenuButton
    ) {
      closeMenu();
    }

  });


  /* =======================================================
     CLOSE MENU WHEN ESCAPE IS PRESSED
  ======================================================= */

  document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
      closeMenu();
    }

  });


  /* =======================================================
     RESET MOBILE MENU WHEN WINDOW IS RESIZED
  ======================================================= */

  window.addEventListener("resize", function () {

    if (window.innerWidth > 820) {
      closeMenu();
    }

  });


  /* =======================================================
     HEADER SCROLL EFFECT
  ======================================================= */

  function updateHeader() {

    if (!header) return;

    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  }


  window.addEventListener("scroll", updateHeader);

  updateHeader();


  /* =======================================================
     SMOOTH SCROLL
  ======================================================= */

  allAnchorLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

      const targetId = this.getAttribute("href");

      if (
        !targetId ||
        targetId === "#" ||
        !targetId.startsWith("#")
      ) {
        return;
      }

      const targetSection = document.querySelector(targetId);

      if (!targetSection) {
        return;
      }

      event.preventDefault();

      const headerHeight = header
        ? header.offsetHeight
        : 0;

      const targetPosition =
        targetSection.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

      closeMenu();

    });

  });


  /* =======================================================
     ACTIVE NAVIGATION BASED ON CURRENT SECTION
  ======================================================= */

  const sections = document.querySelectorAll(
    "main section[id]"
  );


  function updateActiveNavigation() {

    const scrollPosition =
      window.scrollY +
      (header ? header.offsetHeight : 0) +
      100;

    let currentSection = "home";


    sections.forEach(function (section) {

      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition <
        sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }

    });


    navLinks.forEach(function (link) {

      link.classList.remove("active");

      const href = link.getAttribute("href");

      if (href === "#" + currentSection) {
        link.classList.add("active");
      }

    });

  }


  window.addEventListener(
    "scroll",
    updateActiveNavigation
  );

  updateActiveNavigation();


  /* =======================================================
     REVEAL ELEMENTS WHEN SCROLLING
  ======================================================= */

  const revealElements = document.querySelectorAll(
    ".about-card, .service-card, .branch-card"
  );


  if ("IntersectionObserver" in window) {

    revealElements.forEach(function (element) {
      element.classList.add("reveal");
    });


    const revealObserver = new IntersectionObserver(
      function (entries, observer) {

        entries.forEach(function (entry) {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12
      }
    );


    revealElements.forEach(function (element) {
      revealObserver.observe(element);
    });

  }


  /* =======================================================
     EXTERNAL LINK SECURITY
  ======================================================= */

  const externalLinks = document.querySelectorAll(
    'a[target="_blank"]'
  );


  externalLinks.forEach(function (link) {

    if (!link.getAttribute("rel")) {
      link.setAttribute(
        "rel",
        "noopener noreferrer"
      );
    }

  });

});