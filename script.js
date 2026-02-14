document.addEventListener("DOMContentLoaded", function () {

    const sections = document.querySelectorAll("section, footer");
    const navLinks = document.querySelectorAll(".nav-link");
    const indicator = document.querySelector(".nav-indicator");
    const dropdownToggle = document.querySelector(".dropdown-toggle");

    const dropdownSections = [
        "best-places",
        "things",
        "popular-destinations",
        "culture",
        "gallery",
        "temp"
    ];

    function moveIndicator(link) {
        if (!link) return;
        const navContainer = document.querySelector(".navbar-nav");
        const linkRect = link.getBoundingClientRect();
        const navRect = navContainer.getBoundingClientRect();

        indicator.style.width = linkRect.width + "px";
        indicator.style.left = (linkRect.left - navRect.left) + "px";
    }

    function setActiveLink() {
        let currentSection = "";

        sections.forEach(section => {
            const top = section.offsetTop - 120;
            const bottom = top + section.offsetHeight;

            if (window.scrollY >= top && window.scrollY < bottom) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(link => link.classList.remove("active"));

        let activeLink = null;

        // Contact & Footer
        if (currentSection === "contact" || currentSection === "footer") {
            activeLink = document.querySelector('.nav-link[href="#contact"]');
        }

        // Dropdown More
        else if (dropdownSections.includes(currentSection)) {
            activeLink = dropdownToggle;
        }

        // Normal sections
        else {
            activeLink = document.querySelector(`.nav-link[href="#${currentSection}"]`);
        }

        // fallback
        if (!activeLink) activeLink = document.querySelector('.nav-link[href="#home"]');

        activeLink.classList.add("active");
        moveIndicator(activeLink);
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const target = document.querySelector(this.getAttribute("href"));
            if (!target) return;

            e.preventDefault();
            const offset = 90;
            const top = target.offsetTop - offset;

            window.scrollTo({ top, behavior: "smooth" });
        });
    });

    window.addEventListener("scroll", setActiveLink);
    setActiveLink();
});
