document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("a[href^='#']");
    links.forEach(function (link) {
        link.addEventListener("click", function (e) {
            const target = document.querySelector(link.getAttribute("href"));
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    const heroLead = document.getElementById("hero-lead");
    if (heroLead) {
        heroLead.style.visibility = "hidden";
        setTimeout(function () {
            heroLead.style.visibility = "visible";
            heroLead.classList.add("animate__animated", "animate__slideInDown");
        }, 1000);
    }
});
