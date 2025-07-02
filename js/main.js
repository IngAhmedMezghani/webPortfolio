document.addEventListener('DOMContentLoaded', function () {
    // Mobile nav toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('nav ul');
    navToggle.addEventListener('click', function () {
        navList.classList.toggle('active');
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                // Close nav on mobile after click
                if (window.innerWidth <= 800) {
                    navList.classList.remove('active');
                }
            }
        });
    });

    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    // Load preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
    }
    darkModeToggle.addEventListener('click', function () {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    // AJAX Contact form submission (PHP backend)
    const form = document.getElementById('contactForm');
    if (form) {
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const messageError = document.getElementById('messageError');
        const formSuccess = document.getElementById('formSuccess');

        function validateName() {
            if (!name.value.trim()) {
                nameError.textContent = "Name is required.";
                return false;
            }
            nameError.textContent = "";
            return true;
        }

        function validateEmail() {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim()) {
                emailError.textContent = "Email is required.";
                return false;
            }
            if (!emailPattern.test(email.value.trim())) {
                emailError.textContent = "Enter a valid email address.";
                return false;
            }
            emailError.textContent = "";
            return true;
        }

        function validateMessage() {
            if (!message.value.trim()) {
                messageError.textContent = "Message is required.";
                return false;
            }
            if (message.value.trim().length < 10) {
                messageError.textContent = "Message should be at least 10 characters.";
                return false;
            }
            messageError.textContent = "";
            return true;
        }

        name.addEventListener('input', validateName);
        email.addEventListener('input', validateEmail);
        message.addEventListener('input', validateMessage);

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const validName = validateName();
            const validEmail = validateEmail();
            const validMessage = validateMessage();

            if (validName && validEmail && validMessage) {
                const formData = new FormData(form);
                fetch('sendmail.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.text())
                .then(text => {
                    if (text.includes('success')) {
                        formSuccess.textContent = "Message sent successfully!";
                        form.reset();
                    } else if (text.includes('error')) {
                        formSuccess.textContent = "Sorry, there was an error sending your message. Please try again later or contact me directly at ahmed.mezghani@enis.tn.";
                    } else {
                        formSuccess.textContent = "Unexpected server response. Please try again.";
                    }
                    setTimeout(() => { formSuccess.textContent = ""; }, 4000);
                })
                .catch(() => {
                    formSuccess.textContent = "Sorry, there was an error sending your message. Please check your connection or contact me directly at ahmed.mezghani@enis.tn.";
                    setTimeout(() => { formSuccess.textContent = ""; }, 4000);
                });
            } else {
                formSuccess.textContent = "";
            }
        });
    }

    // Make project-card clickable to open GitHub project
    document.querySelectorAll('.project-card').forEach((card, idx) => {
        card.style.cursor = "pointer";
        card.addEventListener('click', () => {
            // Set your GitHub URLs in the same order as your project cards
            const urls = [
                "https://github.com/IngAhmedMezghani/MyApplication8final", // Android App
                "https://github.com/IngAhmedMezghani/computer-vision-project-2", // Football CV
                "https://github.com/IngAhmedMezghani"  // Event Reservation
            ];
            if (urls[idx]) {
                window.open(urls[idx], "_blank");
            }
        });
    });

    // Highlight active nav link on click
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function () {
            document.querySelectorAll('nav ul li a').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
});
