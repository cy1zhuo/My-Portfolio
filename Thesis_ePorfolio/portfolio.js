// Scroll to top button
const scrollToTopButton = document.getElementById('scrollToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});
scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Certificate modal behavior
const pdfModal = document.getElementById('pdfModal');
const pdfViewer = document.getElementById('pdfViewer');
const closeModal = document.querySelector('.close');
const certificateBoxes = document.querySelectorAll('.certificate-box');

certificateBoxes.forEach(box => {
    box.addEventListener('click', () => {
        const pdfPath = box.dataset.pdf;
        if (pdfPath) {
            pdfViewer.src = pdfPath;
            pdfModal.classList.add('show');
        }
    });
});

closeModal.addEventListener('click', () => {
    pdfModal.classList.remove('show');
    pdfViewer.src = '';
});

window.addEventListener('click', (event) => {
    if (event.target === pdfModal) {
        pdfModal.classList.remove('show');
        pdfViewer.src = '';
    }
});

// Smooth scrolling for nav links
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
            window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
        }
    });
});

// Toggle Q&A answers
const questionItems = document.querySelectorAll('#questions li');
questionItems.forEach(item => {
    item.addEventListener('click', () => {
        const answer = item.querySelector('.answer');
        questionItems.forEach(i => {
            if (i !== item) {
                i.querySelector('.answer').classList.remove('show');
            }
        });
        answer.classList.toggle('show');
    });
});

// Header background and show sections on scroll
const sectionsToShow = document.querySelectorAll('.about, .skills, .tech-stack, .projects, #questions, .contact');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        document.querySelector('header').classList.add('scrolled');
    } else {
        document.querySelector('header').classList.remove('scrolled');
    }
    sectionsToShow.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            section.classList.add('show');
        }
    });
});
