// Typing animation phrases
const phrases = [
    "Agentic AI Engineer",
    "C++ Backend Specialist",
    "LLM Workflow Architect",
    "BSCS Student (2023 - 2027)"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 1500;

const textElement = document.querySelector(".typing-text");

function typeLoop() {
    if (!textElement) return;
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeLoop, pauseTime);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeLoop, 200);
    } else {
        setTimeout(typeLoop, isDeleting ? deletingSpeed : typingSpeed);
    }
}

// Active Navbar Highlight on Scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "home";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 120) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("text-primary-400", "border-b-2", "border-primary-500");
        link.classList.add("text-slate-400");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("text-primary-400", "border-b-2", "border-primary-500");
            link.classList.remove("text-slate-400");
        }
    });

    // Glassmorphism navbar toggling
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("shadow-lg", "shadow-slate-950/10", "bg-slate-950/90");
    } else {
        navbar.classList.remove("shadow-lg", "shadow-slate-950/10", "bg-slate-950/90");
    }
});

// Theme Toggle Functionality (Dark / Light Mode)
const themeToggleBtn = document.getElementById("themeToggle");
const body = document.body;

themeToggleBtn.addEventListener("click", () => {
    if (body.classList.contains("dark")) {
        body.classList.remove("dark");
        body.classList.add("light");
        body.classList.replace("bg-slate-950", "bg-slate-50");
        body.classList.replace("text-slate-100", "text-slate-900");
    } else {
        body.classList.remove("light");
        body.classList.add("dark");
        body.classList.replace("bg-slate-50", "bg-slate-950");
        body.classList.replace("text-slate-900", "text-slate-100");
    }
});

// Mobile Menu Toggle logic
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const menuIcon = document.getElementById("menuIcon");

mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    if (mobileMenu.classList.contains("hidden")) {
        menuIcon.className = "fa-solid fa-bars text-xl";
    } else {
        menuIcon.className = "fa-solid fa-xmark text-xl";
    }
});

const mobileLinks = document.querySelectorAll(".mobile-nav-link");
mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        menuIcon.className = "fa-solid fa-bars text-xl";
    });
});

// Clipboard function with custom visual toast feedbacks
function copyToClipboard(text, identifier) {
    const dummyInput = document.createElement("input");
    document.body.appendChild(dummyInput);
    dummyInput.value = text;
    dummyInput.select();
    document.execCommand("copy");
    document.body.removeChild(dummyInput);
    
    showToast(`Copied ${identifier} successfully!`, "check");
}

// Portfolio Project Category Filtering
function filterProjects(category) {
    const cards = document.querySelectorAll(".project-card");
    const filterBtns = document.querySelectorAll(".project-filter-btn");

    filterBtns.forEach(btn => {
        if (btn.getAttribute("data-filter") === category) {
            btn.className = "project-filter-btn px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-md shadow-primary-500/20";
        } else {
            btn.className = "project-filter-btn px-4 py-2 text-xs sm:text-sm font-bold rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all duration-300";
        }
    });

    cards.forEach(card => {
        if (category === "all" || card.getAttribute("data-category") === category) {
            card.style.display = "flex";
            setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            }, 50);
        } else {
            card.style.opacity = "0";
            card.style.transform = "translateY(10px)";
            setTimeout(() => {
                card.style.display = "none";
            }, 300);
        }
    });
}

// Form Submission Simulation
function handleFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById("form_name").value;
    const email = document.getElementById("form_email").value;
    const message = document.getElementById("form_message").value;

    if (name && email && message) {
        showToast(`Thank you, ${name}! Your message has been sent successfully.`, "check");
        document.getElementById("contactForm").reset();
    } else {
        showToast("Please fill in all mandatory fields.", "warning");
    }
}

// Interactive Toast Notification Display Engine
function showToast(message, type) {
    const toast = document.getElementById("toast");
    const toastText = document.getElementById("toastText");
    const toastIcon = document.getElementById("toastIcon");

    if (!toast || !toastText || !toastIcon) return;

    toastText.textContent = message;
    
    if (type === "warning") {
        toastIcon.innerHTML = `<i class="fa-solid fa-circle-exclamation text-amber-500 text-lg"></i>`;
    } else {
        toastIcon.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-500 text-lg"></i>`;
    }

    toast.classList.remove("translate-y-24", "opacity-0");
    toast.classList.add("translate-y-0", "opacity-100");

    setTimeout(() => {
        toast.classList.remove("translate-y-0", "opacity-100");
        toast.classList.add("translate-y-24", "opacity-0");
    }, 4000);
}

// Kickstart script routines
window.onload = function() {
    setTimeout(typeLoop, 500);
};