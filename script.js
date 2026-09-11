document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MOBILE NAVIGATION
    ========================== */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    if (menuToggle && navMenu) {

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.addEventListener("click", (event) => {
            event.stopPropagation();

            const isOpen = navMenu.classList.toggle("show");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );
        });

        // Close menu after clicking a link
        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("show");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });

        // Close menu when clicking outside
        document.addEventListener("click", (event) => {
            if (
                !navMenu.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                navMenu.classList.remove("show");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });

        // Close menu with Escape key
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                navMenu.classList.remove("show");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    }


    /* =========================
       NAVBAR SCROLL EFFECT
    ========================== */

    const navbar = document.querySelector(".navbar");

    function updateNavbar() {
        if (!navbar) return;

        navbar.classList.toggle(
            "scrolled",
            window.scrollY > 20
        );
    }

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });

    updateNavbar();


    /* =========================
       ACTIVE NAVIGATION LINK
    ========================== */

    const sections = document.querySelectorAll("main section[id]");

    function updateActiveLink() {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop = section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {

            const linkSection = link.getAttribute("href");

            link.classList.toggle(
                "active",
                linkSection === `#${currentSection}`
            );
        });
    }

    window.addEventListener("scroll", updateActiveLink, {
        passive: true
    });

    updateActiveLink();


    /* =========================
       SCROLL REVEAL ANIMATION
    ========================== */

    const revealElements = document.querySelectorAll(
        ".about-section, " +
        ".skills-section, " +
        ".education-section, " +
        ".projects-section, " +
        ".resume-section, " +
        ".contact-section, " +
        ".skill-card, " +
        ".education-item, " +
        ".project-card, " +
        ".resume-box, " +
        ".contact-info, " +
        ".contact-form-box"
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
    });

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

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

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });

    } else {

        // Fallback for older browsers
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }


    /* =========================
       CONTACT FORM
    ========================== */

    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("form-message");

    if (contactForm && formMessage) {

        contactForm.addEventListener("submit", (event) => {

            event.preventDefault();

            formMessage.textContent =
                "Thanks for reaching out! I'll get back to you soon.";

            formMessage.style.color = "#38bdf8";

            contactForm.reset();
        });
    }

});