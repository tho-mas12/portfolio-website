// Typing Animation
const roles = ["Fullstack Developer", "Web Designer", "Computer Science Enthusiast"];
let roleIndex = 0;
let charIndex = 0;
const typingText = document.getElementById("typing-text");

function typeEffect() {
    if (charIndex < roles[roleIndex].length) {
        typingText.textContent += roles[roleIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 100);
    } else {
        setTimeout(eraseEffect, 1500);
    }
}

function eraseEffect() {
    if (charIndex > 0) {
        typingText.textContent = roles[roleIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseEffect, 60);
    } else {
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 500);
    }
}

typeEffect();

// Download CV Button
function downloadCV() {
    alert("Your CV will be downloaded soon!");
    // window.location.href = "Abinaya_CV.pdf";
}

// Smooth Scroll
document.querySelectorAll('a.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href'))
            .scrollIntoView({ behavior: 'smooth' });
    });
});

// Read More Toggle
function toggleReadMore() {
    const moreText = document.getElementById("more-text");
    const btn = event.target;

    if (moreText.classList.contains("d-none")) {
        moreText.classList.remove("d-none");
        btn.innerText = "Read less";
    } else {
        moreText.classList.add("d-none");
        btn.innerText = "Read more";
    }
}

// Project Read More
function showProject(projectName) {
    alert("More details about: " + projectName);
}

// Open Image Modal
function openImage(src) {
    document.getElementById("imageModal").style.display = "flex";
    document.getElementById("modalImg").src = src;
}

// Close Image Modal
function closeImage() {
    document.getElementById("imageModal").style.display = "none";
}

// Contact Form Validation
function validateForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || mobile === "" || subject === "" || message === "") {
        alert("Please fill all the fields.");
        return false;
    }

    if (mobile.length < 10) {
        alert("Please enter a valid mobile number.");
        return false;
    }

    alert("Message sent successfully!");
    return false; // prevent actual submit (no backend)
}


function validateLogin(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const ageVal = document.getElementById('age').value;
    const age = ageVal ? parseInt(ageVal, 10) : NaN;
    const email = document.getElementById('email').value.trim();
    const contact = document.getElementById('contact').value.trim();

    if (!name) {
        alert('Please enter your name.');
        return false;
    }
    if (!age || age <= 0) {
        alert('Please enter a valid age.');
        return false;
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!email || !emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    const contactRegex = /^\+?\d{7,15}$/;
    if (!contact || !contactRegex.test(contact)) {
        alert('Please enter a valid contact number (7-15 digits, optional leading +).');
        return false;
    }

    // Show success feedback then redirect to homepage
    const btn = document.getElementById('loginBtn');
    btn.disabled = true;
    btn.innerHTML = 'Signing in...';
    // small success animation before redirect
    setTimeout(() => {
        window.location.href = 'homepage.html';
    }, 700);
    return false;
}

