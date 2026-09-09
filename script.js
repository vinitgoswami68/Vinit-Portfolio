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