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
    const API_URL = "https://vinitx-ai-backend.onrender.com/chat";
    const launcher = document.getElementById("vinitxLauncher");
    const panel = document.getElementById("vinitxChatPanel");
    const closeButton = document.getElementById("vinitxClose");
    const form = document.getElementById("vinitxChatForm");
    const input = document.getElementById("vinitxUserInput");
    const sendButton = form ? form.querySelector('button[type="submit"]') : null;
    const messages = document.getElementById("vinitxMessages");
    const MEMORY_KEY = "vinitx-portfolio-chat-memory-v1";
    let chatHistory = [];
    try {
        const saved = JSON.parse(localStorage.getItem(MEMORY_KEY) || "[]");
        if (Array.isArray(saved)) {
            chatHistory = saved.filter(item => item &&
                (item.role === "user" || item.role === "model") &&
                typeof item.text === "string").slice(-20);
        }
    } catch (_) {
        chatHistory = [];
    }

    function saveChatHistory() {
        try {
            localStorage.setItem(MEMORY_KEY, JSON.stringify(chatHistory.slice(-20)));
        } catch (error) {
            console.warn("Could not save VINITX AI chat memory:", error);
        }
    }

    if (!launcher || !panel || !closeButton || !form || !input || !sendButton || !messages) return;

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

    const chatNote = messages.querySelector(".vinitx-chat-note");
    chatHistory.forEach(function (item) {
        addMessage(item.text, item.role === "user" ? "user" : "bot");
    });
    if (chatNote) messages.appendChild(chatNote);

    launcher.addEventListener("click", function () {
        setOpen(!panel.classList.contains("is-open"));
    });
    closeButton.addEventListener("click", function () {
        setOpen(false);
    });
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && panel.classList.contains("is-open")) setOpen(false);
    });

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        const question = input.value.trim();
        if (!question || sendButton.disabled) return;

        addMessage(question, "user");
        input.value = "";
        input.disabled = true;
        sendButton.disabled = true;
        sendButton.setAttribute("aria-label", "VINITX AI is replying");
        const loadingBubble = addMessage("VINITX AI सोच रहा है…", "bot");

        const controller = new AbortController();
        const requestTimeout = setTimeout(() => controller.abort(), 30000);

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: question, history: chatHistory.slice(-12) }),
                signal: controller.signal
            });

            let data = {};
            try {
                data = await response.json();
            } catch (_) {
                throw new Error("AI server returned an unreadable response.");
            }

            if (!response.ok) {
                throw new Error(data.error || "AI server returned an error (" + response.status + ").");
            }

            loadingBubble.textContent = data.reply || data.error || "माफ़ कीजिए, जवाब नहीं मिल पाया।";
            if (response.ok && data.reply) {
                chatHistory.push(
                    { role: "user", text: question },
                    { role: "model", text: data.reply }
                );
                chatHistory = chatHistory.slice(-20);
                saveChatHistory();
            }
        } catch (error) {
            console.error("VINITX AI chat error:", error);
            loadingBubble.textContent = error.name === "AbortError"
                ? "जवाब आने में 30 सेकंड से ज़्यादा लग गए। Backend status जाँचकर फिर कोशिश करें।"
                : error.name === "TypeError"
                    ? "VINITX AI से connection नहीं हो पाया। Backend/CORS जाँचकर फिर कोशिश करें।"
                    : (error.message || "अभी जवाब नहीं मिल पाया। कृपया फिर कोशिश करें।");
            loadingBubble.classList.add("vinitx-message-error");
        } finally {
            clearTimeout(requestTimeout);
            input.disabled = false;
            sendButton.disabled = false;
            sendButton.setAttribute("aria-label", "Send message");
            input.focus();
            messages.scrollTop = messages.scrollHeight;
        }
    });
})();
