/* =========================
   MOBILE MENU
========================= */

const menuButton =
    document.querySelector(".menu-btn");

const navigation =
    document.querySelector(".nav-links");


menuButton.addEventListener("click", function () {

    navigation.classList.toggle("active");

});



/* =========================
   CLOSE MOBILE MENU
========================= */

const navigationLinks =
    document.querySelectorAll(".nav-links a");


navigationLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navigation.classList.remove("active");

    });

});



/* =========================
   TYPING EFFECT
========================= */

const typingText =
    document.getElementById("typing-text");


const words = [
    "B.Tech Student",
    "Aspiring Developer",
    "Tech Enthusiast",
    "Web Development Learner"
];


let wordIndex = 0;

let characterIndex = 0;

let isDeleting = false;


function typeEffect() {

    const currentWord =
        words[wordIndex];


    if (isDeleting) {

        characterIndex--;

    } else {

        characterIndex++;

    }


    typingText.textContent =
        currentWord.substring(
            0,
            characterIndex
        );


    let speed =
        isDeleting ? 55 : 90;


    if (
        !isDeleting &&
        characterIndex === currentWord.length
    ) {

        speed = 1300;

        isDeleting = true;

    }


    else if (
        isDeleting &&
        characterIndex === 0
    ) {

        isDeleting = false;

        wordIndex++;

        if (wordIndex >= words.length) {

            wordIndex = 0;

        }

        speed = 300;

    }


    setTimeout(typeEffect, speed);

}


typeEffect();



/* =========================
   CURRENT YEAR
========================= */

const year =
    document.getElementById("year");


year.textContent =
    new Date().getFullYear();



/* =========================
   SKILL BAR ANIMATION
========================= */

const skillBars =
    document.querySelectorAll(".progress-bar");


const skillObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    const bar =
                        entry.target;


                    const width =
                        bar.getAttribute("data-width");


                    bar.style.width =
                        width;


                    skillObserver.unobserve(bar);

                }

            });

        },

        {
            threshold: 0.4
        }

    );


skillBars.forEach(function (bar) {

    skillObserver.observe(bar);

});



/* =========================
   SCROLL REVEAL
========================= */

const animatedElements =
    document.querySelectorAll(
        ".about-card, .education-card, .skill-card, .certificate-card, .tag"
    );


const revealObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.15
        }

    );


animatedElements.forEach(function (element) {

    revealObserver.observe(element);

});



/* =========================
   CERTIFICATE IMAGE MODAL
========================= */

const certificateImages =
    document.querySelectorAll(
        ".certificate-image img"
    );


const imageModal =
    document.getElementById("imageModal");


const modalImage =
    document.getElementById("modalImage");


const closeModal =
    document.getElementById("closeModal");



certificateImages.forEach(function (image) {

    image.addEventListener("click", function () {

        modalImage.src =
            image.src;


        imageModal.classList.add("active");


        document.body.style.overflow =
            "hidden";

    });

});



/* =========================
   CLOSE MODAL
========================= */

closeModal.addEventListener(
    "click",
    function () {

        imageModal.classList.remove("active");

        document.body.style.overflow =
            "auto";

    }
);



/* =========================
   CLOSE MODAL OUTSIDE IMAGE
========================= */

imageModal.addEventListener(
    "click",
    function (event) {

        if (event.target === imageModal) {

            imageModal.classList.remove("active");

            document.body.style.overflow =
                "auto";

        }

    }
);



/* =========================
   ESC KEY
========================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            imageModal.classList.remove("active");

            document.body.style.overflow =
                "auto";

        }

    }
);

/* =========================
   VINITX AI CHAT WIDGET
========================= */
(function initVinitxWidget() {
    const launcher = document.getElementById("vinitxLauncher");
    const panel = document.getElementById("vinitxChatPanel");
    const closeButton = document.getElementById("vinitxClose");
    const form = document.getElementById("vinitxChatForm");
    const input = document.getElementById("vinitxUserInput");
    const messages = document.getElementById("vinitxMessages");

    if (!launcher || !panel || !closeButton || !form || !input || !messages) return;

    function setOpen(isOpen) {
        panel.classList.toggle("is-open", isOpen);
        panel.setAttribute("aria-hidden", String(!isOpen));
        launcher.setAttribute("aria-expanded", String(isOpen));
        launcher.setAttribute("aria-label", isOpen ? "Close VINITX AI chat" : "Open VINITX AI chat");
        if (isOpen) input.focus();
        else launcher.focus();
    }

    function addMessage(text, type) {
        const bubble = document.createElement("div");
        bubble.className = "vinitx-message " + (type === "user" ? "vinitx-message-user" : "vinitx-message-bot");
        bubble.textContent = text;
        messages.appendChild(bubble);
        messages.scrollTop = messages.scrollHeight;
        return bubble;
    }

    function getLocalReply(question) {
        const q = question.toLowerCase();
        if (/\b(hi|hello|hey|namaste)\b/.test(q)) {
            return "Hi! 👋 I'm VINITX AI, the portfolio assistant. Ask me about Vinit's education, skills, or projects.";
        }
        if (/\b(skill|tech|language|programming)\b/.test(q)) {
            return "Vinit's portfolio lists Python, HTML, CSS, JavaScript, Java, and OOP as learning skills.";
        }
        if (/\b(education|college|degree|b\.tech|university)\b/.test(q)) {
            return "Vinit's portfolio says he is pursuing a B.Tech and lists Sanskriti University, Mathura.";
        }
        if (/\b(project|vinitx|chatbot|ai)\b/.test(q)) {
            return "VINITX AI is Vinit's AI assistant project. Its live AI connection needs the chatbot's deployed API/backend URL; this portfolio widget is currently in demo mode.";
        }
        if (/\b(certificate|certification)\b/.test(q)) {
            return "You can view Vinit's certificates in the Certificates section of this portfolio.";
        }
        if (/\b(contact|email|phone|reach)\b/.test(q)) {
            return "You can reach Vinit using the contact details shown in the Contact section of this portfolio.";
        }
        return "Thanks for your question! I'm currently in demo mode, so I can answer a few portfolio-related questions. To answer general questions with the full VINITX AI, its deployed backend/API must be connected.";
    }

    launcher.addEventListener("click", function () {
        setOpen(!panel.classList.contains("is-open"));
    });
    closeButton.addEventListener("click", function () {
        setOpen(false);
    });
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && panel.classList.contains("is-open")) setOpen(false);
    });
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const question = input.value.trim();
        if (!question) return;
        addMessage(question, "user");
        input.value = "";
        addMessage(getLocalReply(question), "bot");
    });
})();
