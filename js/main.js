/* ============================================================
   main.js — CircuitCraft site interactivity
   ============================================================ */

/* --- Mobile menu toggle ------------------------------------ */
const menuToggle = document.getElementById('menuToggle');
const primaryNav = document.getElementById('primary-nav');

if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', () => {
        const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!isOpen));
        primaryNav.classList.toggle('open', !isOpen);
    });

    /* Close menu when a nav link is clicked */
    primaryNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.setAttribute('aria-expanded', 'false');
            primaryNav.classList.remove('open');
        });
    });
}

/* --- Header shadow on scroll ------------------------------ */
const siteHeader = document.getElementById('site-header');

if (siteHeader) {
    window.addEventListener('scroll', () => {
        siteHeader.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
}

/* --- Active nav link on scroll (IntersectionObserver) ----- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#primary-nav a[href^="#"]');

if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.removeAttribute('aria-current');
                    if (link.getAttribute('href') === '#' + entry.target.id) {
                        link.setAttribute('aria-current', 'page');
                    }
                });
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(section => sectionObserver.observe(section));
}

/* --- Quote calculator -------------------------------------- */
const calcBtn    = document.getElementById('calcBtn');
const calcResult = document.getElementById('calcResult');

if (calcBtn && calcResult) {
    calcBtn.addEventListener('click', () => {
        const layers     = parseFloat(document.getElementById('layers').value);
        const complexity = parseFloat(document.getElementById('complexity').value);
        const urgency    = parseFloat(document.getElementById('urgency').value);
        const base = layers * complexity * urgency;
        const low  = Math.round(base * 0.9);
        const high = Math.round(base * 1.1);
        const text = `Estimated Cost: $${low} to $${high}`;
        calcResult.textContent = text;
        calcResult.setAttribute('aria-label', `Estimated cost range from ${low} dollars to ${high} dollars`);
    });
}

/* --- Contact form: validation + async submission ----------- */
const contactForm  = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');
const submitBtn    = document.getElementById('submitBtn');

if (contactForm) {
    const validateField = field => {
        if (!field.checkValidity()) {
            field.classList.add('invalid');
        } else {
            field.classList.remove('invalid');
        }
    };

    /* Validate on blur and re-validate on input after first error */
    contactForm.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => {
            if (field.classList.contains('invalid')) validateField(field);
        });
    });

    contactForm.addEventListener('submit', async e => {
        e.preventDefault();

        /* Validate all required fields before sending */
        let valid = true;
        contactForm.querySelectorAll('[required]').forEach(field => {
            validateField(field);
            if (!field.checkValidity()) valid = false;
        });

        if (!valid) {
            showFeedback('Please fill in all required fields correctly.', 'error');
            return;
        }

        submitBtn.disabled    = true;
        submitBtn.textContent = 'Sending\u2026';
        clearFeedback();

        try {
            const response = await fetch(contactForm.action, {
                method:  'POST',
                body:    new FormData(contactForm),
                headers: { Accept: 'application/json' },
            });

            if (response.ok) {
                showFeedback('\u2713 Message sent! We\u2019ll reply within one business day.', 'success');
                contactForm.reset();
            } else {
                throw new Error('Server responded with status ' + response.status);
            }
        } catch {
            showFeedback(
                'Something went wrong \u2014 please email us directly at hello@circuitcraft.example.com',
                'error'
            );
        } finally {
            submitBtn.disabled    = false;
            submitBtn.textContent = 'Send Request';
        }
    });
}

function showFeedback(message, type) {
    if (!formFeedback) return;
    formFeedback.textContent = message;
    formFeedback.className   = 'form-feedback ' + type;
}

function clearFeedback() {
    if (!formFeedback) return;
    formFeedback.textContent = '';
    formFeedback.className   = 'form-feedback';
}
