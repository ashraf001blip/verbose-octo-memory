/* =====================================================
   LERNO V1
   MAIN JAVASCRIPT
===================================================== */


/* =====================================================
   THEME
===================================================== */

function toggleTheme() {

    document.body.classList.toggle("light");

    const theme =
        document.body.classList.contains("light")
            ? "light"
            : "dark";

    localStorage.setItem(
        "lernoTheme",
        theme
    );

}


/* Load saved theme */

if (
    localStorage.getItem("lernoTheme") === "light"
) {

    document.body.classList.add("light");

}


/* =====================================================
   MOBILE MENU
===================================================== */

function toggleMenu() {

    const menu =
        document.getElementById("mobileMenu");

    menu.classList.toggle("show");

}


function closeMenu() {

    const menu =
        document.getElementById("mobileMenu");

    menu.classList.remove("show");

}


/* =====================================================
   LOGIN MODAL
===================================================== */

function openLogin() {

    document
        .getElementById("loginModal")
        .classList.add("show");

}


function closeLogin() {

    document
        .getElementById("loginModal")
        .classList.remove("show");

}


/* =====================================================
   SIGNUP MODAL
===================================================== */

function openSignup() {

    document
        .getElementById("signupModal")
        .classList.add("show");

}


function closeSignup() {

    document
        .getElementById("signupModal")
        .classList.remove("show");

}


function openTeacherSignup() {

    openSignup();

    selectAccountType("teacher");

}


/* =====================================================
   LOGIN TABS
===================================================== */

function showStudentLogin() {

    document
        .getElementById("studentLogin")
        .classList.remove("hidden");

    document
        .getElementById("teacherLogin")
        .classList.add("hidden");


    document
        .getElementById("studentTab")
        .classList.add("selected");

    document
        .getElementById("teacherTab")
        .classList.remove("selected");

}


function showTeacherLogin() {

    document
        .getElementById("studentLogin")
        .classList.add("hidden");

    document
        .getElementById("teacherLogin")
        .classList.remove("hidden");


    document
        .getElementById("teacherTab")
        .classList.add("selected");

    document
        .getElementById("studentTab")
        .classList.remove("selected");

}


/* =====================================================
   ACCOUNT TYPE
===================================================== */

function selectAccountType(type) {

    const student =
        document.getElementById(
            "studentType"
        );

    const teacher =
        document.getElementById(
            "teacherType"
        );

    const studentOptions =
        document.getElementById(
            "studentOptions"
        );

    const teacherOptions =
        document.getElementById(
            "teacherOptions"
        );


    if (type === "student") {

        student.classList.add("selected");

        teacher.classList.remove("selected");

        studentOptions.classList.remove("hidden");

        teacherOptions.classList.add("hidden");

    }


    if (type === "teacher") {

        teacher.classList.add("selected");

        student.classList.remove("selected");

        teacherOptions.classList.remove("hidden");

        studentOptions.classList.add("hidden");

    }

}


/* =====================================================
   STUDENT LOGIN
===================================================== */

function studentLogin() {

    const name =
        document
            .getElementById(
                "studentLoginName"
            )
            .value
            .trim();


    if (!name) {

        alert(
            "Please enter your name."
        );

        return;

    }


    localStorage.setItem(
        "lernoUser",
        JSON.stringify({
            name: name,
            role: "student"
        })
    );


    closeLogin();


    alert(
        "Welcome to Lerno, " +
        name +
        "! 🎓"
    );

}


/* =====================================================
   TEACHER LOGIN
===================================================== */

function teacherLogin() {

    const name =
        document
            .getElementById(
                "teacherLoginName"
            )
            .value
            .trim();


    const password =
        document
            .getElementById(
                "teacherLoginPassword"
            )
            .value;


    /*
        V1 DEMO LOGIN

        Teacher:
        Ashraf

        Password:
        12345
    */


    if (
        name.toLowerCase() === "ashraf" &&
        password === "12345"
    ) {

        localStorage.setItem(
            "lernoUser",
            JSON.stringify({

                name: "Ashraf",

                role: "teacher",

                verified: true

            })
        );


        closeLogin();


        alert(
            "Teacher verified! 👨‍🏫\n\n" +
            "Welcome to your Teacher Studio."
        );


        /*
            Later this button will open:

            teacher.html

            For V1 we keep everything
            inside the prototype.
        */

    }

    else {

        alert(
            "Invalid teacher login.\n\n" +
            "Demo:\n" +
            "Name: Ashraf\n" +
            "Password: 12345"
        );

    }

}


/* =====================================================
   CREATE ACCOUNT
===================================================== */

function createAccount() {

    const name =
        document
            .getElementById(
                "signupName"
            )
            .value
            .trim();


    const password =
        document
            .getElementById(
                "signupPassword"
            )
            .value;


    if (!name) {

        alert(
            "Please enter your name."
        );

        return;

    }


    if (!password) {

        alert(
            "Please create a password."
        );

        return;

    }


    const teacherButton =
        document
            .getElementById(
                "teacherType"
            );


    const isTeacher =
        teacherButton.classList.contains(
            "selected"
        );


    /* ================= TEACHER ================= */

    if (isTeacher) {

        const subject =
            document
                .getElementById(
                    "teacherSubject"
                )
                .value
                .trim();


        const description =
            document
                .getElementById(
                    "teacherDescription"
                )
                .value
                .trim();


        if (!subject) {

            alert(
                "Please enter what you teach."
            );

            return;

        }


        const application = {

            name: name,

            subject: subject,

            description: description,

            status: "pending",

            date:
                new Date()
                    .toISOString()

        };


        localStorage.setItem(
            "lernoTeacherApplication",
            JSON.stringify(application)
        );


        closeSignup();


        alert(
            "Teacher application submitted! 👨‍🏫\n\n" +
            "Your subject: " +
            subject +
            "\n\n" +
            "Once verified, your subject can become a Lerno course."
        );


        return;

    }


    /* ================= STUDENT ================= */

    const goal =
        document.querySelector(
            'input[name="goal"]:checked'
        );


    const selectedGoal =
        goal
            ? goal.value
            : "career";


    const user = {

        name: name,

        password: password,

        role: "student",

        goal: selectedGoal

    };


    localStorage.setItem(
        "lernoUser",
        JSON.stringify(user)
    );


    closeSignup();


    alert(
        "Account created! 🎉\n\n" +
        "Learning goal: " +
        selectedGoal
    );

}


/* =====================================================
   LEARNING GOAL
===================================================== */

function selectGoal(goal) {

    localStorage.setItem(
        "lernoGoal",
        goal
    );


    const names = {

        career: "Career",

        hobby: "Hobby",

        school: "School"

    };


    alert(
        "Great choice! 🎓\n\n" +
        "You selected: " +
        names[goal]
    );


    openSignup();

}


/* =====================================================
   COURSE
===================================================== */

function openCourse(courseName) {

    const modal =
        document.getElementById(
            "courseModal"
        );


    document
        .getElementById(
            "courseModalTitle"
        )
        .textContent = courseName;


    const icons = {

        "HTML Fundamentals": "🌐",

        "CSS Masterclass": "🎨",

        "JavaScript Basics": "⚡",

        "UI/UX Design": "🧩"

    };


    document
        .getElementById(
            "courseModalIcon"
        )
        .textContent =
        icons[courseName] || "📚";


    modal.classList.add("show");

}


function closeCourse() {

    document
        .getElementById(
            "courseModal"
        )
        .classList.remove("show");

}


function enrollCourse() {

    const course =
        document
            .getElementById(
                "courseModalTitle"
            )
            .textContent;


    let courses =
        JSON.parse(
            localStorage.getItem(
                "lernoCourses"
            ) || "[]"
        );


    courses.push({

        name: course,

        enrolled:
            new Date().toISOString()

    });


    localStorage.setItem(
        "lernoCourses",
        JSON.stringify(courses)
    );


    closeCourse();


    alert(
        "🎉 You are now enrolled in " +
        course + "!"
    );

}


function showAllCourses() {

    document
        .getElementById(
            "courses"
        )
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =====================================================
   CLASSES
===================================================== */

function joinClass(className) {

    alert(
        "🎥 " +
        className +
        "\n\n" +
        "The live classroom will open here."
    );

}


function scrollToCourses() {

    document
        .getElementById(
            "courses"
        )
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =====================================================
   CLOSE MODALS WHEN CLICKING OUTSIDE
===================================================== */

window.addEventListener(
    "click",
    function(event) {

        const login =
            document.getElementById(
                "loginModal"
            );

        const signup =
            document.getElementById(
                "signupModal"
            );

        const course =
            document.getElementById(
                "courseModal"
            );


        if (event.target === login) {

            closeLogin();

        }


        if (event.target === signup) {

            closeSignup();

        }


        if (event.target === course) {

            closeCourse();

        }

    }
);
