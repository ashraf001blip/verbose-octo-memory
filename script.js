/* =========================================================
   LEARNOVA
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const body = document.body;

    const themeBtn = document.getElementById("themeBtn");

    const mobileMenuBtn =
        document.getElementById("mobileMenuBtn");

    const mobileNav =
        document.getElementById("mobileNav");

    const notificationBtn =
        document.getElementById("notificationBtn");

    const notificationPanel =
        document.getElementById("notificationPanel");

    const closeNotifications =
        document.getElementById("closeNotifications");

    const courseSearch =
        document.getElementById("courseSearch");

    const coursesGrid =
        document.getElementById("coursesGrid");

    const emptyState =
        document.getElementById("emptyState");

    const courseModal =
        document.getElementById("courseModal");

    const courseModalClose =
        document.getElementById("courseModalClose");

    const modalCourseTitle =
        document.getElementById("modalCourseTitle");

    const startCourseBtn =
        document.getElementById("startCourseBtn");

    const loginModal =
        document.getElementById("loginModal");

    const loginBtn =
        document.getElementById("loginBtn");

    const signupBtn =
        document.getElementById("signupBtn");

    const mobileSignup =
        document.getElementById("mobileSignup");

    const authClose =
        document.querySelector(".auth-close");

    const loginForm =
        document.getElementById("loginForm");

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");

    const chatForm =
        document.getElementById("chatForm");

    const chatInput =
        document.getElementById("chatInput");

    const chatMessages =
        document.getElementById("chatMessages");

    const openAiBtn =
        document.getElementById("openAiBtn");

    const ctaBtn =
        document.getElementById("ctaBtn");


    /* =====================================================
       THEME
    ===================================================== */

    const savedTheme =
        localStorage.getItem("learnova-theme");

    if (savedTheme === "dark") {

        body.classList.add("dark");

        themeBtn.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    }


    themeBtn.addEventListener("click", () => {

        body.classList.toggle("dark");

        const isDark =
            body.classList.contains("dark");

        localStorage.setItem(
            "learnova-theme",
            isDark ? "dark" : "light"
        );

        themeBtn.innerHTML = isDark
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';

        showToast(
            isDark
                ? "Dark mode enabled"
                : "Light mode enabled"
        );

    });


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    mobileMenuBtn.addEventListener("click", () => {

        mobileNav.classList.toggle("active");

        const opened =
            mobileNav.classList.contains("active");

        mobileMenuBtn.innerHTML = opened
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';

    });


    document.querySelectorAll(".mobile-nav a").forEach(link => {

        link.addEventListener("click", () => {

            mobileNav.classList.remove("active");

            mobileMenuBtn.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        });

    });


    /* =====================================================
       NAV ACTIVE STATE
    ===================================================== */

    const navLinks =
        document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.forEach(item =>
                item.classList.remove("active")
            );

            link.classList.add("active");

        });

    });


    /* =====================================================
       NOTIFICATIONS
    ===================================================== */

    notificationBtn.addEventListener("click", event => {

        event.stopPropagation();

        notificationPanel.classList.toggle("active");

    });


    closeNotifications.addEventListener("click", () => {

        notificationPanel.classList.remove("active");

    });


    document.addEventListener("click", event => {

        if (
            notificationPanel.classList.contains("active") &&
            !notificationPanel.contains(event.target) &&
            !notificationBtn.contains(event.target)
        ) {

            notificationPanel.classList.remove("active");

        }

    });


    /* =====================================================
       COURSE FILTER
    ===================================================== */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const courseCards =
        document.querySelectorAll(".course-card");


    let currentFilter = "All";


    function filterCourses() {

        const searchTerm =
            courseSearch.value
                .trim()
                .toLowerCase();

        let visibleCourses = 0;


        courseCards.forEach(card => {

            const category =
                card.dataset.category;

            const title =
                card.dataset.title.toLowerCase();

            const description =
                card.querySelector(".course-description")
                    ?.textContent
                    .toLowerCase() || "";

            const matchesCategory =
                currentFilter === "All" ||
                category === currentFilter;

            const matchesSearch =
                title.includes(searchTerm) ||
                category.toLowerCase().includes(searchTerm) ||
                description.includes(searchTerm);


            if (
                matchesCategory &&
                matchesSearch
            ) {

                card.style.display = "";

                visibleCourses++;

            } else {

                card.style.display = "none";

            }

        });


        if (visibleCourses === 0) {

            emptyState.classList.add("show");

        } else {

            emptyState.classList.remove("show");

        }

    }


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            currentFilter =
                button.dataset.filter;

            filterCourses();

        });

    });


    courseSearch.addEventListener(
        "input",
        filterCourses
    );


    /* =====================================================
       CATEGORY CARDS
    ===================================================== */

    document
        .querySelectorAll(".category-card")
        .forEach(card => {

            card.addEventListener("click", () => {

                const category =
                    card.dataset.category;

                const matchingFilter =
                    [...filterButtons].find(
                        button =>
                            button.dataset.filter === category
                    );


                if (matchingFilter) {

                    filterButtons.forEach(btn =>
                        btn.classList.remove("active")
                    );

                    matchingFilter.classList.add("active");

                    currentFilter = category;

                    filterCourses();

                }

                document
                    .getElementById("courses")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            });

        });


    /* =====================================================
       FAVORITES
    ===================================================== */

    document
        .querySelectorAll(".favorite-btn")
        .forEach(button => {

            button.addEventListener("click", event => {

                event.stopPropagation();

                button.classList.toggle("favorited");

                const icon =
                    button.querySelector("i");

                const favorite =
                    button.classList.contains("favorited");


                icon.className = favorite
                    ? "fa-solid fa-heart"
                    : "fa-regular fa-heart";


                showToast(
                    favorite
                        ? "Course added to favorites ❤️"
                        : "Course removed from favorites"
                );

            });

        });


    /* =====================================================
       COURSE MODAL
    ===================================================== */

    document
        .querySelectorAll(".course-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                const course =
                    button.dataset.course;

                modalCourseTitle.textContent =
                    course;

                courseModal.classList.add("active");

                document.body.style.overflow =
                    "hidden";

            });

        });


    courseModalClose.addEventListener(
        "click",
        closeCourseModal
    );


    courseModal.addEventListener(
        "click",
        event => {

            if (event.target === courseModal) {

                closeCourseModal();

            }

        }
    );


    function closeCourseModal() {

        courseModal.classList.remove("active");

        document.body.style.overflow = "";

    }


    startCourseBtn.addEventListener("click", () => {

        closeCourseModal();

        showToast(
            "Course started! Your progress has been saved."
        );

    });


    /* =====================================================
       LOGIN MODAL
    ===================================================== */

    function openLoginModal() {

        loginModal.classList.add("active");

        document.body.style.overflow = "hidden";

    }


    function closeLoginModal() {

        loginModal.classList.remove("active");

        document.body.style.overflow = "";

    }


    loginBtn.addEventListener(
        "click",
        openLoginModal
    );


    signupBtn.addEventListener(
        "click",
        openLoginModal
    );


    mobileSignup.addEventListener("click", () => {

        mobileNav.classList.remove("active");

        mobileMenuBtn.innerHTML =
            '<i class="fa-solid fa-bars"></i>';

        openLoginModal();

    });


    authClose.addEventListener(
        "click",
        closeLoginModal
    );


    loginModal.addEventListener(
        "click",
        event => {

            if (event.target === loginModal) {

                closeLoginModal();

            }

        }
    );


    loginForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            closeLoginModal();

            showToast(
                "Demo login successful! Connect your backend next."
            );

        }
    );


    /* =====================================================
       LIVE CLASS BUTTONS
    ===================================================== */

    document
        .querySelectorAll(".join-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                showToast(
                    "Opening live classroom..."
                );

            });

        });


    document
        .querySelectorAll(".reminder-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                button.textContent =
                    "Reminder Set ✓";

                button.style.background =
                    "rgba(0,200,150,.1)";

                button.style.color =
                    "#00a97f";

                showToast(
                    "Class reminder has been set."
                );

            });

        });


    /* =====================================================
       CONTINUE LEARNING
    ===================================================== */

    document
        .querySelectorAll(
            ".continue-btn, .primary-small-btn"
        )
        .forEach(button => {

            button.addEventListener("click", () => {

                showToast(
                    "Opening your lesson..."
                );

            });

        });


    /* =====================================================
       AI COACH
    ===================================================== */

    const aiResponses = [

        "Absolutely! Let's break this topic into simple steps so it's easier to understand. 🧠",

        "Great question! Think of it like building with LEGO. Each concept connects to the next one. 🧱",

        "Here's a simple explanation: start with the basic idea, then gradually add the advanced concepts. 🚀",

        "Nice! I recommend practicing this concept with a small project. That's usually the fastest way to understand it. 💡",

        "Let's turn that into a learning challenge. I'll help you work through it step by step. 🎯"

    ];


    function addChatMessage(
        text,
        type = "ai"
    ) {

        const message =
            document.createElement("div");

        message.className =
            `message ${type}-message`;


        if (type === "ai") {

            message.innerHTML = `

                <div class="message-avatar">
                    <i class="fa-solid fa-sparkles"></i>
                </div>

                <div class="message-bubble">
                    ${escapeHTML(text)}
                </div>

            `;

        } else {

            message.innerHTML = `

                <div class="message-bubble">
                    ${escapeHTML(text)}
                </div>

            `;

        }


        chatMessages.appendChild(message);

        chatMessages.scrollTop =
            chatMessages.scrollHeight;

    }


    function aiReply() {

        const random =
            aiResponses[
                Math.floor(
                    Math.random() *
                    aiResponses.length
                )
            ];


        setTimeout(() => {

            addChatMessage(random, "ai");

        }, 650);

    }


    chatForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const message =
                chatInput.value.trim();


            if (!message) return;


            addChatMessage(
                message,
                "user"
            );

            chatInput.value = "";

            aiReply();

        }
    );


    document
        .querySelectorAll(".quick-prompts button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const prompt =
                        button.dataset.prompt;

                    addChatMessage(
                        prompt,
                        "user"
                    );

                    aiReply();

                }
            );

        });


    openAiBtn.addEventListener(
        "click",
        () => {

            document
                .getElementById("ai-coach")
                .scrollIntoView({
                    behavior: "smooth"
                });

            setTimeout(() => {

                chatInput.focus();

            }, 700);

        }
    );


    /* =====================================================
       CTA
    ===================================================== */

    ctaBtn.addEventListener(
        "click",
        () => {

            openLoginModal();

        }
    );


    /* =====================================================
       STATS COUNTER
    ===================================================== */

    const counters =
        document.querySelectorAll(
            "[data-count]"
        );


    let countersStarted = false;


    function animateCounters() {

        if (countersStarted) return;

        countersStarted = true;


        counters.forEach(counter => {

            const target =
                Number(counter.dataset.count);

            let current = 0;

            const duration = 1500;

            const increment =
                target / (duration / 16);


            const update = () => {

                current += increment;


                if (current >= target) {

                    counter.textContent =
                        formatNumber(target);

                    return;

                }


                counter.textContent =
                    formatNumber(
                        Math.floor(current)
                    );


                requestAnimationFrame(update);

            };


            update();

        });

    }


    function formatNumber(number) {

        if (number >= 1000) {

            return (
                Math.floor(number / 100) / 10
            ) + "k+";

        }

        return number;

    }


    const statsSection =
        document.querySelector(".stats-section");


    const statsObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        animateCounters();

                        statsObserver.disconnect();

                    }

                });

            },
            {
                threshold: .4
            }
        );


    if (statsSection) {

        statsObserver.observe(
            statsSection
        );

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".course-card, .category-card, .live-card, .instructor-card"
        );


    revealElements.forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(15px)";

        element.style.transition =
            "opacity .5s ease, transform .5s ease";

    });


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: .1
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================================
       CLOSE MODALS WITH ESC
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") return;


            closeCourseModal();

            closeLoginModal();

            notificationPanel.classList.remove(
                "active"
            );

        }
    );


    /* =====================================================
       TOAST
    ===================================================== */

    let toastTimer;


    function showToast(message) {

        toastMessage.textContent =
            message;

        toast.classList.add("show");


        clearTimeout(toastTimer);


        toastTimer = setTimeout(() => {

            toast.classList.remove("show");

        }, 3000);

    }


    /* =====================================================
       SECURITY HELPER
    ===================================================== */

    function escapeHTML(value) {

        const div =
            document.createElement("div");

        div.textContent =
            value;

        return div.innerHTML;

    }


    /* =====================================================
       INITIAL MESSAGE
    ===================================================== */

    console.log(
        "%cLearnova 🚀",
        "font-size:22px;font-weight:bold;color:#635bff"
    );

    console.log(
        "E-learning platform frontend initialized."
    );

});
