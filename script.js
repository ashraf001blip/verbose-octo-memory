/* =====================================================
   LERNO V1.1
   AUTH + AVATAR + APP
===================================================== */


/* =====================================================
   USER DATA
===================================================== */

let currentUser = {

    name: "Ashraf",

    email: "ashraf@lerno.demo",

    role: "student",

    age: 17,

    goal: "Hobby",

    interests: [
        "Web Development",
        "UI/UX Design"
    ],

    teaching: "",

    bio: "",

    avatar: ""

};


/* =====================================================
   ELEMENTS
===================================================== */

const authScreen =
    document.getElementById("authScreen");

const app =
    document.getElementById("app");

const signupForm =
    document.getElementById("signupForm");

const studentFields =
    document.getElementById("studentFields");

const instructorFields =
    document.getElementById("instructorFields");

const accountTabs =
    document.querySelectorAll(".account-tab");

const goalButtons =
    document.querySelectorAll(".goal-button");

const avatarInput =
    document.getElementById("avatarInput");

const avatarPreview =
    document.getElementById("avatarPreview");

const avatarPlaceholder =
    document.getElementById("avatarPlaceholder");

const signupButton =
    document.querySelector(".auth-submit");


/* =====================================================
   ACCOUNT TYPE
===================================================== */

let selectedAccount =
    "student";


accountTabs.forEach(button => {

    button.addEventListener("click", () => {

        accountTabs.forEach(tab => {

            tab.classList.remove("active");

        });


        button.classList.add("active");


        selectedAccount =
            button.dataset.account;


        if (
            selectedAccount === "student"
        ) {

            studentFields.classList.remove(
                "hidden"
            );

            instructorFields.classList.add(
                "hidden"
            );

            signupButton.textContent =
                "Create Student Account";

        }

        else {

            studentFields.classList.add(
                "hidden"
            );

            instructorFields.classList.remove(
                "hidden"
            );

            signupButton.textContent =
                "Create Instructor Account";

        }

    });

});


/* =====================================================
   LEARNING GOAL
===================================================== */

let selectedGoal =
    "Hobby";


goalButtons.forEach(button => {

    button.addEventListener("click", () => {

        goalButtons.forEach(btn => {

            btn.classList.remove(
                "active"
            );

        });


        button.classList.add(
            "active"
        );


        selectedGoal =
            button.dataset.goal;

    });

});


/* =====================================================
   AVATAR UPLOAD
===================================================== */

avatarInput.addEventListener(
    "change",
    event => {

        const file =
            event.target.files[0];


        if (!file) return;


        if (
            !file.type.startsWith("image/")
        ) {

            alert(
                "Please choose an image file."
            );

            return;

        }


        const reader =
            new FileReader();


        reader.onload = () => {

            const imageData =
                reader.result;


            avatarPreview.src =
                imageData;

            avatarPreview.style.display =
                "block";

            avatarPlaceholder.style.display =
                "none";


            /*
                We temporarily keep the avatar
                in browser storage.
            */

            currentUser.avatar =
                imageData;

        };


        reader.readAsDataURL(file);

    }
);


/* =====================================================
   SIGNUP
===================================================== */

signupForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document
                .getElementById("fullName")
                .value
                .trim();


        const email =
            document
                .getElementById("email")
                .value
                .trim();


        const password =
            document
                .getElementById("password")
                .value;


        if (
            !name ||
            !email ||
            !password
        ) {

            alert(
                "Please complete all required fields."
            );

            return;

        }


        /* ================= STUDENT ================= */

        if (
            selectedAccount ===
            "student"
        ) {

            const age =
                Number(
                    document
                        .getElementById("age")
                        .value
                );


            if (
                !age ||
                age < 5 ||
                age > 100
            ) {

                alert(
                    "Please enter a valid age."
                );

                return;

            }


            const interests =
                [
                    ...document.querySelectorAll(
                        ".interest input:checked"
                    )
                ].map(
                    checkbox =>
                        checkbox.value
                );


            currentUser = {

                name,

                email,

                role: "student",

                age,

                goal:
                    selectedGoal,

                interests,

                teaching: "",

                bio: "",

                avatar:
                    currentUser.avatar || ""

            };

        }


        /* ================= INSTRUCTOR ================= */

        else {

            const teaching =
                document
                    .getElementById("teaching")
                    .value
                    .trim();


            const teacherCode =
                document
                    .getElementById("teacherCode")
                    .value;


            const bio =
                document
                    .getElementById("teacherBio")
                    .value
                    .trim();


            if (!teaching) {

                alert(
                    "Please tell us what you teach."
                );

                return;

            }


            /*
                TEMPORARY V1.1 DEMO VERIFICATION

                This will later become real
                instructor authentication.
            */

            if (
                teacherCode !==
                "12345"
            ) {

                alert(
                    "❌ Incorrect instructor verification code."
                );

                return;

            }


            currentUser = {

                name,

                email,

                role: "instructor",

                age: null,

                goal: "",

                interests: [],

                teaching,

                bio,

                avatar:
                    currentUser.avatar || ""

            };

        }


        /* SAVE */

        localStorage.setItem(
            "lernoUser",
            JSON.stringify(
                currentUser
            )
        );


        launchApp();

    }
);


/* =====================================================
   LAUNCH APP
===================================================== */

function launchApp() {

    authScreen.classList.add(
        "hidden"
    );

    app.classList.remove(
        "hidden"
    );


    updateUserInterface();

    setupRoleInterface();


    showPage("home");

}


/* =====================================================
   UPDATE USER UI
===================================================== */

function updateUserInterface() {

    const firstLetter =
        currentUser.name
            .charAt(0)
            .toUpperCase();


    document.getElementById(
        "welcomeName"
    ).textContent =
        currentUser.name;


    document.getElementById(
        "sidebarName"
    ).textContent =
        currentUser.name;


    document.getElementById(
        "topName"
    ).textContent =
        currentUser.name;


    document.getElementById(
        "profileName"
    ).textContent =
        currentUser.name;


    document.getElementById(
        "profileRole"
    ).textContent =
        currentUser.role ===
        "instructor"
            ? "Instructor"
            : "Student";


    /* PROFILE EXTRA */

    if (
        currentUser.role ===
        "instructor"
    ) {

        document.getElementById(
            "profileExtra"
        ).textContent =
            currentUser.teaching ||
            "Instructor";

    }

    else {

        document.getElementById(
            "profileExtra"
        ).textContent =
            currentUser.goal +
            " learner";

    }


    /* AVATAR */

    const avatars =
        document.querySelectorAll(
            ".avatar-image"
        );


    avatars.forEach(avatar => {

        if (currentUser.avatar) {

            avatar.src =
                currentUser.avatar;

        }

        else {

            avatar.src =
                createAvatarPlaceholder(
                    firstLetter
                );

        }

    });


    const profileAvatar =
        document.getElementById(
            "profileAvatar"
        );


    if (
        currentUser.avatar
    ) {

        profileAvatar.src =
            currentUser.avatar;

    }

    else {

        profileAvatar.src =
            createAvatarPlaceholder(
                firstLetter
            );

    }


    const teacherAvatar =
        document.getElementById(
            "teacherAvatar"
        );


    if (
        currentUser.avatar
    ) {

        teacherAvatar.src =
            currentUser.avatar;

    }

    else {

        teacherAvatar.src =
            createAvatarPlaceholder(
                firstLetter
            );

    }


    document.getElementById(
        "teacherName"
    ).textContent =
        currentUser.name;


    document.getElementById(
        "teacherSubject"
    ).textContent =
        currentUser.teaching ||
        "Instructor";

}


/* =====================================================
   PLACEHOLDER AVATAR
===================================================== */

function createAvatarPlaceholder(
    letter
) {

    return (
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(`

            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 100 100"
            >

                <rect
                    width="100"
                    height="100"
                    rx="50"
                    fill="#272d3a"
                />

                <text
                    x="50"
                    y="58"
                    text-anchor="middle"
                    font-size="42"
                    font-family="Arial"
                    font-weight="bold"
                    fill="white"
                >
                    ${letter}
                </text>

            </svg>

        `)
    );

}


/* =====================================================
   ROLE INTERFACE
===================================================== */

function setupRoleInterface() {

    const teacherButton =
        document.getElementById(
            "teacherStudioButton"
        );


    if (
        currentUser.role ===
        "instructor"
    ) {

        teacherButton.classList.remove(
            "hidden"
        );

    }

    else {

        teacherButton.classList.add(
            "hidden"
        );

    }

}


/* =====================================================
   NAVIGATION
===================================================== */

const navButtons =
    document.querySelectorAll(
        ".nav-btn"
    );


const pages =
    document.querySelectorAll(
        ".page"
    );


navButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const page =
                button.dataset.page;


            if (!page) return;


            showPage(page);

        }
    );

});


document
    .querySelectorAll(
        "[data-page]"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const page =
                    button.dataset.page;


                if (page) {

                    showPage(page);

                }

            }
        );

    });


function showPage(
    pageName
) {

    pages.forEach(page => {

        page.classList.remove(
            "active"
        );

    });


    const target =
        document.getElementById(
            pageName
        );


    if (target) {

        target.classList.add(
            "active"
        );

    }


    navButtons.forEach(button => {

        button.classList.remove(
            "active"
        );


        if (
            button.dataset.page ===
            pageName
        ) {

            button.classList.add(
                "active"
            );

        }

    });


    closeMobileSidebar();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   MOBILE MENU
===================================================== */

const mobileMenu =
    document.getElementById(
        "mobileMenu"
    );


const sidebar =
    document.getElementById(
        "sidebar"
    );


mobileMenu.addEventListener(
    "click",
    () => {

        sidebar.classList.toggle(
            "open"
        );

    }
);


function closeMobileSidebar() {

    sidebar.classList.remove(
        "open"
    );

}


/* =====================================================
   SEARCH
===================================================== */

const searchInput =
    document.getElementById(
        "searchInput"
    );


searchInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Enter"
        ) {

            const value =
                searchInput.value.trim();


            if (!value) return;


            alert(
                "🔎 Searching Lerno for:\n\n" +
                value
            );

        }

    }
);


function openSearch() {

    searchInput.focus();

}


/* =====================================================
   LESSON
===================================================== */

function openLesson(
    course
) {

    openModal(`

        <div class="eyebrow">
            COURSE
        </div>

        <h2 style="margin-top:8px">
            ${course}
        </h2>

        <p style="color:#8993a6;margin:10px 0 20px">
            Your next lesson is ready.
        </p>

        <div style="
            padding:15px;
            border:1px solid #252c3a;
            border-radius:12px;
            margin-bottom:15px;
        ">

            🎥 Video lesson

            <br><br>

            📄 Lesson notes

            <br><br>

            📝 Practice exercise

        </div>

        <button
            class="primary full"
            onclick="startLesson()"
        >
            ▶ Start Lesson
        </button>

    `);

}


function startLesson() {

    closeModal();


    alert(
        "🎥 Lesson started!\n\n" +
        "The real video player will be connected later."
    );

}


/* =====================================================
   CLASSES
===================================================== */

function joinClass() {

    openModal(`

        <div style="font-size:35px">
            🎥
        </div>

        <h2>
            JavaScript Fundamentals
        </h2>

        <p style="color:#8993a6">
            Your live classroom is ready.
        </p>

        <div style="
            margin:20px 0;
            padding:15px;
            background:#171d29;
            border-radius:10px;
        ">

            🔴 Class begins at 4:00 PM

            <br><br>

            👨‍🏫 Instructor:
            ${currentUser.name}

            <br><br>

            👥 32 students registered

        </div>

        <button
            class="primary full"
            onclick="enterClassroom()"
        >
            Enter Classroom
        </button>

    `);

}


function enterClassroom() {

    closeModal();


    alert(
        "🎥 Entering classroom...\n\n" +
        "The real meeting system will be connected later."
    );

}


function reminder() {

    alert(
        "🔔 Reminder set!"
    );

}


/* =====================================================
   ASSIGNMENTS
===================================================== */

function openAssignment(
    name
) {

    openModal(`

        <div class="eyebrow">
            ASSIGNMENT
        </div>

        <h2 style="margin-top:8px">
            ${name}
        </h2>

        <p style="color:#8993a6;margin:10px 0">
            Complete this assignment and submit your work.
        </p>

        <textarea
            id="assignmentAnswer"
            placeholder="Write your answer or describe your project..."
        ></textarea>

        <br><br>

        <button
            class="primary full"
            onclick="submitAssignment()"
        >
            Submit Assignment
        </button>

    `);

}


function submitAssignment() {

    closeModal();


    alert(
        "✅ Assignment submitted!"
    );

}


/* =====================================================
   TESTS
===================================================== */

function startTest() {

    openModal(`

        <div style="font-size:35px">
            🧪
        </div>

        <h2>
            Start Test
        </h2>

        <p style="color:#8993a6">
            This test contains 20 questions.
        </p>

        <div style="
            padding:15px;
            margin:20px 0;
            border-radius:10px;
            background:#171d29;
        ">

            ⏱️ 30 minutes

            <br><br>

            🎯 Passing score: 60%

        </div>

        <button
            class="primary full"
            onclick="beginTest()"
        >
            Begin Test
        </button>

    `);

}


function beginTest() {

    closeModal();


    alert(
        "🧪 Test started!"
    );

}


/* =====================================================
   PROFILE
===================================================== */

function editProfile() {

    openModal(`

        <h2>
            Edit Profile
        </h2>

        <input
            id="newName"
            value="${currentUser.name}"
            placeholder="Your name"
        >

        <br><br>

        <button
            class="primary full"
            onclick="saveProfile()"
        >
            Save Changes
        </button>

    `);

}


function saveProfile() {

    const name =
        document
            .getElementById(
                "newName"
            )
            .value
            .trim();


    if (!name) {

        alert(
            "Please enter a name."
        );

        return;

    }


    currentUser.name =
        name;


    saveUser();


    updateUserInterface();


    closeModal();

}


/* =====================================================
   TEACHER STUDIO
===================================================== */

function createCourse() {

    openModal(`

        <div class="eyebrow">
            TEACHER STUDIO
        </div>

        <h2 style="margin-top:8px">
            Create a Course
        </h2>

        <input
            id="courseName"
            placeholder="Course name"
        >

        <input
            id="courseSubject"
            placeholder="Subject"
        >

        <textarea
            id="courseDescription"
            placeholder="Course description"
        ></textarea>

        <br>

        <button
            class="primary full"
            onclick="saveCourse()"
        >
            Create Course
        </button>

    `);

}


function saveCourse() {

    const name =
        document
            .getElementById(
                "courseName"
            )
            .value
            .trim();


    const subject =
        document
            .getElementById(
                "courseSubject"
            )
            .value
            .trim();


    if (!name || !subject) {

        alert(
            "Please enter the course name and subject."
        );

        return;

    }


    closeModal();


    alert(
        "📚 Course created!\n\n" +
        name +
        "\n\nInstructor: " +
        currentUser.name
    );

}


function uploadVideo() {

    openModal(`

        <h2>
            🎥 Upload Class
        </h2>

        <p style="color:#8993a6">
            Add a video lesson to your course.
        </p>

        <input
            type="file"
            accept="video/*"
        >

        <input
            placeholder="Lesson title"
        >

        <br><br>

        <button
            class="primary full"
            onclick="fakeUpload()"
        >
            Upload Video
        </button>

    `);

}


function fakeUpload() {

    closeModal();


    alert(
        "🎥 Video selected!\n\n" +
        "Real video storage will be connected when we add the backend."
    );

}


function createAssignment() {

    openModal(`

        <h2>
            📝 Create Assignment
        </h2>

        <input
            placeholder="Assignment title"
        >

        <textarea
            placeholder="Instructions"
        ></textarea>

        <input
            type="number"
            placeholder="Total points"
        >

        <br><br>

        <button
            class="primary full"
            onclick="publishAssignment()"
        >
            Publish Assignment
        </button>

    `);

}


function publishAssignment() {

    closeModal();


    alert(
        "📝 Assignment published!"
    );

}


function createMeeting() {

    openModal(`

        <h2>
            💻 Schedule Meeting
        </h2>

        <input
            placeholder="Class title"
        >

        <input
            type="date"
        >

        <input
            type="time"
        >

        <br><br>

        <button
            class="primary full"
            onclick="scheduleMeeting()"
        >
            Schedule Class
        </button>

    `);

}


function scheduleMeeting() {

    closeModal();


    alert(
        "💻 Class scheduled!"
    );

}


/* =====================================================
   MODAL
===================================================== */

const modal =
    document.getElementById(
        "modal"
    );


const modalContent =
    document.getElementById(
        "modalContent"
    );


function openModal(
    content
) {

    modalContent.innerHTML =
        content;


    modal.classList.add(
        "show"
    );

}


function closeModal() {

    modal.classList.remove(
        "show"
    );

}


modal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            modal
        ) {

            closeModal();

        }

    }
);


/* =====================================================
   DARK MODE
===================================================== */

const darkToggle =
    document.getElementById(
        "darkToggle"
    );


darkToggle.addEventListener(
    "change",
    () => {

        if (
            !darkToggle.checked
        ) {

            document.body.style.setProperty(
                "--bg",
                "#f4f6fa"
            );

            document.body.style.setProperty(
                "--sidebar",
                "#ffffff"
            );

            document.body.style.setProperty(
                "--card",
                "#ffffff"
            );

            document.body.style.setProperty(
                "--card2",
                "#eef1f7"
            );

            document.body.style.setProperty(
                "--text",
                "#111522"
            );

            document.body.style.setProperty(
                "--muted",
                "#687184"
            );

        }

        else {

            document.body.style.setProperty(
                "--bg",
                "#080a10"
            );

            document.body.style.setProperty(
                "--sidebar",
                "#0d1018"
            );

            document.body.style.setProperty(
                "--card",
                "#111620"
            );

            document.body.style.setProperty(
                "--card2",
                "#171d29"
            );

            document.body.style.setProperty(
                "--text",
                "#f5f7fb"
            );

            document.body.style.setProperty(
                "--muted",
                "#8993a6"
            );

        }

    }
);


/* =====================================================
   LOGOUT
===================================================== */

document
    .getElementById(
        "logoutButton"
    )
    .addEventListener(
        "click",
        () => {

            localStorage.removeItem(
                "lernoUser"
            );


            location.reload();

        }
    );


/* =====================================================
   SAVE USER
===================================================== */

function saveUser() {

    localStorage.setItem(
        "lernoUser",
        JSON.stringify(
            currentUser
        )
    );

}


/* =====================================================
   LOAD USER
===================================================== */

const savedUser =
    localStorage.getItem(
        "lernoUser"
    );


if (savedUser) {

    try {

        currentUser =
            JSON.parse(
                savedUser
            );


        launchApp();

    }

    catch {

        console.log(
            "Could not load saved Lerno account."
        );

    }

}
