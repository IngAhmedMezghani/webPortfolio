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
    const darkModeIcon = document.getElementById('darkModeIcon');
    const darkModeText = document.getElementById('darkModeText');
    const body = document.body;

    // Load preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        if (darkModeIcon) darkModeIcon.textContent = '☀️';
        if (darkModeText) darkModeText.textContent = 'Light Mode';
    } else {
        if (darkModeIcon) darkModeIcon.textContent = '🌙';
        if (darkModeText) darkModeText.textContent = 'Dark Mode';
    }

    darkModeToggle.addEventListener('click', function () {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            if (darkModeIcon) darkModeIcon.textContent = '☀️';
            if (darkModeText) darkModeText.textContent = 'Light Mode';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            if (darkModeIcon) darkModeIcon.textContent = '🌙';
            if (darkModeText) darkModeText.textContent = 'Dark Mode';
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
                    emailjs.send("service_3bt8kqa", "template_yu9f53x", {
                        from_name: name.value,
                        from_email: email.value,
                        subject: document.getElementById('subject').value,
                        message: message.value
                    })
                    .then(() => {
                        formSuccess.textContent = "✅ Message sent successfully!";
                        form.reset();
                        setTimeout(() => { formSuccess.textContent = ""; }, 4000);
                    }, (error) => {
                        formSuccess.textContent = "❌ Failed to send message. Please try again.";
                        console.error('EmailJS Error:', error);
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

    // Highlight nav link in sticky nav based on scroll position
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = Array.from(navLinks).map(link => {
        const id = link.getAttribute('href').slice(1);
        return document.getElementById(id);
    });

    function setActiveNavLinkOnScroll() {
        let index = -1;
        for (let i = 0; i < sections.length; i++) {
            if (sections[i] && window.scrollY + 120 >= sections[i].offsetTop) {
                index = i;
            }
        }
        navLinks.forEach(link => link.classList.remove('active'));
        if (index >= 0 && navLinks[index]) {
            navLinks[index].classList.add('active');
        }
    }

    window.addEventListener('scroll', setActiveNavLinkOnScroll);
    setActiveNavLinkOnScroll();

    // Animate sections on scroll (fade in)
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = 0;
        section.style.transition = 'opacity 0.7s, transform 0.7s';
    });

    function revealSectionsOnScroll() {
        const triggerBottom = window.innerHeight * 0.92;
        document.querySelectorAll('.section').forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < triggerBottom) {
                section.style.opacity = 1;
                section.style.transform = 'none';
            }
        });
    }
    window.addEventListener('scroll', revealSectionsOnScroll);
    window.addEventListener('DOMContentLoaded', revealSectionsOnScroll);

    // Sticky navigation on scroll
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');
    const stickyClass = 'sticky-nav';
    const bodyStickyClass = 'has-sticky-nav';

    function handleStickyNav() {
        // Get the bottom of the header
        const headerBottom = header.offsetTop + header.offsetHeight;
        if (window.scrollY >= headerBottom) {
            nav.classList.add(stickyClass);
            document.body.classList.add(bodyStickyClass);
            nav.style.visibility = "visible";
        } else {
            nav.classList.remove(stickyClass);
            document.body.classList.remove(bodyStickyClass);
            nav.style.visibility = "";
        }
    }

    window.addEventListener('scroll', handleStickyNav);
    handleStickyNav();
});
